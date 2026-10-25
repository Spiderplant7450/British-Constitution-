export interface BulletItem {
  text: string;
  subBullets?: string[];
}

export interface SubSectionTable {
  headers: string[];
  rows: string[][];
}

export interface SubSection {
  code: string;
  title: string;
  groupHeader?: string;
  bullets: BulletItem[];
  table?: SubSectionTable;
}

export interface KeyExamPoint {
  point: string;
  keyIdea: string;
}

export interface TopicNote {
  partNumber: number;
  partTitle: string;
  topicId: string; // e.g., "1.1", "2.1", "5.1", "6"
  topicTitle: string;
  shortTitle: string;
  subSections: SubSection[];
  keyExamPointsTitle: string;
  keyExamPointsFormat: 'list' | 'table';
  keyExamPoints: KeyExamPoint[];
}

export interface MCQOption {
  key: 'a' | 'b' | 'c' | 'd';
  text: string;
}

export interface MCQItem {
  id: string;
  partNumber?: number;
  topicId: string;
  questionNumber: number;
  fromSection: string;
  question: string;
  options: MCQOption[];
  correctOption: 'a' | 'b' | 'c' | 'd';
  explanation: string;
}

export interface SyllabusItem {
  code?: string;
  text: string;
  subItems?: string[];
  linkedTopicId?: string;
}

export interface SyllabusSection {
  partNumber: number;
  title: string;
  importantNote?: string;
  isAvailable: boolean;
  items: SyllabusItem[];
}

export interface SavedTopicAttempt {
  id: string;
  topicId: string;
  topicTitle: string;
  timestamp: string;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  percentage: number;
  answersSnapshot: Record<string, 'a' | 'b' | 'c' | 'd'>;
}

export interface LocalStudyState {
  selectedAnswers: Record<string, 'a' | 'b' | 'c' | 'd'>;
  revealedQuestions: Record<string, boolean>;
  bookmarkedQuestions: Record<string, boolean>;
  completedNotesTopics: Record<string, boolean>;
  personalNotes: Record<string, string>;
  savedAttempts: SavedTopicAttempt[];
}

export interface FlashcardItem {
  number: number;
  front: string;
  back: string;
}

export interface TopicFlashcardDeck {
  topicId: string;
  partNumber: number;
  title: string;
  flashcards: FlashcardItem[];
  oneLiners: string[];
}
