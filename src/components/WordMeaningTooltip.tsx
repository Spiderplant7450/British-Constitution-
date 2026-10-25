import React, { createContext, useContext, useState, useMemo } from 'react';
import { BookOpen, X } from 'lucide-react';

export interface GlossaryEntry {
  term: string;
  aliases?: string[];
  meaning: string;
  context?: string;
}

export const CONSTITUTION_GLOSSARY: GlossaryEntry[] = [
  {
    term: 'ultra vires',
    meaning: 'Latin for "beyond the powers." If a law or official act exceeds the legal power granted by a Constitution or statute, courts declare it invalid.',
    context: 'Topic 1.1.2 — In countries with a written constitution, inconsistent statutory laws are held unconstitutional or ultra vires.',
  },
  {
    term: 'Constituent Assembly',
    meaning: 'A body of representatives specially elected or convened for the purpose of drafting or adopting a formal written constitution.',
    context: 'Topic 1.1.1 — Unlike the US or India, the British Constitution was never drafted by a Constituent Assembly.',
  },
  {
    term: 'statutory law',
    aliases: ['statutory', 'statutes', 'statute'],
    meaning: 'Written laws formally enacted and passed by a legislature (such as Acts of Parliament).',
    context: 'Topic 1.1.5 — In Britain, Constitutional Law and Statutory/Ordinary Law stand at par with one another.',
  },
  {
    term: 'codified',
    aliases: ['codification', 'uncodified'],
    meaning: 'Arranged and collected systematically into a single, formal written document or code.',
    context: 'Topic 1.2.2 — The British Constitution has never been systematised or codified into a single document.',
  },
  {
    term: 'unsystematised',
    aliases: ['systematised'],
    meaning: 'Not arranged according to a single planned system or formal order; scattered across history.',
    context: 'Topic 1.2.1 — The British Constitution remains undefined, unsystematised, and undecided.',
  },
  {
    term: 'judicial review',
    meaning: 'The power of law courts to examine laws passed by the legislature and strike them down if they violate the Constitution.',
    context: 'Topic 1.2.6 — Because Parliament is sovereign, British courts cannot set aside an Act of Parliament.',
  },
  {
    term: 'expediency',
    aliases: ['expedient'],
    meaning: 'Practical suitability or doing what is convenient and workable in the circumstances, rather than following rigid abstract theory.',
    context: 'Topic 1.1.7 & 1.4.4 — Expediency is the guiding principle of the Englishman’s political life.',
  },
  {
    term: 'hotchpotch',
    meaning: 'A confused mixture or jumble of unrelated things without order or purpose.',
    context: 'Topic 1.4.7 — Though lacking logical symmetry, the British Constitution is not a mere hotchpotch because its rules come from conscious experience.',
  },
  {
    term: 'exigencies',
    aliases: ['exigency'],
    meaning: 'Urgent needs, demands, or pressing requirements of a particular time or situation.',
    context: 'Topic 1.2.10 & 2.2.2 — Constitutional rules and statutes were made according to the exigencies of time.',
  },
  {
    term: 'accretions',
    aliases: ['accretion'],
    meaning: 'Gradual growth or additions accumulated layer by layer over a long period of time.',
    context: 'Topic 1.3.4 — The British Constitution is the result of slow development and successive accretions over a thousand years.',
  },
  {
    term: 'fructification',
    meaning: 'The stage of bearing fruit, maturity, or full realization of earlier foundations.',
    context: 'Topic 1.3.10 — The third period of British constitutional growth (1689 to the present) is the period of rounding out or fructification.',
  },
  {
    term: 'suffrage',
    meaning: 'The legal right to vote in political elections (also called the franchise).',
    context: 'Topic 2.2.1 — Ordinary statutes passed between 1867 and 1948 widened suffrage in Britain.',
  },
  {
    term: 'franchise',
    meaning: 'The right to vote in public elections granted to citizens.',
    context: 'Topic 2.2.4 — Reform Acts widened the franchise and developed political democracy.',
  },
  {
    term: 'precedents',
    aliases: ['precedent'],
    meaning: 'Earlier judicial decisions or established political acts that serve as an authoritative rule or example in future similar cases.',
    context: 'Topic 2.3.1 — Judgments of courts create precedents which succeeding judges respect.',
  },
  {
    term: 'Common Law',
    aliases: ['common law'],
    meaning: 'Unwritten law developed through immemorial customs of the realm and judicial decisions rather than parliamentary statutes.',
    context: 'Topic 2.4 — Ensures British civil liberties (speech, press, jury trial) and is the source of Royal Prerogative.',
  },
  {
    term: 'immemorial usages',
    aliases: ['immemorial usage'],
    meaning: 'Customs and practices so ancient that their origin lies beyond historical memory.',
    context: 'Topic 2.4.5 — Blackstone defined Common Law as customs depending on immemorial usages for their support.',
  },
  {
    term: 'bulwark',
    meaning: 'A strong defensive wall, safeguard, or protection against danger.',
    context: 'Topic 2.4.6 — Common Law principles stand as a bulwark of British freedom.',
  },
  {
    term: 'conventions',
    aliases: ['convention'],
    meaning: 'Unwritten rules of constitutional behaviour and political morality that are binding in practice though not enforceable in courts.',
    context: 'Topic 2.5 — Called the "centre and soul" of British constitutional law; e.g., Cabinet Government.',
  },
  {
    term: 'acquiescence',
    meaning: 'Willing acceptance, tacit agreement, or consent without protest.',
    context: 'Topic 2.5.5 — Jennings noted that conventions, like fundamental laws, rest essentially upon general acquiescence.',
  },
  {
    term: 'Royal Prerogative',
    aliases: ['prerogative', 'prerogatives'],
    meaning: 'The historic discretionary powers and privileges remaining in the hands of the Crown (now exercised by Ministers on the Monarch’s behalf).',
    context: 'Topic 2.7 — Includes declaring war, making treaties, pardoning criminals, and dissolving Parliament.',
  },
  {
    term: 'Orders in Council',
    meaning: 'Formal executive orders issued by the Monarch on the advice of the Privy Council / Ministers, used to execute Royal Prerogative or statutory powers.',
    context: 'Topic 2.7.3 — Royal Prerogative functions are executed through Orders in Council or proclamations.',
  },
  {
    term: 'writs',
    aliases: ['writ'],
    meaning: 'Formal written orders issued under royal or judicial authority commanding a specific action (such as holding an election).',
    context: 'Topic 2.7.3 — Executed through proclamations and writs under the great seal.',
  },
  {
    term: 'great seal',
    meaning: 'The official emblem of the Sovereign’s approval attached to the most important state documents, proclamations, and writs.',
    context: 'Topic 2.7.3 — Proclamations and writs under the great seal execute Royal Prerogative powers.',
  },
  {
    term: 'Magna Carta',
    meaning: 'The Great Charter of 1215 agreed to by King John; a foundational landmark establishing that the King is subject to the law.',
    context: 'Topic 2.1.2 — Regarded as the starting landmark of British constitutional liberty.',
  },
  {
    term: 'Petition of Rights',
    meaning: 'A major 1628 English constitutional document setting out specific liberties of subjects that the King is prohibited from infringing.',
    context: 'Topic 2.1.2 — Part of the "Bible of the British Constitution" alongside Magna Carta and the Bill of Rights.',
  },
  {
    term: 'Bill of Rights',
    meaning: 'In Britain, the 1689 Act declaring the rights and liberties of subjects and limiting the powers of the Crown after the Glorious Revolution.',
    context: 'Topic 2.1.4 & 2.1.6 — Embodied constitutional rules and limitations on the King’s powers.',
  },
  {
    term: 'Act of Settlement',
    meaning: 'A 1701 Act of Parliament that settled the succession to the English and Irish crowns on Protestants only and strengthened judicial independence.',
    context: 'Topic 2.1.2 — Passed in 1701 and later modified by the Abdication Act of 1936.',
  },
  {
    term: 'Statute of Westminster',
    meaning: 'A 1931 Act of the UK Parliament that established the legislative independence of the self-governing Dominions of the British Empire.',
    context: 'Topic 2.1.6 & 2.5.7 — Recognised conventions governing relations between the UK and Dominions.',
  },
  {
    term: 'Dominions',
    aliases: ['Dominion'],
    meaning: 'Self-governing nations within the British Empire/Commonwealth (such as Canada, Australia, New Zealand) that shared the British Monarch.',
    context: 'Topic 2.1.6 & 2.5.7 — The Statute of Westminster 1931 established their legislative independence.',
  },
  {
    term: 'breach of privilege',
    meaning: 'An violation or disrespect of the special legal rights and immunities enjoyed by Parliament or its members.',
    context: 'Topic 2.3.3 — In the Sheriff of Middlesex case (1840), courts affirmed Parliament’s right to punish its own members for breach of privilege.',
  },
  {
    term: 'compendiums',
    aliases: ['compendium'],
    meaning: 'Concise, comprehensive collections of detailed knowledge and rules on a subject.',
    context: 'Topic 2.6.2 — Eminent writers like Erskine May provided authoritative compendiums of parliamentary rules.',
  },
  {
    term: 'peerage',
    aliases: ['Life Peers'],
    meaning: 'The system of noble titles (Dukes, Marquesses, Earls, Viscounts, Barons) whose holders historically sat in the House of Lords.',
    context: 'Topic 2.1.2 — Reformed by the Life Peers Act (1958) and Peerage Act (1963).',
  },
  {
    term: 'sovereignty',
    aliases: ['sovereign'],
    meaning: 'Supreme, unlimited legal authority. In Britain, Parliamentary Sovereignty means Parliament can make or unmake any law whatever.',
    context: 'Topic 2.2.6 — Parliament is a sovereign body, though political reality constrains how it uses that power.',
  },
  {
    term: 'sanctity',
    meaning: 'Ultimate importance, inviolability, or sacred legal respect.',
    context: 'Topic 1.1.2 & 2.5.6 — Written constitutions and enacted laws carry special sanctity.',
  },
  {
    term: 'maimed',
    meaning: 'Crippled, severely damaged, or deprived of essential strength and function.',
    context: 'Topic 3.1.2 — Without conventions, the British Constitution becomes maimed, if not absolutely unworkable.',
  },
  {
    term: 'scrupulously',
    meaning: 'With great care, strict honesty, and attention to every detail of duty or principle.',
    context: 'Topic 3.3.1 & 3.5.1 — Why are conventions so scrupulously observed in Britain?',
  },
  {
    term: 'collective responsibility',
    meaning: 'The convention that all Cabinet Ministers are jointly accountable to Parliament for government policy and must publicly support Cabinet decisions or resign.',
    context: 'Topic 3.3.4 & 3.4.1 — Temporarily suspended in 1931 when the Cabinet “agreed to differ”.',
  },
  {
    term: 'mandate convention',
    aliases: ['mandate', 'mandates'],
    meaning: 'The convention that a government should not introduce radical or controversial legislation unless that policy was put before voters in its election programme.',
    context: 'Topic 3.4.3 — Illustrated in 1945 when the Conservative House of Lords passed Labour’s nationalisation bills because Labour had an electoral mandate.',
  },
  {
    term: 'constitutional morality',
    meaning: 'Dicey’s phrase for the unwritten ethical rules and conventions that restrain legal power and indirectly secure the sovereignty of the people.',
    context: 'Topic 3.3.8 & 3.5.5 — Dicey observed that Britain’s modern code of constitutional morality secures the sovereignty of the people.',
  },
  {
    term: 'Law Lords',
    aliases: ['Law Lord'],
    meaning: 'Senior appellate judges appointed to the House of Lords who, by convention, alone sat when the House of Lords acted as the highest Court of Appeal.',
    context: 'Topic 3.4.2 & 3.6.2 — By convention, no lay peer other than a Law Lord sits when the House of Lords acts as a Court of Appeal.',
  },
  {
    term: 'Privy Council',
    meaning: 'A formal body of advisers to the Sovereign; its Judicial Committee served as the highest court of appeal for the British Empire and Commonwealth.',
    context: 'Topic 3.3.11 & 3.5.7 — In British Coal Corporation v. Rex (1935), the Privy Council distinguished abstract legal theory from political realities.',
  },
  {
    term: 'eschewed',
    meaning: 'Deliberately avoided, abstained from, or stayed away from doing something.',
    context: 'Topic 3.6.8 — In converting a monarchy into a democracy, the British eschewed writing new constitutional articles and relied on conventions.',
  },
  {
    term: 'prorogues',
    aliases: ['prorogue', 'prorogued'],
    meaning: 'Formally ends a session of Parliament without dissolving it, pausing parliamentary business until the next session is summoned.',
    context: 'Topic 4.3 — In legal theory, Her Majesty summons, dissolves, and prorogues Parliament.',
  },
  {
    term: 'crowned republic',
    meaning: 'Sidney and Beatrice Webb’s famous phrase describing Britain as a system that retains a Monarch as ceremonial head of state while functioning in practice as a democratic republic.',
    context: 'Topic 4.3 — In ultimate theory Britain is an absolute monarchy, in form a limited constitutional monarchy, and in actual character a democratic “crowned republic”.',
  },
  {
    term: 'transcendental',
    meaning: 'Surpassing all others; supreme, overarching, and beyond ordinary legal limitations.',
    context: 'Topic 4.4 — The legislative authority of the British Parliament is described as transcendental and absolute.',
  },
  {
    term: 'referendum',
    meaning: 'A direct vote in which the entire electorate is asked to accept or reject a particular proposal or constitutional amendment.',
    context: 'Topic 4.5 — Popular ratification of constitutional amendments by referendum (as in Switzerland and Australia) is unknown in Britain.',
  },
  {
    term: 'devolution',
    meaning: 'The statutory delegation of powers from the central government of a sovereign state to regional or local assemblies (such as Scotland and Wales).',
    context: 'Topic 4.6 — Even with devolution, Britain remains a unitary state because all authority flows from the Central Government and Parliament.',
  },
  {
    term: 'inanition',
    meaning: 'Exhaustion, paralysis, or lack of vigour caused by deadlock between competing branches of government.',
    context: 'Topic 4.7 — Greaves noted that parliamentary government avoids the risks of conflict or inanition resulting from strict separation of powers.',
  },
  {
    term: 'Rule of Law',
    meaning: 'A fundamental principle meaning the supremacy of regular law as opposed to arbitrary power, and the equal subjection of all citizens, courts, and officials to the law.',
    context: 'Topic 4.9 — According to Dicey and Lord Hewart, maximum civil liberty in Britain is secured through the Rule of Law.',
  },
  {
    term: 'oligarchical',
    meaning: 'Relating to an oligarchy, where power or status is held by a small privileged or hereditary group (such as hereditary peers in the House of Lords).',
    context: 'Topic 4.10 — Attlee observed that despite monarchical and oligarchical elements, the British system is the best example of parliamentary democracy.',
  },
];

