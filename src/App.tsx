import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Bookmark,
  Search,
  RotateCcw,
  Award,
  ArrowRight,
  Check,
  HelpCircle,
  History,
  Download,
  Eye,
  EyeOff,
  ChevronRight,
  Menu,
  X,
  Home,
  Sparkles,
  Layers,
  Sun,
  Moon,
  Palette,
  Copy,
} from 'lucide-react';
import { SYLLABUS_SECTIONS } from './data/syllabusData';
import { NOTES_PART_1 } from './data/notesPart1';
import { NOTES_PART_2 } from './data/notesPart2';
import { NOTES_PART_3 } from './data/notesPart3';
import { NOTES_PART_4 } from './data/notesPart4';
import { NOTES_PART_5, NOTES_PART_6 } from './data/notesPart5And6';
import { MCQS_PART_1_TOPICS_1_TO_3 } from './data/mcqsPart1_1_to_3';
import { MCQS_PART_1_TOPICS_4_TO_6 } from './data/mcqsPart1_4_to_6';
import { MCQS_PART_2_TOPICS_1_TO_4 } from './data/mcqsPart2_1_to_4';
import { MCQS_PART_2_TOPICS_5_TO_8 } from './data/mcqsPart2_5_to_8';
import { MCQS_PART_3_TOPICS_1_TO_4 } from './data/mcqsPart3_1_to_4';
import { MCQS_PART_3_TOPICS_5_TO_7 } from './data/mcqsPart3_5_to_7';
import { MCQS_PART_4 } from './data/mcqsPart4';
import { MCQS_PART_5, MCQS_PART_6 } from './data/mcqsPart5And6';
import { LocalStudyState, MCQItem, SavedTopicAttempt, TopicNote } from './types/constitution';
import {
  GlossaryProvider,
  SmartText,
  useGlossary,
  CONSTITUTION_GLOSSARY,
} from './components/WordMeaningTooltip';
import { RevisionAndFlashcardsView } from './components/RevisionAndFlashcardsView';
import { FlashcardsPage } from './components/FlashcardsPage';
import { FileText } from 'lucide-react';

const STORAGE_KEY = 'british_constitution_unit1_study_data_v1';

const ALL_NOTES: TopicNote[] = [
  ...NOTES_PART_1,
  ...NOTES_PART_2,
  ...NOTES_PART_3,
  ...NOTES_PART_4,
  ...NOTES_PART_5,
  ...NOTES_PART_6,
];

const ALL_MCQS: MCQItem[] = [
  ...MCQS_PART_1_TOPICS_1_TO_3,
  ...MCQS_PART_1_TOPICS_4_TO_6,
  ...MCQS_PART_2_TOPICS_1_TO_4,
  ...MCQS_PART_2_TOPICS_5_TO_8,
  ...MCQS_PART_3_TOPICS_1_TO_4,
  ...MCQS_PART_3_TOPICS_5_TO_7,
  ...MCQS_PART_4,
  ...MCQS_PART_5,
  ...MCQS_PART_6,
];

function getMcqPartNumber(q: MCQItem): number {
  if (q.partNumber) return q.partNumber;
  const prefix = parseInt(q.topicId.split('.')[0], 10);
  return Number.isNaN(prefix) ? 1 : prefix;
}

const INITIAL_LOCAL_STATE: LocalStudyState = {
  selectedAnswers: {},
  revealedQuestions: {},
  bookmarkedQuestions: {},
  completedNotesTopics: {},
  personalNotes: {},
  savedAttempts: [],
};

type ActivePage = 'home' | 'notes' | 'mcqs' | 'flashcards' | 'revision' | 'results';
type PartFilter = 1 | 2 | 3 | 4 | 5 | 6;
type QuizMode = 'attempt' | 'instant';
type StatusFilter = 'all' | 'unanswered' | 'correct' | 'incorrect' | 'bookmarked';
type ThemeMode = 'light' | 'dark' | 'tricolor';

const THEME_STORAGE_KEY = 'british_constitution_unit1_theme_v1';

function StudyPortalContent() {
  const { highlightEnabled, setHighlightEnabled, openMeaning } = useGlossary();

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'tricolor') {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      // Ignore storage errors
    }
  }, [themeMode]);

  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [glossaryDrawerOpen, setGlossaryDrawerOpen] = useState<boolean>(false);
  const [glossarySearchQuery, setGlossarySearchQuery] = useState<string>('');

  const [activeNotesPart, setActiveNotesPart] = useState<PartFilter>(1);
  const [selectedNotesTopic, setSelectedNotesTopic] = useState<string>('1.1');
  const [notesSearchQuery, setNotesSearchQuery] = useState<string>('');

  const [activeMcqPart, setActiveMcqPart] = useState<PartFilter>(1);
  const [selectedMcqTopic, setSelectedMcqTopic] = useState<string>('1.1');
  const [quizMode, setQuizMode] = useState<QuizMode>('attempt');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [mcqSearchQuery, setMcqSearchQuery] = useState<string>('');
  const [showAllExplanations, setShowAllExplanations] = useState<boolean>(false);
  const [confirmResetTopic, setConfirmResetTopic] = useState<boolean>(false);
  const [confirmClearAllData, setConfirmClearAllData] = useState<boolean>(false);
  const [saveToastMessage, setSaveToastMessage] = useState<string | null>(null);
  const [copiedTopicId, setCopiedTopicId] = useState<string | null>(null);

  // Load and persist state in localStorage
  const [studyState, setStudyState] = useState<LocalStudyState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...INITIAL_LOCAL_STATE,
          ...parsed,
        };
      }
    } catch {
      // Fallback to initial state if localStorage is unavailable
    }
    return INITIAL_LOCAL_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(studyState));
    } catch {
      // Ignore storage quota errors
    }
  }, [studyState]);

  const triggerToast = (msg: string) => {
    setSaveToastMessage(msg);
    setTimeout(() => {
      setSaveToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Global stats across all 966 MCQs (Parts 1 to 6)
  const globalStats = useMemo(() => {
    const totalQuestions = ALL_MCQS.length;
    let attemptedCount = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    for (const q of ALL_MCQS) {
      const userAns = studyState.selectedAnswers[q.id];
      if (userAns) {
        attemptedCount++;
        if (userAns === q.correctOption) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    }

    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const completedTopicsCount = Object.values(studyState.completedNotesTopics).filter(Boolean).length;

    return {
      totalQuestions,
      attemptedCount,
      correctCount,
      incorrectCount,
      unansweredCount: totalQuestions - attemptedCount,
      accuracy,
      completedTopicsCount,
    };
  }, [studyState]);

  const getFilteredMcqByTopicSelection = (topicKey: string): MCQItem[] => {
    if (topicKey === 'ALL') return ALL_MCQS;
    if (topicKey === 'ALL_PART_1') return ALL_MCQS.filter((q) => getMcqPartNumber(q) === 1);
    if (topicKey === 'ALL_PART_2') return ALL_MCQS.filter((q) => getMcqPartNumber(q) === 2);
    if (topicKey === 'ALL_PART_3') return ALL_MCQS.filter((q) => getMcqPartNumber(q) === 3);
    if (topicKey === 'ALL_PART_4') return ALL_MCQS.filter((q) => getMcqPartNumber(q) === 4);
    if (topicKey === 'ALL_PART_5') return ALL_MCQS.filter((q) => getMcqPartNumber(q) === 5);
    if (topicKey === 'ALL_PART_6') return ALL_MCQS.filter((q) => getMcqPartNumber(q) === 6);
    return ALL_MCQS.filter((q) => q.topicId === topicKey);
  };

  // Per-topic or per-part stats helper
  const getTopicStats = (topicId: string) => {
    const questions = getFilteredMcqByTopicSelection(topicId);

    let attempted = 0;
    let correct = 0;
    let incorrect = 0;
    let revealed = 0;

    for (const q of questions) {
      const ans = studyState.selectedAnswers[q.id];
      if (studyState.revealedQuestions[q.id]) {
        revealed++;
      }
      if (ans) {
        attempted++;
        if (ans === q.correctOption) {
          correct++;
        } else {
          incorrect++;
        }
      }
    }

    const total = questions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const accuracyOnAttempted = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    return {
      total,
      attempted,
      correct,
      incorrect,
      unanswered: total - attempted,
      revealed,
      percentage,
      accuracyOnAttempted,
    };
  };

  // Handlers
  const handleSelectOption = (questionId: string, optionKey: 'a' | 'b' | 'c' | 'd') => {
    setStudyState((prev) => {
      const currentSelection = prev.selectedAnswers[questionId];
      // Clicking the same option again deselects it (leaves question blank)
      if (currentSelection === optionKey) {
        const nextSelected = { ...prev.selectedAnswers };
        const nextRevealed = { ...prev.revealedQuestions };
        delete nextSelected[questionId];
        delete nextRevealed[questionId];
        return {
          ...prev,
          selectedAnswers: nextSelected,
          revealedQuestions: nextRevealed,
        };
      }

      return {
        ...prev,
        selectedAnswers: {
          ...prev.selectedAnswers,
          [questionId]: optionKey,
        },
        revealedQuestions:
          quizMode === 'instant'
            ? { ...prev.revealedQuestions, [questionId]: true }
            : prev.revealedQuestions,
      };
    });
  };

  const handleClearOption = (questionId: string) => {
    setStudyState((prev) => {
      const nextSelected = { ...prev.selectedAnswers };
      const nextRevealed = { ...prev.revealedQuestions };
      delete nextSelected[questionId];
      delete nextRevealed[questionId];
      return {
        ...prev,
        selectedAnswers: nextSelected,
        revealedQuestions: nextRevealed,
      };
    });
  };

  const handleToggleRevealQuestion = (questionId: string) => {
    setStudyState((prev) => ({
      ...prev,
      revealedQuestions: {
        ...prev.revealedQuestions,
        [questionId]: !prev.revealedQuestions[questionId],
      },
    }));
  };

  const handleToggleBookmark = (questionId: string) => {
    setStudyState((prev) => ({
      ...prev,
      bookmarkedQuestions: {
        ...prev.bookmarkedQuestions,
        [questionId]: !prev.bookmarkedQuestions[questionId],
      },
    }));
  };

  const handleToggleTopicCompleted = (topicId: string) => {
    setStudyState((prev) => {
      const nextVal = !prev.completedNotesTopics[topicId];
      return {
        ...prev,
        completedNotesTopics: {
          ...prev.completedNotesTopics,
          [topicId]: nextVal,
        },
      };
    });
    triggerToast(`Topic ${topicId} revision status saved to local data.`);
  };

  const handleSavePersonalNote = (topicId: string, text: string) => {
    setStudyState((prev) => ({
      ...prev,
      personalNotes: {
        ...prev.personalNotes,
        [topicId]: text,
      },
    }));
  };

  const getSelectionTitle = (topicKey: string) => {
    if (topicKey === 'ALL') return 'Unit 1 — All Topics Combined (Parts 1 to 6 · 966 MCQs)';
    if (topicKey === 'ALL_PART_1') return 'Part 1 — Nature & Content (Topics 1.1 to 1.6)';
    if (topicKey === 'ALL_PART_2') return 'Part 2 — Sources of the Constitution (Topics 2.1 to 2.8)';
    if (topicKey === 'ALL_PART_3') return 'Part 3 — Conventions of the Constitution (Topics 3.1 to 3.7)';
    if (topicKey === 'ALL_PART_4') return 'Part 4 — Salient Features (Topics 4.1 to 4.10)';
    if (topicKey === 'ALL_PART_5') return 'Part 5 — Development of the Constitution (Topics 5.1 to 5.7)';
    if (topicKey === 'ALL_PART_6') return 'Part 6 — Suggested Readings (Topic 6.1)';
    const topicObj = ALL_NOTES.find((t) => t.topicId === topicKey);
    return topicObj ? topicObj.topicTitle : `Topic ${topicKey}`;
  };

  const handleSubmitAndSaveTopicResult = () => {
    const topicQuestions = getFilteredMcqByTopicSelection(selectedMcqTopic);
    const stats = getTopicStats(selectedMcqTopic);
    const topicTitle = getSelectionTitle(selectedMcqTopic);

    const newRevealed = { ...studyState.revealedQuestions };
    const snapshot: Record<string, 'a' | 'b' | 'c' | 'd'> = {};

    for (const q of topicQuestions) {
      newRevealed[q.id] = true;
      if (studyState.selectedAnswers[q.id]) {
        snapshot[q.id] = studyState.selectedAnswers[q.id];
      }
    }

    const newAttempt: SavedTopicAttempt = {
      id: `attempt-${Date.now()}`,
      topicId: selectedMcqTopic,
      topicTitle,
      timestamp: new Date().toLocaleString(),
      totalQuestions: stats.total,
      attemptedCount: stats.attempted,
      correctCount: stats.correct,
      incorrectCount: stats.incorrect,
      unansweredCount: stats.unanswered,
      percentage: stats.percentage,
      answersSnapshot: snapshot,
    };

    setStudyState((prev) => ({
      ...prev,
      revealedQuestions: newRevealed,
      savedAttempts: [newAttempt, ...prev.savedAttempts],
    }));

    triggerToast(
      `Result saved locally: ${stats.correct}/${stats.total} (${stats.percentage}%) on ${topicTitle}`
    );
  };

  const handleResetCurrentTopic = () => {
    const topicQuestions = getFilteredMcqByTopicSelection(selectedMcqTopic);

    setStudyState((prev) => {
      const nextSelected = { ...prev.selectedAnswers };
      const nextRevealed = { ...prev.revealedQuestions };
      for (const q of topicQuestions) {
        delete nextSelected[q.id];
        delete nextRevealed[q.id];
      }
      return {
        ...prev,
        selectedAnswers: nextSelected,
        revealedQuestions: nextRevealed,
      };
    });
    setConfirmResetTopic(false);
    setShowAllExplanations(false);
    triggerToast(`Cleared answers for ${getSelectionTitle(selectedMcqTopic)}.`);
  };

  const handleClearAllLocalData = () => {
    setStudyState(INITIAL_LOCAL_STATE);
    localStorage.removeItem(STORAGE_KEY);
    setConfirmClearAllData(false);
    triggerToast('All local study data and saved results have been reset.');
  };

  const handleExportResultsReport = () => {
    const reportLines: string[] = [
      'UNIT 1 — BRITISH CONSTITUTION (ALL 6 PARTS) — LOCAL STUDY REPORT',
      `Generated: ${new Date().toLocaleString()}`,
      '====================================================================',
      `Overall Progress: ${globalStats.attemptedCount} / ${globalStats.totalQuestions} MCQs Attempted`,
      `Correct Answers: ${globalStats.correctCount} | Incorrect: ${globalStats.incorrectCount} | Accuracy: ${globalStats.accuracy}%`,
      '',
    ];

    for (const t of ALL_NOTES) {
      const st = getTopicStats(t.topicId);
      reportLines.push(
        `[Part ${t.partNumber}] ${t.shortTitle}: ${st.correct}/${st.total} Correct (${st.attempted} attempted, ${st.percentage}% overall score)`
      );
    }

    if (studyState.savedAttempts.length > 0) {
      reportLines.push('', 'SAVED QUIZ ATTEMPT LOGS:');
      for (const att of studyState.savedAttempts) {
        reportLines.push(
          `[${att.timestamp}] ${att.topicTitle} — Score: ${att.correctCount}/${att.totalQuestions} (${att.percentage}%) | Attempted: ${att.attemptedCount}`
        );
      }
    }

    const blob = new Blob([reportLines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Unit_1_British_Constitution_Results.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const escapeHtml = (str: string): string =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const formatTableAsPlainText = (headers: string[], rows: string[][]): string => {
    const colWidths = headers.map((h, colIdx) => {
      const maxRowLen = rows.reduce((max, r) => {
        const cellText = (r[colIdx] || '').replace(/\s+/g, ' ').trim();
        return Math.max(max, cellText.length);
      }, 0);
      return Math.max(h.trim().length, maxRowLen, 3);
    });

    const formatRow = (cells: string[]) =>
      '| ' +
      cells
        .map((c, idx) => (c || '').replace(/\s+/g, ' ').trim().padEnd(colWidths[idx], ' '))
        .join(' | ') +
      ' |';

    const separator =
      '| ' + colWidths.map((w) => '-'.repeat(w)).join(' | ') + ' |';

    return [formatRow(headers), separator, ...rows.map(formatRow)].join('\n');
  };

  const formatTableAsHtml = (headers: string[], rows: string[][]): string => {
    const ths = headers
      .map(
        (h) =>
          `<th style="border:1px solid #cbd5e1;padding:8px 10px;background:#f8fafc;text-align:left;font-weight:700;">${escapeHtml(h)}</th>`
      )
      .join('');
    const trs = rows
      .map(
        (row) =>
          `<tr>${row
            .map(
              (cell, idx) =>
                `<td style="border:1px solid #cbd5e1;padding:8px 10px;vertical-align:top;${
                  idx === 0 ? 'font-weight:600;' : ''
                }">${escapeHtml(cell)}</td>`
            )
            .join('')}</tr>`
      )
      .join('');
    return `<table style="border-collapse:collapse;width:100%;margin:10px 0;font-size:14px;"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
  };

  const handleCopyTopicNotes = async (topic: TopicNote) => {
    const plainLines: string[] = [];
    const htmlParts: string[] = [];

    // 1. Topic Header
    plainLines.push('================================================================================');
    plainLines.push(`PART ${topic.partNumber}: ${topic.partTitle}`);
    plainLines.push(topic.topicTitle);
    plainLines.push('================================================================================');
    plainLines.push('');

    htmlParts.push(
      `<div style="font-family:sans-serif;line-height:1.6;">`,
      `<p style="margin:0;font-size:12px;color:#64748b;">Part ${topic.partNumber} · ${escapeHtml(topic.partTitle)}</p>`,
      `<h2 style="margin:4px 0 16px 0;font-size:20px;">${escapeHtml(topic.topicTitle)}</h2>`
    );

    // 2. All Sub-sections (Bullets, Sub-bullets, and Tables)
    for (const sub of topic.subSections) {
      plainLines.push(`${sub.code} ${sub.title}`);
      plainLines.push('-'.repeat(Math.min(80, `${sub.code} ${sub.title}`.length)));

      htmlParts.push(
        `<h3 style="margin:16px 0 8px 0;font-size:16px;">${escapeHtml(sub.code)} ${escapeHtml(sub.title)}</h3>`
      );

      if (sub.bullets.length > 0) {
        htmlParts.push('<ul style="margin:0 0 12px 20px;padding:0;">');
        for (const b of sub.bullets) {
          plainLines.push(`• ${b.text}`);
          if (b.subBullets && b.subBullets.length > 0) {
            htmlParts.push(`<li>${escapeHtml(b.text)}<ul style="margin:4px 0 4px 20px;">`);
            for (const sb of b.subBullets) {
              plainLines.push(`    - ${sb}`);
              htmlParts.push(`<li>${escapeHtml(sb)}</li>`);
            }
            htmlParts.push('</ul></li>');
          } else {
            htmlParts.push(`<li>${escapeHtml(b.text)}</li>`);
          }
        }
        htmlParts.push('</ul>');
      }

      if (sub.table) {
        if (sub.bullets.length > 0) plainLines.push('');
        plainLines.push(formatTableAsPlainText(sub.table.headers, sub.table.rows));
        htmlParts.push(formatTableAsHtml(sub.table.headers, sub.table.rows));
      }

      plainLines.push('');
    }

    // 3. Key Exam Points Section (List or Table)
    plainLines.push('================================================================================');
    plainLines.push(topic.keyExamPointsTitle);
    plainLines.push('================================================================================');

    htmlParts.push(
      `<h3 style="margin:20px 0 8px 0;font-size:16px;">${escapeHtml(topic.keyExamPointsTitle)}</h3>`
    );

    if (topic.keyExamPointsFormat === 'list') {
      htmlParts.push('<ul style="margin:0 0 12px 20px;padding:0;">');
      for (const kp of topic.keyExamPoints) {
        plainLines.push(`• ${kp.point} — ${kp.keyIdea}`);
        htmlParts.push(
          `<li><strong>${escapeHtml(kp.point)}</strong> — ${escapeHtml(kp.keyIdea)}</li>`
        );
      }
      htmlParts.push('</ul>');
    } else {
      const headers =
        topic.topicId === '1.4' ? ['Feature', 'Explanation'] : ['Point', 'Key Idea'];
      const rows = topic.keyExamPoints.map((kp) => [kp.point, kp.keyIdea]);
      plainLines.push(formatTableAsPlainText(headers, rows));
      htmlParts.push(formatTableAsHtml(headers, rows));
    }

    // 4. Personal Notes (if user added any)
    const userNote = (studyState.personalNotes[topic.topicId] || '').trim();
    if (userNote) {
      plainLines.push('');
      plainLines.push('Personal Study Notes:');
      plainLines.push(userNote);
      htmlParts.push(
        `<p style="margin:14px 0 4px 0;font-weight:700;">Personal Study Notes:</p>`,
        `<p style="margin:0;">${escapeHtml(userNote)}</p>`
      );
    }

    htmlParts.push('</div>');

    const plainText = plainLines.join('\n');
    const htmlText = htmlParts.join('');

    let copied = false;
    try {
      if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/plain': new Blob([plainText], { type: 'text/plain' }),
            'text/html': new Blob([htmlText], { type: 'text/html' }),
          }),
        ]);
        copied = true;
      }
    } catch {
      // Fallback to writeText below
    }

    if (!copied) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(plainText);
          copied = true;
        }
      } catch {
        // Fallback to textarea copy below
      }
    }

    if (!copied) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = plainText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        copied = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        copied = false;
      }
    }

    if (copied) {
      setCopiedTopicId(topic.topicId);
      triggerToast(`Copied all notes, tables & key points for Topic ${topic.topicId}`);
      setTimeout(() => {
        setCopiedTopicId((prev) => (prev === topic.topicId ? null : prev));
      }, 2400);
    }
  };

  const handleSelectPage = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resolvePartFromTopicId = (topicId: string): PartFilter => {
    if (topicId.startsWith('6.') || topicId === 'ALL_PART_6') return 6;
    if (topicId.startsWith('5.') || topicId === 'ALL_PART_5') return 5;
    if (topicId.startsWith('4.') || topicId === 'ALL_PART_4') return 4;
    if (topicId.startsWith('3.') || topicId === 'ALL_PART_3') return 3;
    if (topicId.startsWith('2.') || topicId === 'ALL_PART_2') return 2;
    return 1;
  };

  const navigateToTopicNotes = (topicId: string) => {
    setActiveNotesPart(resolvePartFromTopicId(topicId));
    setSelectedNotesTopic(topicId);
    setActivePage('notes');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTopicMcqs = (topicId: string) => {
    setActiveMcqPart(resolvePartFromTopicId(topicId));
    setSelectedMcqTopic(topicId);
    setActivePage('mcqs');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Notes
  const displayedNotes: TopicNote[] = useMemo(() => {
    let base: TopicNote[];
    if (selectedNotesTopic === 'ALL') {
      base = ALL_NOTES;
    } else if (selectedNotesTopic === 'ALL_PART_1') {
      base = NOTES_PART_1;
    } else if (selectedNotesTopic === 'ALL_PART_2') {
      base = NOTES_PART_2;
    } else if (selectedNotesTopic === 'ALL_PART_3') {
      base = NOTES_PART_3;
    } else if (selectedNotesTopic === 'ALL_PART_4') {
      base = NOTES_PART_4;
    } else if (selectedNotesTopic === 'ALL_PART_5') {
      base = NOTES_PART_5;
    } else if (selectedNotesTopic === 'ALL_PART_6') {
      base = NOTES_PART_6;
    } else {
      base = ALL_NOTES.filter((n) => n.topicId === selectedNotesTopic);
    }

    if (!notesSearchQuery.trim()) return base;

    const q = notesSearchQuery.toLowerCase();
    return ALL_NOTES.filter(
      (topic) =>
        topic.topicTitle.toLowerCase().includes(q) ||
        topic.subSections.some(
          (sub) =>
            sub.title.toLowerCase().includes(q) ||
            sub.code.toLowerCase().includes(q) ||
            sub.bullets.some(
              (b) =>
                b.text.toLowerCase().includes(q) ||
                (b.subBullets && b.subBullets.some((sb) => sb.toLowerCase().includes(q)))
            )
        ) ||
        topic.keyExamPoints.some(
          (kp) => kp.point.toLowerCase().includes(q) || kp.keyIdea.toLowerCase().includes(q)
        )
    );
  }, [selectedNotesTopic, notesSearchQuery]);

  // Filtered MCQs
  const displayedMcqs: MCQItem[] = useMemo(() => {
    let list = getFilteredMcqByTopicSelection(selectedMcqTopic);

    if (statusFilter !== 'all') {
      list = list.filter((q) => {
        const userAns = studyState.selectedAnswers[q.id];
        if (statusFilter === 'unanswered') return !userAns;
        if (statusFilter === 'correct') return userAns === q.correctOption;
        if (statusFilter === 'incorrect') return Boolean(userAns && userAns !== q.correctOption);
        if (statusFilter === 'bookmarked') return Boolean(studyState.bookmarkedQuestions[q.id]);
        return true;
      });
    }

    if (mcqSearchQuery.trim()) {
      const query = mcqSearchQuery.toLowerCase();
      list = list.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.fromSection.toLowerCase().includes(query) ||
          q.options.some((o) => o.text.toLowerCase().includes(query))
      );
    }

    return list;
  }, [selectedMcqTopic, statusFilter, mcqSearchQuery, studyState]);

  // Group displayed MCQs by their `fromSection` header
  const groupedDisplayedMcqs = useMemo(() => {
    const groups: { sectionTitle: string; topicId: string; items: MCQItem[] }[] = [];
    for (const item of displayedMcqs) {
      const lastGroup = groups[groups.length - 1];
      if (
        !lastGroup ||
        lastGroup.sectionTitle !== item.fromSection ||
        lastGroup.topicId !== item.topicId
      ) {
        groups.push({
          sectionTitle: item.fromSection,
          topicId: item.topicId,
          items: [item],
        });
      } else {
        lastGroup.items.push(item);
      }
    }
    return groups;
  }, [displayedMcqs]);

  const currentMcqTopicStats = getTopicStats(selectedMcqTopic);

  const getPartNotesList = (p: PartFilter): TopicNote[] => {
    if (p === 1) return NOTES_PART_1;
    if (p === 2) return NOTES_PART_2;
    if (p === 3) return NOTES_PART_3;
    if (p === 4) return NOTES_PART_4;
    if (p === 5) return NOTES_PART_5;
    return NOTES_PART_6;
  };

  const currentNotesPartList = getPartNotesList(activeNotesPart);
  const currentMcqPartList = getPartNotesList(activeMcqPart);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Sticky Top Navbar (Strict 3-Zone Contract on Desktop + Clean Mobile Menu) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Brand Title */}
          <button
            onClick={() => handleSelectPage('home')}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-950 font-display whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            British Constitution
          </button>

          {/* Zone 2: Desktop Navbar Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            {(
              [
                { id: 'home', label: 'Syllabus' },
                { id: 'notes', label: 'Notes' },
                { id: 'mcqs', label: 'MCQs' },
                { id: 'flashcards', label: 'Flashcards' },
                { id: 'revision', label: 'Revision' },
                { id: 'results', label: 'Results' },
              ] as { id: ActivePage; label: string }[]
            ).map((navItem) => (
              <button
                key={navItem.id}
                onClick={() => handleSelectPage(navItem.id)}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                  activePage === navItem.id
                    ? 'border-slate-950 text-slate-950 font-semibold'
                    : 'border-transparent hover:text-slate-950'
                }`}
              >
                {navItem.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Theme Switcher + Glossary (Desktop) / Menu Toggle (Mobile) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* 3-Theme Switcher: Light, Dark, and #f5ecc2/#437742/#97acc8 */}
            <div
              role="group"
              aria-label="Theme Mode"
              className="flex items-center gap-0.5 p-1 bg-slate-100 rounded-lg border border-slate-200/80"
            >
              <button
                type="button"
                onClick={() => setThemeMode('light')}
                title="Light Theme"
                className={`px-2 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  themeMode === 'light'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Light</span>
              </button>

              <button
                type="button"
                onClick={() => setThemeMode('dark')}
                title="Dark Theme"
                className={`px-2 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  themeMode === 'dark'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dark</span>
              </button>

              <button
                type="button"
                onClick={() => setThemeMode('tricolor')}
                title="3-Color Theme (#f5ecc2 · #437742 · #97acc8)"
                className={`px-2 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  themeMode === 'tricolor'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <span className="inline-flex items-center -space-x-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20"
                    style={{ backgroundColor: '#f5ecc2' }}
                  />
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20"
                    style={{ backgroundColor: '#437742' }}
                  />
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20"
                    style={{ backgroundColor: '#97acc8' }}
                  />
                </span>
                <span className="hidden sm:inline">Theme</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setGlossaryDrawerOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Glossary</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 min-h-[38px] rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 text-slate-900" />
                  <span className="text-xs font-semibold">Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-slate-900" />
                  <span className="text-xs font-semibold">Menu</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Clean Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 shadow-lg">
            <nav aria-label="Mobile Navigation" className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSelectPage('home')}
                className={`flex items-center gap-2.5 px-3.5 py-3 min-h-[44px] rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activePage === 'home'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Home className="w-4 h-4 shrink-0" />
                <span>Syllabus</span>
              </button>

              <button
                onClick={() => handleSelectPage('notes')}
                className={`flex items-center gap-2.5 px-3.5 py-3 min-h-[44px] rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activePage === 'notes'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Study Notes</span>
              </button>

              <button
                onClick={() => handleSelectPage('mcqs')}
                className={`flex items-center gap-2.5 px-3.5 py-3 min-h-[44px] rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activePage === 'mcqs'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>Practice MCQs</span>
              </button>

              <button
                onClick={() => handleSelectPage('flashcards')}
                className={`flex items-center gap-2.5 px-3.5 py-3 min-h-[44px] rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activePage === 'flashcards'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>Flashcards</span>
              </button>

              <button
                onClick={() => handleSelectPage('revision')}
                className={`flex items-center gap-2.5 px-3.5 py-3 min-h-[44px] rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activePage === 'revision'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>Revision Sheet</span>
              </button>

              <button
                onClick={() => handleSelectPage('results')}
                className={`flex items-center gap-2.5 px-3.5 py-3 min-h-[44px] rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activePage === 'results'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <History className="w-4 h-4 shrink-0" />
                <span>Saved Results</span>
              </button>
            </nav>

            <div className="mt-2 pt-2 border-t border-slate-100 space-y-2">
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setThemeMode('light')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border cursor-pointer ${
                    themeMode === 'light'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => setThemeMode('dark')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
                <button
                  type="button"
                  onClick={() => setThemeMode('tricolor')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border cursor-pointer ${
                    themeMode === 'tricolor'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>3-Color</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setGlossaryDrawerOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[42px] rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-900" />
                <span>Word Meanings Dictionary</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Word Meanings Dictionary Modal */}
      {glossaryDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-950">
                  Constitutional &amp; Academic Glossary ({CONSTITUTION_GLOSSARY.length} Terms)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Hover or tap any dotted-underlined word in the study notes for its instant meaning.
                </p>
              </div>
              <button
                onClick={() => setGlossaryDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 sm:px-5 py-2.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-50 text-xs">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={glossarySearchQuery}
                  onChange={(e) => setGlossarySearchQuery(e.target.value)}
                  placeholder="Search word, phrase, or meaning..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                <span className="font-medium text-slate-700">
                  Underline words in text:
                </span>
                <button
                  onClick={() => setHighlightEnabled((prev) => !prev)}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                    highlightEnabled
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {highlightEnabled ? 'On' : 'Off'}
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto divide-y divide-slate-100">
              {CONSTITUTION_GLOSSARY.filter((item) => {
                if (!glossarySearchQuery.trim()) return true;
                const q = glossarySearchQuery.toLowerCase();
                return (
                  item.term.toLowerCase().includes(q) ||
                  item.meaning.toLowerCase().includes(q) ||
                  (item.aliases && item.aliases.some((a) => a.toLowerCase().includes(q))) ||
                  (item.context && item.context.toLowerCase().includes(q))
                );
              }).map((item) => (
                <div key={item.term} className="py-3 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-baseline gap-1.5">
                      <span className="text-sm font-bold text-slate-900 font-mono">
                        {item.term}
                      </span>
                      {item.aliases && item.aliases.length > 0 && (
                        <span className="text-[11px] text-slate-400 font-mono">
                          ({item.aliases.join(', ')})
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        openMeaning(item, item.term);
                        setGlossaryDrawerOpen(false);
                      }}
                      className="text-xs font-medium text-blue-900 hover:underline cursor-pointer shrink-0"
                    >
                      Show
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notification Banner for Local Save */}
      {saveToastMessage && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg border border-slate-700 flex items-center gap-2.5 text-xs sm:text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveToastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 py-5 sm:py-8">
        {/* =========================================================
            PAGE 1: HOME PAGE — FULL SYLLABUS (PARTS 1 TO 6)
           ========================================================= */}
        {activePage === 'home' && (
          <div className="space-y-6">
            {/* Clean Header */}
            <section className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                  Unit 1 — The British Constitution
                </h1>
                <p className="text-xs sm:text-sm text-slate-600">
                  Select any syllabus section below to read the verbatim study notes or attempt topic-wise MCQs.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => handleSelectPage('notes')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Study Notes</span>
                </button>
                <button
                  onClick={() => handleSelectPage('mcqs')}
                  className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Practice MCQs</span>
                </button>
                <button
                  onClick={() => handleSelectPage('flashcards')}
                  className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Flashcards</span>
                </button>
                <button
                  onClick={() => handleSelectPage('revision')}
                  className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Revision Sheet</span>
                </button>
              </div>
            </section>

            {/* MAIN SECTION: FULL SYLLABUS (PARTS 1 TO 6) */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-950">
                  Full Syllabus (Parts 1 to 6)
                </h2>
                <span className="text-xs text-slate-500">
                  6 Parts · 38 Topics · 966 MCQs
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                {SYLLABUS_SECTIONS.map((sec) => {
                  const partTopicKey = `ALL_PART_${sec.partNumber}`;

                  return (
                    <div
                      key={sec.partNumber}
                      className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3 syllabus-part-header-divider pb-3">
                          <h3 className="text-base sm:text-lg font-bold text-slate-950">
                            {sec.title}
                          </h3>
                          <div className="flex items-center gap-3 shrink-0 text-xs font-semibold">
                            <button
                              onClick={() => navigateToTopicNotes(partTopicKey)}
                              className="text-slate-600 hover:text-slate-950 hover:underline cursor-pointer"
                            >
                              Notes
                            </button>
                            <span className="text-slate-300">·</span>
                            <button
                              onClick={() => navigateToTopicMcqs(partTopicKey)}
                              className="text-blue-900 hover:underline cursor-pointer"
                            >
                              MCQs
                            </button>
                          </div>
                        </div>

                        <ul className="divide-y divide-slate-100 text-sm text-slate-700">
                          {sec.items.map((item, idx) => (
                            <li key={idx} className="py-2 first:pt-0 last:pb-0 space-y-1">
                              <div className="flex items-start justify-between gap-3">
                                <span className="leading-relaxed text-slate-800">
                                  {item.text}
                                </span>
                                {item.linkedTopicId && (
                                  <div className="flex items-center gap-2 shrink-0 pt-0.5 text-xs">
                                    <button
                                      onClick={() => navigateToTopicNotes(item.linkedTopicId!)}
                                      className="font-medium text-slate-500 hover:text-slate-950 hover:underline cursor-pointer"
                                    >
                                      Notes
                                    </button>
                                    <span className="text-slate-300">·</span>
                                    <button
                                      onClick={() => navigateToTopicMcqs(item.linkedTopicId!)}
                                      className="font-semibold text-blue-900 hover:underline cursor-pointer"
                                    >
                                      MCQs
                                    </button>
                                  </div>
                                )}
                              </div>
                              {item.subItems && item.subItems.length > 0 && (
                                <ul className="pl-4 space-y-0.5 text-xs text-slate-500">
                                  {item.subItems.map((sub, sIdx) => (
                                    <li key={sIdx}>· {sub}</li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            PAGE 2: STUDY NOTES PAGE (ALL VERBATIM NOTES + TABLES)
           ========================================================= */}
        {activePage === 'notes' && (
          <div className="space-y-6">
            {/* Clean Notes Navigation Bar */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-950">
                  Study Notes
                </h1>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={notesSearchQuery}
                      onChange={(e) => setNotesSearchQuery(e.target.value)}
                      placeholder="Search notes..."
                      className="w-full pl-8 pr-8 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900"
                    />
                    {notesSearchQuery && (
                      <button
                        onClick={() => setNotesSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setHighlightEnabled((prev) => !prev)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      highlightEnabled
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    {highlightEnabled ? 'Meanings: On' : 'Meanings: Off'}
                  </button>
                </div>
              </div>

              {/* Part 1 to 6 Selector (Horizontal Scroll on Mobile) */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                  {(
                    [
                      { part: 1 as PartFilter, label: 'Part 1: Nature', defaultTopic: '1.1' },
                      { part: 2 as PartFilter, label: 'Part 2: Sources', defaultTopic: '2.1' },
                      {
                        part: 3 as PartFilter,
                        label: 'Part 3: Conventions',
                        defaultTopic: '3.1 & 3.2',
                      },
                      {
                        part: 4 as PartFilter,
                        label: 'Part 4: Salient Features',
                        defaultTopic: '4.1',
                      },
                      {
                        part: 5 as PartFilter,
                        label: 'Part 5: Development',
                        defaultTopic: '5.1',
                      },
                      {
                        part: 6 as PartFilter,
                        label: 'Part 6: Readings',
                        defaultTopic: '6.1',
                      },
                    ]
                  ).map((item) => (
                    <button
                      key={item.part}
                      onClick={() => {
                        setNotesSearchQuery('');
                        setActiveNotesPart(item.part);
                        setSelectedNotesTopic(item.defaultTopic);
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        activeNotesPart === item.part
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Topic Selector for Active Part */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
                  {currentNotesPartList.map((topic) => {
                    const isActive = selectedNotesTopic === topic.topicId && !notesSearchQuery;
                    const isRevised = Boolean(studyState.completedNotesTopics[topic.topicId]);
                    return (
                      <button
                        key={topic.topicId}
                        onClick={() => {
                          setNotesSearchQuery('');
                          setSelectedNotesTopic(topic.topicId);
                        }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-blue-50 text-blue-950 border border-blue-200 font-semibold'
                            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-transparent'
                        }`}
                      >
                        Topic {topic.topicId} {isRevised ? '✓' : ''}
                      </button>
                    );
                  })}
                  {currentNotesPartList.length > 1 && (
                    <button
                      onClick={() => {
                        setNotesSearchQuery('');
                        setSelectedNotesTopic(`ALL_PART_${activeNotesPart}`);
                      }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        selectedNotesTopic === `ALL_PART_${activeNotesPart}` && !notesSearchQuery
                          ? 'bg-blue-50 text-blue-950 border border-blue-200 font-semibold'
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      All Part {activeNotesPart}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Notes Content Display */}
            {displayedNotes.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-3">
                <p className="text-sm text-slate-600">
                  No notes matched &ldquo;{notesSearchQuery}&rdquo;.
                </p>
                <button
                  onClick={() => setNotesSearchQuery('')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {displayedNotes.map((topic) => {
                  const isRevised = Boolean(studyState.completedNotesTopics[topic.topicId]);
                  const topicStats = getTopicStats(topic.topicId);

                  return (
                    <article
                      key={topic.topicId}
                      className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-8 space-y-7"
                    >
                      {/* Clean Topic Header */}
                      <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="text-xs text-slate-500">
                            Part {topic.partNumber} · {topic.partTitle}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
                            {topic.topicTitle}
                          </h2>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCopyTopicNotes(topic)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                              copiedTopicId === topic.topicId
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                            title="Copy all notes, tables, and key points for this topic in one click"
                          >
                            {copiedTopicId === topic.topicId ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Notes</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleToggleTopicCompleted(topic.topicId)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                              isRevised
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isRevised ? 'Revised' : 'Mark Revised'}</span>
                          </button>

                          <button
                            onClick={() => navigateToTopicMcqs(topic.topicId)}
                            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                          >
                            <span>MCQs ({topicStats.total})</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Verbatim Sub-sections */}
                      <div className="space-y-7">
                        {topic.subSections.map((sub) => (
                          <div
                            key={sub.code}
                            id={`section-${sub.code}`}
                            className="space-y-2.5 scroll-mt-20"
                          >
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-baseline gap-2">
                              <span className="font-mono text-sm font-semibold text-blue-900">
                                {sub.code}
                              </span>
                              <span>{sub.title}</span>
                            </h3>

                            {sub.bullets.length > 0 && (
                              <ul className="space-y-2 text-sm sm:text-[15px] text-slate-800 leading-relaxed">
                                {sub.bullets.map((b, bIdx) => (
                                  <li key={bIdx} className="space-y-1.5">
                                    <div className="flex items-start gap-2.5">
                                      <span className="text-slate-400 select-none mt-0.5">
                                        ·
                                      </span>
                                      <span>
                                        <SmartText text={b.text} />
                                      </span>
                                    </div>
                                    {b.subBullets && b.subBullets.length > 0 && (
                                      <ul className="pl-6 space-y-1 text-sm text-slate-600">
                                        {b.subBullets.map((sb, sbIdx) => (
                                          <li key={sbIdx} className="flex items-start gap-2">
                                            <span className="text-slate-400 select-none">·</span>
                                            <span>
                                              <SmartText text={sb} />
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Sub-section Table */}
                            {sub.table && (
                              <div className="overflow-x-auto border border-slate-200 rounded-lg mt-2">
                                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                                  <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-semibold">
                                      {sub.table.headers.map((h, hIdx) => (
                                        <th key={hIdx} className="py-2.5 px-3.5">
                                          {h}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 bg-white">
                                    {sub.table.rows.map((row, rIdx) => (
                                      <tr key={rIdx}>
                                        {row.map((cell, cIdx) => (
                                          <td
                                            key={cIdx}
                                            className={`py-2.5 px-3.5 align-top ${
                                              cIdx === 0
                                                ? 'font-semibold text-slate-900'
                                                : 'text-slate-700'
                                            }`}
                                          >
                                            <SmartText text={cell} />
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Key Exam Points Section */}
                      <div className="pt-5 border-t border-slate-100 space-y-3">
                        <h3 className="text-base sm:text-lg font-bold text-slate-950">
                          {topic.keyExamPointsTitle}
                        </h3>

                        {topic.keyExamPointsFormat === 'list' ? (
                          <ul className="space-y-2 text-sm text-slate-800">
                            {topic.keyExamPoints.map((kp, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-slate-400">·</span>
                                <span>
                                  <strong className="font-semibold text-slate-950">
                                    <SmartText text={kp.point} />
                                  </strong>{' '}
                                  — <SmartText text={kp.keyIdea} />
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="overflow-x-auto border border-slate-200 rounded-lg">
                            <table className="w-full text-left border-collapse text-xs sm:text-sm">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-semibold">
                                  <th className="py-2.5 px-3.5 w-1/3">
                                    {topic.topicId === '1.4' ? 'Feature' : 'Point'}
                                  </th>
                                  <th className="py-2.5 px-3.5">
                                    {topic.topicId === '1.4' ? 'Explanation' : 'Key Idea'}
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 bg-white">
                                {topic.keyExamPoints.map((kp, idx) => (
                                  <tr key={idx}>
                                    <td className="py-2.5 px-3.5 font-semibold text-slate-900 align-top">
                                      <SmartText text={kp.point} />
                                    </td>
                                    <td className="py-2.5 px-3.5 text-slate-700 align-top">
                                      <SmartText text={kp.keyIdea} />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {/* Personal Notes Input */}
                      <div className="pt-4 border-t border-slate-100 space-y-1.5">
                        <label
                          htmlFor={`personal-note-${topic.topicId}`}
                          className="block text-xs font-medium text-slate-500"
                        >
                          Personal study notes (saved automatically):
                        </label>
                        <textarea
                          id={`personal-note-${topic.topicId}`}
                          rows={2}
                          value={studyState.personalNotes[topic.topicId] || ''}
                          onChange={(e) => handleSavePersonalNote(topic.topicId, e.target.value)}
                          placeholder={`Add your notes for Topic ${topic.topicId}...`}
                          className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-slate-900"
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            PAGE 3: PRACTICE MCQS PAGE (ALL 966 QUESTIONS)
           ========================================================= */}
        {activePage === 'mcqs' && (
          <div className="space-y-6">
            {/* Clean MCQ Control Bar */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-950">
                    Practice MCQs
                  </h1>
                  <p className="text-xs text-slate-500 font-mono tabular-nums mt-0.5">
                    {getSelectionTitle(selectedMcqTopic)} · {currentMcqTopicStats.attempted}/
                    {currentMcqTopicStats.total} answered ({currentMcqTopicStats.percentage}%)
                  </p>
                </div>

                {/* Mode Switcher */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                    <button
                      onClick={() => setQuizMode('attempt')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        quizMode === 'attempt'
                          ? 'bg-white text-slate-950 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Exam Mode
                    </button>
                    <button
                      onClick={() => setQuizMode('instant')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        quizMode === 'instant'
                          ? 'bg-white text-slate-950 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Instant Key
                    </button>
                  </div>

                  <button
                    onClick={() => setShowAllExplanations((prev) => !prev)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    {showAllExplanations ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide Answers</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Show Answers</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Part & Topic Selector (Horizontal Scroll on Mobile) */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                  {(
                    [
                      { part: 1 as PartFilter, label: 'Part 1: Nature', defaultTopic: '1.1' },
                      { part: 2 as PartFilter, label: 'Part 2: Sources', defaultTopic: '2.1' },
                      {
                        part: 3 as PartFilter,
                        label: 'Part 3: Conventions',
                        defaultTopic: '3.1 & 3.2',
                      },
                      {
                        part: 4 as PartFilter,
                        label: 'Part 4: Salient Features',
                        defaultTopic: '4.1',
                      },
                      {
                        part: 5 as PartFilter,
                        label: 'Part 5: Development',
                        defaultTopic: '5.1',
                      },
                      {
                        part: 6 as PartFilter,
                        label: 'Part 6: Readings',
                        defaultTopic: '6.1',
                      },
                    ]
                  ).map((item) => (
                    <button
                      key={item.part}
                      onClick={() => {
                        setActiveMcqPart(item.part);
                        setSelectedMcqTopic(item.defaultTopic);
                        setConfirmResetTopic(false);
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        activeMcqPart === item.part && selectedMcqTopic !== 'ALL'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Topic Buttons for Active Part */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
                  {currentMcqPartList.map((t) => {
                    const active = selectedMcqTopic === t.topicId;
                    return (
                      <button
                        key={t.topicId}
                        onClick={() => {
                          setSelectedMcqTopic(t.topicId);
                          setConfirmResetTopic(false);
                        }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-blue-50 text-blue-950 border border-blue-200 font-semibold'
                            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-transparent'
                        }`}
                      >
                        Topic {t.topicId}
                      </button>
                    );
                  })}
                  {currentMcqPartList.length > 1 && (
                    <button
                      onClick={() => {
                        setSelectedMcqTopic(`ALL_PART_${activeMcqPart}`);
                        setConfirmResetTopic(false);
                      }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        selectedMcqTopic === `ALL_PART_${activeMcqPart}`
                          ? 'bg-blue-50 text-blue-950 border border-blue-200 font-semibold'
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      All Part {activeMcqPart}
                    </button>
                  )}
                </div>
              </div>

              {/* Filter & Actions Row */}
              <div className="pt-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {(
                    [
                      { id: 'all', label: `All (${currentMcqTopicStats.total})` },
                      {
                        id: 'unanswered',
                        label: `Unanswered (${currentMcqTopicStats.unanswered})`,
                      },
                      { id: 'correct', label: `Correct (${currentMcqTopicStats.correct})` },
                      {
                        id: 'incorrect',
                        label: `Incorrect (${currentMcqTopicStats.incorrect})`,
                      },
                      { id: 'bookmarked', label: 'Bookmarked' },
                    ] as { id: StatusFilter; label: string }[]
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setStatusFilter(tab.id)}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        statusFilter === tab.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative flex-1 sm:w-52">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={mcqSearchQuery}
                      onChange={(e) => setMcqSearchQuery(e.target.value)}
                      placeholder="Filter questions..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900"
                    />
                  </div>

                  <button
                    onClick={handleSubmitAndSaveTopicResult}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Save Result</span>
                  </button>

                  {!confirmResetTopic ? (
                    <button
                      onClick={() => setConfirmResetTopic(true)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-red-700 bg-slate-100 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg">
                      <span className="text-xs text-red-800 font-medium">Clear?</span>
                      <button
                        onClick={handleResetCurrentTopic}
                        className="px-2 py-0.5 text-xs font-semibold text-white bg-red-600 rounded cursor-pointer"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmResetTopic(false)}
                        className="px-2 py-0.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded cursor-pointer"
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Questions List Grouped by Sub-Section Header */}
            {groupedDisplayedMcqs.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-3">
                <p className="text-sm text-slate-600">
                  No questions match your current filter.
                </p>
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setMcqSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg cursor-pointer"
                >
                  Show All Questions
                </button>
              </div>
            ) : (
              <div className="space-y-7">
                {groupedDisplayedMcqs.map((group, gIdx) => (
                  <section key={`${group.topicId}-${gIdx}`} className="space-y-3.5">
                    <div className="border-b border-slate-200 pb-1.5 flex items-center justify-between">
                      <h2 className="text-sm sm:text-base font-bold text-slate-900">
                        {group.sectionTitle}
                      </h2>
                      <span className="text-xs font-mono text-slate-400">
                        {group.topicId}
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      {group.items.map((q) => {
                        const userAns = studyState.selectedAnswers[q.id];
                        const isRevealed =
                          showAllExplanations ||
                          quizMode === 'instant' ||
                          Boolean(studyState.revealedQuestions[q.id]);
                        const isBookmarked = Boolean(studyState.bookmarkedQuestions[q.id]);

                        return (
                          <div
                            key={q.id}
                            className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-3.5"
                          >
                            {/* Question Top Row */}
                            <div className="flex items-start justify-between gap-3">
                              <div className="text-sm sm:text-base font-semibold text-slate-950 leading-snug">
                                <span className="font-mono tabular-nums text-slate-400 mr-2">
                                  {q.questionNumber}.
                                </span>
                                <SmartText text={q.question} />
                              </div>

                              <button
                                onClick={() => handleToggleBookmark(q.id)}
                                title="Bookmark question"
                                className={`p-1.5 rounded-lg border transition-colors cursor-pointer shrink-0 ${
                                  isBookmarked
                                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                                    : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
                                }`}
                              >
                                <Bookmark className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* 4 Options (a), (b), (c), (d) */}
                            <div className="grid grid-cols-1 gap-2">
                              {q.options.map((opt) => {
                                const isSelected = userAns === opt.key;
                                const isRightOption = q.correctOption === opt.key;

                                let optionStyle =
                                  'bg-slate-50/60 border-slate-200/90 text-slate-800 hover:bg-slate-100/70';
                                let stateMark: string | null = null;

                                if (!isRevealed) {
                                  if (isSelected) {
                                    optionStyle =
                                      'bg-blue-50 border-blue-900 text-slate-950 font-medium';
                                  }
                                } else {
                                  if (isRightOption) {
                                    optionStyle =
                                      'bg-emerald-50 border-emerald-600 text-emerald-950 font-medium';
                                    stateMark = '✓';
                                  } else if (isSelected && !isRightOption) {
                                    optionStyle =
                                      'bg-red-50 border-red-500 text-red-950 font-medium';
                                    stateMark = '✗';
                                  }
                                }

                                return (
                                  <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => handleSelectOption(q.id, opt.key)}
                                    className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm transition-colors flex items-start justify-between gap-3 cursor-pointer ${optionStyle}`}
                                  >
                                    <div className="flex items-start gap-2.5">
                                      <span className="font-mono font-semibold shrink-0">
                                        ({opt.key})
                                      </span>
                                      <span>{opt.text}</span>
                                    </div>
                                    {stateMark && (
                                      <span className="font-mono font-bold shrink-0">
                                        {stateMark}
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Check Answer Toggle */}
                            <div className="pt-0.5 flex items-center justify-between">
                              <button
                                type="button"
                                onClick={() => handleToggleRevealQuestion(q.id)}
                                className="text-xs font-semibold text-blue-900 hover:underline cursor-pointer"
                              >
                                {isRevealed ? 'Hide Explanation' : 'Check Answer'}
                              </button>
                            </div>

                            {isRevealed && (
                              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 space-y-1">
                                <div className="font-semibold text-slate-900">
                                  Correct Option: ({q.correctOption})
                                </div>
                                <p className="leading-relaxed">
                                  <SmartText text={q.explanation} />
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* Clean Save Result Footer Bar */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-950">
                  Save your score for {getSelectionTitle(selectedMcqTopic)}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  All selected options are already saved automatically in your browser.
                </p>
              </div>
              <button
                onClick={handleSubmitAndSaveTopicResult}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap self-start sm:self-auto"
              >
                <Award className="w-4 h-4" />
                <span>Submit &amp; Save Result</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            PAGE 4: INTERACTIVE 3D FLIP FLASHCARDS
           ========================================================= */}
        {activePage === 'flashcards' && <FlashcardsPage />}

        {/* =========================================================
            PAGE 5: FULL REVISION SHEET & FINAL ANSWER KEY
           ========================================================= */}
        {activePage === 'revision' && (
          <RevisionAndFlashcardsView
            onNavigateToTopicMcqs={navigateToTopicMcqs}
            onNavigateToTopicNotes={navigateToTopicNotes}
          />
        )}

        {/* =========================================================
            PAGE 6: SAVED RESULTS & LOCAL DATA DASHBOARD
           ========================================================= */}
        {activePage === 'results' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-950">
                    Saved Results
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5 font-mono tabular-nums">
                    Overall: {globalStats.attemptedCount}/{globalStats.totalQuestions} answered ·{' '}
                    {globalStats.correctCount} correct ({globalStats.accuracy}% accuracy)
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleExportResultsReport}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download (.txt)</span>
                  </button>

                  {!confirmClearAllData ? (
                    <button
                      onClick={() => setConfirmClearAllData(true)}
                      className="px-3.5 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear Data</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg">
                      <span className="text-xs font-medium text-red-900">Erase all?</span>
                      <button
                        onClick={handleClearAllLocalData}
                        className="px-2 py-0.5 text-xs font-semibold text-white bg-red-600 rounded cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmClearAllData(false)}
                        className="px-2 py-0.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submitted Quiz Attempt History Log */}
              <div className="space-y-3">
                <h2 className="text-base font-bold text-slate-900">
                  Saved Result Snapshots ({studyState.savedAttempts.length})
                </h2>

                {studyState.savedAttempts.length === 0 ? (
                  <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
                    <p className="text-xs sm:text-sm text-slate-600">
                      No formal snapshots submitted yet. Your {globalStats.attemptedCount} answered questions are saved automatically.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl">
                    {studyState.savedAttempts.map((attempt) => (
                      <div
                        key={attempt.id}
                        className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            {attempt.topicTitle}
                          </div>
                          <div className="text-xs text-slate-400 font-mono">
                            {attempt.timestamp}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono tabular-nums">
                          <span>
                            {attempt.correctCount}/{attempt.totalQuestions} ({attempt.percentage}%)
                          </span>
                          <button
                            onClick={() => navigateToTopicMcqs(attempt.topicId)}
                            className="font-sans font-semibold text-blue-900 hover:underline cursor-pointer"
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Topic-by-Topic Table */}
              <div className="space-y-3 pt-2">
                <h2 className="text-base font-bold text-slate-900">
                  Topic-Wise Breakdown
                </h2>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-semibold">
                        <th className="py-2.5 px-3.5">Topic</th>
                        <th className="py-2.5 px-3.5 text-right font-mono">Attempted</th>
                        <th className="py-2.5 px-3.5 text-right font-mono">Correct</th>
                        <th className="py-2.5 px-3.5 text-right font-mono">Score</th>
                        <th className="py-2.5 px-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono tabular-nums">
                      {ALL_NOTES.map((t) => {
                        const st = getTopicStats(t.topicId);
                        return (
                          <tr key={t.topicId} className="hover:bg-slate-50/70">
                            <td className="py-2.5 px-3.5 font-sans font-medium text-slate-900">
                              {t.shortTitle}
                            </td>
                            <td className="py-2.5 px-3.5 text-right text-slate-600">
                              {st.attempted}/{st.total}
                            </td>
                            <td className="py-2.5 px-3.5 text-right text-emerald-700 font-semibold">
                              {st.correct}
                            </td>
                            <td className="py-2.5 px-3.5 text-right font-bold text-slate-950">
                              {st.percentage}%
                            </td>
                            <td className="py-2.5 px-3.5 text-right font-sans">
                              <button
                                onClick={() => navigateToTopicMcqs(t.topicId)}
                                className="text-xs font-semibold text-blue-900 hover:underline cursor-pointer whitespace-nowrap"
                              >
                                Practice
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Quiet Academic Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-5 px-4 sm:px-6 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <div>Unit 1 — The British Constitution</div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleSelectPage('home')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Syllabus
            </button>
            <span>·</span>
            <button
              onClick={() => handleSelectPage('notes')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Notes
            </button>
            <span>·</span>
            <button
              onClick={() => handleSelectPage('mcqs')}
              className="hover:text-slate-900 cursor-pointer"
            >
              MCQs
            </button>
            <span>·</span>
            <button
              onClick={() => handleSelectPage('flashcards')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Flashcards
            </button>
            <span>·</span>
            <button
              onClick={() => handleSelectPage('revision')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Revision
            </button>
            <span>·</span>
            <button
              onClick={() => setGlossaryDrawerOpen(true)}
              className="hover:text-slate-900 cursor-pointer"
            >
              Glossary
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <GlossaryProvider>
      <StudyPortalContent />
    </GlossaryProvider>
  );
}