interface GlossaryContextValue {
  activeEntry: GlossaryEntry | null;
  activeMatchedWord: string;
  openMeaning: (entry: GlossaryEntry, matchedWord: string) => void;
  closeMeaning: () => void;
  highlightEnabled: boolean;
  setHighlightEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlossaryContext = createContext<GlossaryContextValue | null>(null);

export function GlossaryProvider({ children }: { children: React.ReactNode }) {
  const [activeEntry, setActiveEntry] = useState<GlossaryEntry | null>(null);
  const [activeMatchedWord, setActiveMatchedWord] = useState<string>('');
  const [highlightEnabled, setHighlightEnabled] = useState<boolean>(true);

  const openMeaning = (entry: GlossaryEntry, matchedWord: string) => {
    setActiveEntry(entry);
    setActiveMatchedWord(matchedWord);
  };

  const closeMeaning = () => {
    setActiveEntry(null);
    setActiveMatchedWord('');
  };

  return (
    <GlossaryContext.Provider
      value={{
        activeEntry,
        activeMatchedWord,
        openMeaning,
        closeMeaning,
        highlightEnabled,
        setHighlightEnabled,
      }}
    >
      {children}

      {/* Universal Floating Definition Card (Works on Mobile Tap AND Desktop Hover/Click) */}
      {activeEntry && (
        <div
          role="dialog"
          aria-label={`Definition of ${activeEntry.term}`}
          className="glossary-tooltip-box fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:w-96 z-50 rounded-2xl p-4 sm:p-5 shadow-2xl border animate-in fade-in duration-150"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <BookOpen className="glossary-tooltip-accent w-4 h-4 shrink-0" />
              <div>
                <span className="glossary-tooltip-accent text-[11px] font-mono font-semibold block">
                  Term Definition
                </span>
                <h4 className="glossary-tooltip-title text-base font-bold leading-tight">
                  {activeEntry.term}
                  {activeMatchedWord.toLowerCase() !== activeEntry.term.toLowerCase() && (
                    <span className="glossary-tooltip-muted text-xs font-normal ml-1.5">
                      (“{activeMatchedWord}”)
                    </span>
                  )}
                </h4>
              </div>
            </div>
            <button
              type="button"
              onClick={closeMeaning}
              aria-label="Close definition"
              className="glossary-tooltip-close p-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="glossary-tooltip-body mt-3 text-xs sm:text-sm leading-relaxed">
            {activeEntry.meaning}
          </p>

          {activeEntry.context && (
            <div className="glossary-tooltip-context mt-3 pt-2.5 border-t text-xs leading-snug">
              <strong className="glossary-tooltip-title font-semibold">Context:</strong>{' '}
              {activeEntry.context}
            </div>
          )}
        </div>
      )}
    </GlossaryContext.Provider>
  );
}

export function useGlossary() {
  const ctx = useContext(GlossaryContext);
  if (!ctx) {
    throw new Error('useGlossary must be used within a GlossaryProvider');
  }
  return ctx;
}

// Build regex lookup map once
const TERM_MAP = new Map<string, GlossaryEntry>();
const ALL_PATTERNS: string[] = [];

for (const entry of CONSTITUTION_GLOSSARY) {
  const words = [entry.term, ...(entry.aliases || [])];
  for (const w of words) {
    TERM_MAP.set(w.toLowerCase(), entry);
    ALL_PATTERNS.push(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  }
}

// Sort longest phrases first so "Royal Prerogative" matches before "prerogative"
ALL_PATTERNS.sort((a, b) => b.length - a.length);
const GLOSSARY_REGEX = new RegExp(`\\b(${ALL_PATTERNS.join('|')})\\b`, 'gi');

export function SmartText({ text }: { text: string }) {
  const { openMeaning, highlightEnabled } = useGlossary();

  const segments = useMemo(() => {
    if (!highlightEnabled || !text) return [text];
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    const regex = new RegExp(GLOSSARY_REGEX.source, 'gi');
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      const matchedStr = match[0];
      const entry = TERM_MAP.get(matchedStr.toLowerCase());
      if (entry) {
        const key = `${match.index}-${matchedStr}`;
        parts.push(
          <span
            key={key}
            role="button"
            tabIndex={0}
            onMouseEnter={() => openMeaning(entry, matchedStr)}
            onClick={(e) => {
              e.stopPropagation();
              openMeaning(entry, matchedStr);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openMeaning(entry, matchedStr);
              }
            }}
            title={`Tap or hover for meaning: ${entry.term}`}
            className="glossary-term-inline underline decoration-dotted underline-offset-4 rounded-xs px-0.5 -mx-0.5 transition-colors cursor-help"
          >
            {matchedStr}
          </span>
        );
      } else {
        parts.push(matchedStr);
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  }, [text, highlightEnabled, openMeaning]);

  return <>{segments}</>;
}
