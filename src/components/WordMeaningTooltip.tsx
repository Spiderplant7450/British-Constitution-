import React, { createContext, useContext, useState, useMemo } from 'react';
import { BookOpen, X } from 'lucide-react';

export interface GlossaryEntry {
  term: string;
  aliases?: string[];
  meaning: string;
  context?: string;
}

export const CONSTITUTION_GLOSSARY: GlossaryEntry[] = [
  // =========================================================================
  // PART 1: NATURE, MEANING & HISTORICAL GROWTH OF THE CONSTITUTION
  // =========================================================================
  {
    term: 'delineate',
    aliases: ['delineates', 'delineated', 'delineating'],
    meaning:
      'To describe, outline, or mark out the exact structure, boundaries, and functions of something with precision.',
    context: 'Topic 1.1.1 — Legal rules which delineate (outline) the government of a country.',
  },
  {
    term: 'embodied',
    aliases: ['embody', 'embodies', 'embodiment'],
    meaning:
      'Expressed, included, or given a concrete, visible form inside a document, law, or institution.',
    context: 'Topic 1.1.1 & 2.1.6 — Constitutional rules embodied in one or several documents or in the Bill of Rights.',
  },
  {
    term: 'Constituent Assembly',
    meaning:
      'A body of representatives specially elected or convened for the purpose of drafting and adopting a formal written constitution.',
    context: 'Topic 1.1.1 — Unlike the US or India, the British Constitution was never drafted by a Constituent Assembly.',
  },
  {
    term: 'legislature',
    aliases: ['legislatures', 'legislative'],
    meaning:
      'The law-making branch or assembly of a state (such as Parliament in the United Kingdom or Congress in the United States).',
    context: 'Topic 1.1.1 & 4.7 — The organ of government empowered to enact, amend, and repeal laws.',
  },
  {
    term: 'provisions',
    aliases: ['provision'],
    meaning:
      'Specific clauses, legal rules, or stipulations contained within a statute, charter, or constitution.',
    context: 'Topic 1.1.1 & 2.3.1 — Judges interpret, define, and develop the provisions of Charters and Statutes.',
  },
  {
    term: 'sanctity',
    meaning:
      'Supreme legal respect, inviolability, or special status that protects a fundamental law from casual interference.',
    context: 'Topic 1.1.2 & 2.5.6 — Written constitutions and enacted laws carry special sanctity.',
  },
  {
    term: 'statutory law',
    aliases: ['statutory', 'statutes', 'statute'],
    meaning:
      'Written laws formally debated, passed, and enacted by a legislature (such as Acts of Parliament).',
    context: 'Topic 1.1.5 — In Britain, Constitutional Law and Statutory/Ordinary Law stand at par with one another.',
  },
  {
    term: 'inconsistent',
    aliases: ['inconsistency'],
    meaning:
      'Not in agreement or harmony; contradicting or conflicting with a higher constitutional rule or law.',
    context: 'Topic 1.1.2 — Under a written constitution, inconsistent statutory laws are declared invalid by courts.',
  },
  {
    term: 'unconstitutional',
    meaning:
      'In countries with a written constitution, illegal because it violates the Constitution; in Britain, contrary to established constitutional usage and proper political behaviour.',
    context: 'Topic 1.1.2 & 3.3.6 — Neumann noted that in Britain "unconstitutional" means "not proper" rather than illegal.',
  },
  {
    term: 'ultra vires',
    meaning:
      'Latin for "beyond the powers." If a law or official act exceeds the legal authority granted by a Constitution or statute, courts declare it invalid.',
    context: 'Topic 1.1.2 & 4.4 — Because Parliament is sovereign, no court can declare an Act of Parliament ultra vires.',
  },
  {
    term: 'devised',
    aliases: ['devise'],
    meaning:
      'Planned, invented, or consciously designed in advance according to a deliberate scheme.',
    context: 'Topic 1.1.3 — The British Constitution has never been consciously devised and reduced to writing.',
  },
  {
    term: 'unsystematised',
    aliases: ['systematised', 'systematise'],
    meaning:
      'Not arranged according to a single planned system or formal code; scattered across centuries of history.',
    context: 'Topic 1.2.1 — The British Constitution remains undefined, unsystematised, and undecided.',
  },
  {
    term: 'coherence',
    aliases: ['coherent', 'incoherent'],
    meaning:
      'Logical connection, clarity, and consistency where all parts fit together into a unified whole.',
    context: 'Topic 1.1.3 & 1.2.1 — Because it grew piecemeal, the British Constitution lacks formal precision and coherence.',
  },
  {
    term: 'codified',
    aliases: ['codification', 'uncodified'],
    meaning:
      'Arranged and collected systematically into a single, formal written document or legal code.',
    context: 'Topic 1.2.2 — The British Constitution has never been systematised or codified into a single document.',
  },
  {
    term: 'enactments',
    aliases: ['enactment', 'enacted', 'enact'],
    meaning:
      'Laws or statutes formally passed and made official by a legislative authority such as Parliament.',
    context: 'Topic 1.1.4 & 1.2.6 — No court in Britain can refuse to enforce or set aside an enactment of Parliament.',
  },
  {
    term: 'guardianship',
    aliases: ['guardian', 'guardians'],
    meaning:
      'The duty and role of protecting, defending, and preserving something (such as custom or the courts safeguarding civil liberties).',
    context: 'Topic 1.1.4 & 4.9.2 — The most important part of the Constitution is given over to the guardianship of custom.',
  },
  {
    term: 'at par',
    aliases: ['stand at par'],
    meaning:
      'On an equal footing; having the exact same legal status, rank, and authority.',
    context: 'Topic 1.1.5 — In Britain, Constitutional Law and Ordinary Statutory Law stand at par with one another.',
  },
  {
    term: 'emanate',
    aliases: ['emanates', 'emanated', 'emanating'],
    meaning:
      'To originate from, flow out of, or come from a specific source or authority.',
    context: 'Topic 1.1.5 — Both constitutional and ordinary laws emanate from the same source (Parliament).',
  },
  {
    term: 'judicial review',
    meaning:
      'The power of law courts to examine laws passed by the legislature and strike them down if they violate the Constitution.',
    context: 'Topic 1.2.6 & 4.4 — Because Parliament is sovereign, there is no judicial review of Acts of Parliament in Britain.',
  },
  {
    term: 'flexible Constitution',
    aliases: ['flexible', 'flexibility'],
    meaning:
      'A constitution whose laws can be amended or altered by the exact same ordinary legislative procedure as any regular statute.',
    context: 'Topic 1.1.6 & 4.5 — Legally, the British Constitution is the most flexible in the world.',
  },
  {
    term: 'rigid constitution',
    aliases: ['rigid', 'rigidity', 'inflexible', 'rigid constitutions'],
    meaning:
      'A constitution that requires a special, more difficult procedure for amendment than ordinary laws (such as the US Constitution).',
    context: 'Topic 4.5.1 & 4.6.2 — A written and rigid constitution is a prerequisite of a federal polity.',
  },
  {
    term: 'evolutionary',
    aliases: ['evolution', 'evolve', 'evolved', 'evolves'],
    meaning:
      'Developing gradually over centuries through historical growth and practical adaptation rather than sudden creation.',
    context: 'Topic 1.1.6 & 1.3.4 — The British Constitution is the product of history and the result of slow evolution.',
  },
  {
    term: 'razed',
    aliases: ['raze'],
    meaning:
      'Completely torn down, demolished, or destroyed to the ground.',
    context: 'Topic 1.1.6 — The constitutional building has been patched and reconstructed, but never razed and rebuilt on a new foundation.',
  },
  {
    term: 'usages',
    aliases: ['usage'],
    meaning:
      'Long-established political habits, customary practices, or traditional ways of acting that gain acceptance over time.',
    context: 'Topic 1.1.7 & 2.5 — Usages and traditions cover a wide range of British political life.',
  },
  {
    term: 'zealous',
    aliases: ['zeal'],
    meaning:
      'Eager, energetic, and passionately devoted to practical work or a cause.',
    context: 'Topic 1.1.7 & 1.4.4 — The Englishman is described as practical, matter-of-fact, and zealous for business.',
  },
  {
    term: 'expediency',
    aliases: ['expedient'],
    meaning:
      'Practical suitability—doing what is workable, sensible, and convenient in the circumstances rather than following rigid abstract theory.',
    context: 'Topic 1.1.7 & 1.4.4 — Expediency is the guiding principle of the Englishman’s political life.',
  },
  {
    term: 'forelock',
    aliases: ['seizes opportunity by the forelock', 'by the forelock'],
    meaning:
      'From the proverb "take time by the forelock"—meaning to act promptly and seize a practical opportunity the moment it appears.',
    context: 'Topic 1.2.13 & 1.4.4 — Expediency is the guiding principle of his life, and he seizes opportunity by the forelock.',
  },
  {
    term: 'symmetry',
    aliases: ['symmetrical', 'unsymmetrical'],
    meaning:
      'Neat, balanced, and logical arrangement where all parts of a system follow a uniform plan.',
    context: 'Topic 1.2.13 & 1.4.6 — Ogg observed that the British constitutional structure lacks symmetry and abounds in the illogical.',
  },
  {
    term: 'abounds',
    aliases: ['abound', 'abounding'],
    meaning:
      'Is filled with or contains a great number of something.',
    context: 'Topic 1.2.13 & 1.4.6 — A governmental system which "abounds in the illogical."',
  },
  {
    term: 'hotchpotch',
    meaning:
      'A confused mixture or jumble of unrelated things thrown together without order or purpose.',
    context: 'Topic 1.4.7 — Though lacking logical symmetry, the British Constitution is not a mere hotchpotch because its rules come from conscious experience.',
  },
  {
    term: 'heterogeneous',
    meaning:
      'Consisting of many diverse, varied, or unlike elements mixed together.',
    context: 'Topic 1.1.7 & 1.4.7 — The British Constitution is not a mere hotchpotch of heterogeneous elements.',
  },
  {
    term: 'homogeneous',
    meaning:
      'Of the same kind; uniform and united in political principles and outlook.',
    context: 'Topic 4.8.1 — Party government secures stable governance under politically homogeneous and disciplined leaders.',
  },
  {
    term: 'deduced',
    aliases: ['deduce', 'deducing'],
    meaning:
      'Derived or drawn as a conclusion and guiding rule from practical experience and history.',
    context: 'Topic 1.1.7 & 1.4.7 — Its rules and principles have been deduced from British experience.',
  },
  {
    term: 'adhered',
    aliases: ['adhere', 'adheres', 'adherence'],
    meaning:
      'Followed faithfully, stuck firmly to, or observed a rule, principle, or practice.',
    context: 'Topic 1.1.7 & 1.4.7 — Rules deduced from British experience and consciously adhered to and applied.',
  },
  {
    term: 'rebuttal',
    aliases: ['rebut', 'rebutted'],
    meaning:
      'A counter-argument or refutation that disproves an opposing claim with evidence and reasoning.',
    context: 'Topic 1.1.8 & 1.5.4 — The rebuttal proving Paine and Tocqueville were wrong to claim the British Constitution does not exist.',
  },
  {
    term: 'fringed',
    aliases: ['fringed with decisions'],
    meaning:
      'Bordered, surrounded, and elaborated upon over time by court judgments that add detail to a constitutional text.',
    context: 'Topic 1.1.9 — Bryce noted that written constitutions become "developed by interpretation, fringed with decisions, and enlarged by customs."',
  },
  {
    term: 'dynamic',
    meaning:
      'Continually active, living, growing, and adapting to new conditions rather than remaining fixed or static.',
    context: 'Topic 1.2.11 & 1.4.3 — A dynamic Constitution with its roots in the past and branches in the future.',
  },
  {
    term: 'inevitable',
    aliases: ['inevitably'],
    meaning:
      'Certain to happen; unavoidable in practice.',
    context: 'Topic 1.1.9 — Because makers of a constitution cannot foresee the future, the conventional element in government is inevitable.',
  },
  {
    term: 'framers',
    aliases: ['framer'],
    meaning:
      'The authors, delegates, or founders who originally drafted a written constitution.',
    context: 'Topic 1.1.9 & 1.5.4 — A written constitution may contain as much or as little as the framers think desirable.',
  },
  {
    term: 'supplement',
    aliases: ['supplements', 'supplemented', 'supplementing'],
    meaning:
      'To add to something in order to complete, fill out, or strengthen it.',
    context: 'Topic 1.1.9 & 2.5.3 — Customs, conventions, and judicial decisions supplement written constitutional provisions.',
  },
  {
    term: 'degree, not of kind',
    aliases: ['one of degree, not of kind', 'difference of degree, not kind'],
    meaning:
      'A difference in amount or proportion (how much is written down in one place) rather than a difference in fundamental nature.',
    context: 'Topic 1.1.9 & 1.6.1 — The difference between a written and an unwritten constitution is one of degree, not of kind.',
  },
  {
    term: 'exigencies',
    aliases: ['exigency'],
    meaning:
      'Urgent needs, demands, or pressing requirements of a particular time or political situation.',
    context: 'Topic 1.2.10 & 2.2.2 — Constitutional rules and statutes were made according to the exigencies of time.',
  },
  {
    term: 'cogently',
    aliases: ['cogent'],
    meaning:
      'In a clear, logical, and deeply convincing manner.',
    context: 'Topic 1.2.11 — Lord Morrison cogently remarked on Britain’s peaceful constitutional development.',
  },
  {
    term: 'piecemeal',
    meaning:
      'Done gradually, step by step, or one small piece at a time as needs arose rather than by a single master plan.',
    context: 'Topic 1.3.2 & 1.4.5 — Being a "child of wisdom and chance," the Constitution’s growth has been piecemeal and gradual.',
  },
  {
    term: 'dictum',
    aliases: ['dicta'],
    meaning:
      'A famous, authoritative statement, maxim, or principle expressed by a thinker or judge.',
    context: 'Topic 1.3.4 — Fulfils Sir James McIntosh’s dictum that "constitutions grow instead of being made."',
  },
  {
    term: 'accretions',
    aliases: ['accretion'],
    meaning:
      'Gradual growth or additions accumulated layer by layer over a long period of time.',
    context: 'Topic 1.3.4 — The British Constitution is the result of slow development and successive accretions over a thousand years.',
  },
  {
    term: 'upheavals',
    aliases: ['upheaval'],
    meaning:
      'Violent, sudden disruptions or radical overturnings of a country’s political and social order.',
    context: 'Topic 1.3.5 & 4.2 — Britain has moved along a continuous pathway without violent revolutionary upheavals.',
  },
  {
    term: 'deference',
    aliases: ['defer'],
    meaning:
      'Polite respect, regard, and willingness to yield to established traditions, institutions, or authority.',
    context: 'Topic 1.3.6 & 4.2 — Ogg noted that in Britain "deference to traditions" has been habitual.',
  },
  {
    term: 'disposition',
    meaning:
      'A natural tendency, inclination, or habitual attitude of mind.',
    context: 'Topic 1.3.6 — The deep-seated disposition of the British to cling to accustomed names and forms even when the spirit has changed.',
  },
  {
    term: 'deep-seated',
    aliases: ['deep-rooted'],
    meaning:
      'Firmly established at a deep level in national habits and character; very strong and enduring.',
    context: 'Topic 1.3.6 & 3.1.2 — Conventions are deep-rooted in the habits of Englishmen.',
  },
  {
    term: 'paralleled',
    aliases: ['unparalleled', 'hardly paralleled'],
    meaning:
      'Matched or equalled by something similar in another country or historical era.',
    context: 'Topic 1.3.6 — The constitutional history of Britain displays a continuity hardly paralleled in any other land.',
  },
  {
    term: 'notwithstanding',
    meaning:
      'In spite of; despite; even though obstacles or events occurred.',
    context: 'Topic 1.3.8 & 5.1 — Freeman wrote that national life remained unbroken for 1,400 years, notwithstanding foreign conquests.',
  },
  {
    term: 'rent asunder',
    aliases: ['asunder'],
    meaning:
      'Torn apart violently into pieces; completely severed or broken.',
    context: 'Topic 1.3.8 & 5.1 — "At no moment has the tie between the present and the past been wholly rent asunder."',
  },
  {
    term: 'Teutonic conquerors',
    aliases: ['Teutonic'],
    meaning:
      'Early Germanic tribes (Angles, Saxons, and Jutes) who invaded and settled in Britain in the 5th–6th centuries, laying the earliest foundations of England.',
    context: 'Topic 1.3.8 & 5.1 — Freeman traced continuous political development back to when Teutonic conquerors changed Britain into England.',
  },
  {
    term: 'Angles and Saxons',
    aliases: ['Anglo-Saxon', 'Anglo-Saxons'],
    meaning:
      'The Germanic peoples who settled in Britain after the Roman withdrawal and established early English kingship, local courts, and councils.',
    context: 'Topic 1.3.10 & 5.3 — The first period of constitutional growth begins with the Angles and Saxons.',
  },
  {
    term: 'Norman and Angevin',
    aliases: ['Norman', 'Angevin', 'Angevin dynasties'],
    meaning:
      'The royal dynasties ruling England from William the Conqueror (1066) through Henry II and the Plantagenets to 1485, who centralized royal administration, Common Law, and early Parliament.',
    context: 'Topic 1.3.10 & 5.3 — Part of the first period (to 1485) that laid the institutional foundations of the Constitution.',
  },
  {
    term: 'Tudor dynasty',
    aliases: ['Tudor', 'Tudors'],
    meaning:
      'The royal house ruling England from 1485 to 1603 (including Henry VII, Henry VIII, and Elizabeth I) during the period of constitutional reconstruction.',
    context: 'Topic 1.3.10 & 5.3 — The second period of constitutional growth (1485–1689) began with the Tudor dynasty.',
  },
  {
    term: 'Stuart',
    aliases: ['Stuarts', 'Stuart periods'],
    meaning:
      'The royal dynasty ruling from 1603 to 1714 whose kings (James I, Charles I, Charles II, James II) clashed with Parliament, leading to the Petition of Rights and the Glorious Revolution.',
    context: 'Topic 1.3.10 & 5.3 — The second period (1485–1689) included the early and later Stuart struggles with Parliament.',
  },
  {
    term: 'Puritan Revolution',
    meaning:
      'The mid-17th-century English Civil War and constitutional struggle (1640–1660) in which parliamentary forces defeated King Charles I and temporarily abolished the monarchy.',
    context: 'Topic 1.3.10 & 5.3 — A major milestone in the second period (1485–1689) of constitutional reconstruction.',
  },
  {
    term: 'Commonwealth',
    meaning:
      '(1) Historically, the republican government of England (1649–1660) after Charles I; (2) In modern usage, the voluntary association of independent nations (former British Empire Dominions) sharing historical ties.',
    context: 'Topic 1.3.10, 3.4.4 & 5.3 — Used both for the 17th-century Puritan Commonwealth and the modern Commonwealth of Nations.',
  },
  {
    term: 'fructification',
    meaning:
      'The stage of bearing fruit, full maturity, and practical realization of institutions whose seeds were planted in earlier centuries.',
    context: 'Topic 1.3.10 & 5.3 — The third period of British constitutional growth (1689 to the present) is the period of rounding out or fructification.',
  },
  {
    term: 'eclipsed',
    aliases: ['eclipse'],
    meaning:
      'Overshadowed, surpassed, or significantly reduced in power and importance.',
    context: 'Topic 1.3.10 & 5.4 — By the end of the 15th century, Parliament showed its strength and the King’s power was eclipsed.',
  },
  {
    term: 'survivals',
    aliases: ['survival'],
    meaning:
      'Ancient ceremonies, titles, or legal formulas that continue to exist in the present long after their original practical meaning has faded.',
    context: 'Topic 1.4.6 & 2.8.1 — Anson noted that in the British Constitution, old forms and phrases survive which have lost their original meaning.',
  },
  {
    term: 'anomalies',
    aliases: ['anomaly', 'anomalous'],
    meaning:
      'Irregularities, contradictions, or features that deviate from logical consistency (such as a hereditary monarch and peers inside a modern democracy).',
    context: 'Topic 1.4.6 & 2.8.2 — Because the Constitution grew piecemeal, it contains many survivals and anomalies.',
  },
  {
    term: 'rambling',
    aliases: ['rambling structure'],
    meaning:
      'Spreading out irregularly in many directions like an old country house altered by many generations, rather than built to a single neat plan.',
    context: 'Topic 1.4.8 & 2.8.1 — Anson described the British Constitution as "a somewhat rambling structure... convenient rather than symmetrical."',
  },
  {
    term: 'divergence',
    aliases: ['diverge', 'divergent'],
    meaning:
      'A wide gap or separation where two things (such as formal legal theory and actual political practice) move apart from each other.',
    context: 'Topic 1.4.8 & 2.8.1 — Unconscious change brought about a divergence of law and custom, of theory and practice.',
  },
  {
    term: 'prerequisites',
    aliases: ['prerequisite', 'pre-requisites', 'pre-requisite'],
    meaning:
      'Essential conditions or qualities that must exist beforehand for a political system to function successfully.',
    context: 'Topic 1.4.9 & 2.8.3 — Bagehot identified three prerequisites: mutual confidence, a calm national mind, and rationality.',
  },
  {
    term: 'electors',
    aliases: ['electorate'],
    meaning:
      'The body of citizens who have the legal right to vote in public elections.',
    context: 'Topic 1.4.9 & 3.4.3 — The electorate’s verdict at a general election determines the government.',
  },
  {
    term: 'categorically',
    aliases: ['categorical'],
    meaning:
      'Unconditionally, directly, and without any doubt, exception, or qualification.',
    context: 'Topic 1.5.2 — Thomas Paine categorically declared that where a Constitution cannot be produced in visible form, there is none.',
  },

  // =========================================================================
  // PART 2: COMPONENT PARTS / SEVEN SOURCES OF THE CONSTITUTION
  // =========================================================================
  {
    term: 'Charters',
    aliases: ['Charter', 'Great Charters'],
    meaning:
      'Formal historic documents granted or agreed to by the Sovereign recognising fundamental rights, liberties, and limits on royal power.',
    context: 'Topic 2.1.1 — The first main source of the British Constitution includes Great Charters, Petitions, and Statutes.',
  },
  {
    term: 'Magna Carta',
    meaning:
      'The Great Charter of Liberties (1215) sealed by King John under pressure from the barons; the foundational landmark establishing that the King is subject to the law.',
    context: 'Topic 2.1.2 — Regarded as the starting landmark of British constitutional liberty.',
  },
  {
    term: 'Petition of Rights',
    aliases: ['Petition of Right'],
    meaning:
      'A major 1628 English constitutional document passed by Parliament under Charles I prohibiting taxation without parliamentary consent and arbitrary imprisonment.',
    context: 'Topic 2.1.2 & 2.1.4 — Part of the "Bible of the British Constitution" alongside Magna Carta and the Bill of Rights.',
  },
  {
    term: 'Bill of Rights',
    meaning:
      'In Britain, the historic 1689 Act of Parliament declaring the rights and liberties of subjects, establishing parliamentary supremacy, and limiting the powers of the Crown.',
    context: 'Topic 2.1.4 & 5.5 — Marked the culminating point of the 17th-century constitutional struggle.',
  },
  {
    term: 'Act of Settlement',
    meaning:
      'A 1701 Act of Parliament that settled royal succession on Protestant heirs only and secured the independence of judges.',
    context: 'Topic 2.1.2 — Passed in 1701 and later modified by the Abdication Act of 1936.',
  },
  {
    term: 'Abdication Act',
    aliases: ['abdication', 'abdicate'],
    meaning:
      'The formal renunciation of the royal throne by a monarch—specifically His Majesty’s Declaration of Abdication Act 1936, when King Edward VIII gave up the throne.',
    context: 'Topic 2.1.2 & 2.5.7 — Modified the succession under the Act of Settlement 1701 with the assent of the Dominions.',
  },
  {
    term: 'Act of Union with Scotland',
    aliases: ['Act of Union'],
    meaning:
      'The historic 1707 statute that united the Kingdom of England and the Kingdom of Scotland into a single Kingdom of Great Britain under one Parliament.',
    context: 'Topic 2.1.2 — A major statutory landmark in the territorial and constitutional formation of Britain.',
  },
  {
    term: 'Great Reform Act',
    aliases: ['Reform Act of 1832', 'Reform Bills', 'Reform Act'],
    meaning:
      'The landmark 1832 Act of Parliament that redistributed parliamentary seats and extended the voting franchise, beginning the democratisation of the House of Commons.',
    context: 'Topic 2.1.2, 2.2.3 & 5.7 — Aroused intense popular excitement and initiated a series of Reform Bills.',
  },
  {
    term: 'Parliament Act',
    aliases: ['Parliament Act of 1911', 'Parliament Acts'],
    meaning:
      'The landmark 1911 statute (amended in 1949) that abolished the House of Lords’ veto over Money Bills and reduced its veto over other public bills to a temporary delay.',
    context: 'Topic 2.1.2 & 3.4.2 — Put definite statutory limits on the legislative powers of the House of Lords.',
  },
  {
    term: 'Public Order Act',
    meaning:
      'A 1936 Act of Parliament passed to ban political uniforms and regulate public marches in order to prevent political violence and disorder.',
    context: 'Topic 2.1.2 & 4.9.3 — Cited as an example of Parliament imposing statutory restrictions on assembly and speech.',
  },
  {
    term: 'Incitement to Disaffection Act',
    meaning:
      'A 1934 Act of Parliament making it an offence to attempt to seduce members of the British armed forces from their duty or allegiance.',
    context: 'Topic 4.9.3 — Cited alongside the Public Order Act 1936 as an example of statutory restriction on liberties.',
  },
  {
    term: 'Ministers of the Crown Act',
    meaning:
      'The landmark 1937 statute that for the first time in British legal history gave statutory recognition and official salaries to the Prime Minister, Cabinet Ministers, and the Leader of the Opposition.',
    context: 'Topic 2.1.6 & 2.5.8 — Recognised the existence of the Prime Minister, Cabinet, Party, and Opposition without codifying their conventions.',
  },
  {
    term: 'Statute of Westminster',
    meaning:
      'A 1931 Act of the UK Parliament that gave legal recognition to the legislative independence of the self-governing Dominions of the British Commonwealth.',
    context: 'Topic 2.1.6, 2.5.7 & 3.4.4 — Embodied in legal form the conventions regulating relations between the UK and Dominions.',
  },
  {
    term: 'Dominions',
    aliases: ['Dominion'],
    meaning:
      'Self-governing nations of the British Empire/Commonwealth (such as Canada, Australia, New Zealand, and the Irish Free State) that became autonomous equals with the UK.',
    context: 'Topic 2.1.6 & 3.4.4 — Under convention and the Statute of Westminster 1931, the UK Parliament does not legislate for a Dominion without its consent.',
  },
  {
    term: 'peerage',
    aliases: ['Life Peers', 'hereditary peers'],
    meaning:
      'The system of British nobility (Dukes, Marquesses, Earls, Viscounts, Barons). Hereditary peers inherit their titles, whereas Life Peers (created under the Life Peers Act 1958) hold non-hereditary titles for life.',
    context: 'Topic 2.1.2 & 4.10 — The Life Peers Act (1958) and Peerage Act (1963) reformed membership of the House of Lords.',
  },
  {
    term: 'impress',
    meaning:
      'A distinctive mark, stamp, or character left upon something by the historical events that produced it.',
    context: 'Topic 2.1.5 — Because landmark charters originated in constitutional struggles, they "bear the impress of constitutional law."',
  },
  {
    term: 'suffrage',
    meaning:
      'The legal right to vote in political elections (also called the franchise).',
    context: 'Topic 2.2.1 — Ordinary statutes passed between 1867 and 1948 widened suffrage in Britain.',
  },
  {
    term: 'franchise',
    meaning:
      'The right to vote in public elections granted to citizens as members of the electorate.',
    context: 'Topic 2.2.4 — Reform Acts widened the franchise and developed political democracy.',
  },
  {
    term: 'agitation',
    meaning:
      'Vigorous public protest, campaigning, and political excitement demanding reform.',
    context: 'Topic 2.2.3 — The Great Reform Act of 1832 was the product of intense popular agitation.',
  },
  {
    term: 'repeal',
    aliases: ['repealed', 'repealing'],
    meaning:
      'To officially revoke, cancel, or annul an existing law by a subsequent Act of Parliament.',
    context: 'Topic 2.2.5 & 2.2.6 — Legally Parliament can repeal any statute, but repealing suffrage laws would violate the "constitutional sense" of the nation.',
  },
  {
    term: 'unworkable',
    meaning:
      'Impossible to operate in practice; unable to function effectively.',
    context: 'Topic 2.2.6 & 3.1.2 — Without conventions or fundamental electoral statutes, the British system of government would become unworkable.',
  },
  {
    term: 'sovereignty',
    aliases: ['sovereign', 'Parliamentary Sovereignty', 'Sovereignty of Parliament'],
    meaning:
      'Supreme, unlimited legal authority. In Britain, Parliamentary Sovereignty means Parliament can make or unmake any law whatever, and no court can strike down its Acts.',
    context: 'Topic 2.2.6 & 4.4 — Parliament is legally sovereign, though political reality and public opinion restrain how it uses that power.',
  },
  {
    term: 'paradox',
    aliases: ['paradoxical'],
    meaning:
      'A seemingly contradictory statement or situation that nonetheless expresses a real truth (e.g., an absolute monarchy in legal theory functioning as a democracy in practice).',
    context: 'Topic 2.2.7 & 4.10 — The contrast between Parliament’s unlimited legal sovereignty and its practical political restraint.',
  },
  {
    term: 'precedents',
    aliases: ['precedent'],
    meaning:
      'Earlier judicial decisions or established political acts that serve as an authoritative rule or example to be followed in future similar cases.',
    context: 'Topic 2.3.1 — Judgments of courts create precedents which succeeding judges respect.',
  },
  {
    term: 'breach of privilege',
    meaning:
      'A violation or disrespect of the special legal rights, immunities, and authority enjoyed by Parliament or its members.',
    context: 'Topic 2.3.3 — In the Sheriff of Middlesex case (1840), courts affirmed Parliament’s exclusive right to punish breach of privilege.',
  },
  {
    term: 'Sheriff of Middlesex',
    meaning:
      'A landmark 1840 constitutional case establishing that Parliament has the exclusive right to punish its own members and commit persons for breach of privilege without interference from courts.',
    context: 'Topic 2.3.3 — Key judicial decision illustrating parliamentary privilege.',
  },
  {
    term: 'Bradlaugh v. Gossett',
    meaning:
      'A landmark 1884 constitutional case establishing the supremacy of Parliament over the courts in all matters concerning the internal affairs and proceedings of the House of Commons.',
    context: 'Topic 2.3.3 — Key judicial decision affirming Parliament’s exclusive control over its internal proceedings.',
  },
  {
    term: 'Common Law',
    aliases: ['common law'],
    meaning:
      'The ancient body of unwritten English law developed through immemorial customs of the realm and judicial decisions rather than parliamentary statutes.',
    context: 'Topic 2.4 — Source of the King’s prerogative, Parliament’s supremacy, and the civil liberties of British citizens.',
  },
  {
    term: 'civil liberties',
    aliases: ['civil liberty'],
    meaning:
      'Fundamental personal freedoms of citizens (speech, press, assembly, sanctity of the home, trial by jury) protected by law against arbitrary government action.',
    context: 'Topic 2.4.2 & 4.9 — In Britain, civil liberties are secured by the Common Law and Rule of Law rather than a codified Bill of Rights.',
  },
  {
    term: 'jury trial',
    aliases: ['trial by jury'],
    meaning:
      'A court trial in which a panel of ordinary citizens decides the facts and verdict, acting as a historic Common Law safeguard of individual liberty.',
    context: 'Topic 2.4.2 — Guaranteed in Britain by Common Law rules and judicial precedents.',
  },
  {
    term: 'ordained',
    aliases: ['ordain', 'ordinance', 'ordinances'],
    meaning:
      'Officially decreed, commanded, or enacted by a king or supreme authority.',
    context: 'Topic 2.4.4 & 2.4.5 — Common Law principles were not enacted by Parliament or ordained by the King, but grew out of usage.',
  },
  {
    term: 'immemorial usages',
    aliases: ['immemorial usage', 'immemorial'],
    meaning:
      'Customs and practices so ancient that their origin lies beyond historical memory ("time out of mind").',
    context: 'Topic 2.4.5 — Blackstone defined Common Law as customs depending on immemorial usages for their support.',
  },
  {
    term: 'bulwark',
    meaning:
      'A strong defensive wall, shield, or safeguard that protects against danger or tyranny.',
    context: 'Topic 2.4.6 — Common Law principles stand as a bulwark of British freedom.',
  },
  {
    term: 'conventions',
    aliases: ['convention'],
    meaning:
      'Unwritten rules of constitutional behaviour and political morality that are binding in political practice even though they cannot be enforced in courts of law.',
    context: 'Topic 2.5 & Part 3 — Called the "centre and soul" of British constitutional law; e.g., Cabinet Government.',
  },
  {
    term: 'acquiescence',
    meaning:
      'General acceptance, tacit agreement, or willingness of the people to consent and be bound without protest.',
    context: 'Topic 2.5.5 & 3.2.3 — Jennings noted that conventions, like fundamental laws, rest essentially upon general acquiescence.',
  },
  {
    term: 'extra-legal',
    meaning:
      'Existing outside the formal body of statute and court-enforced law; operating through political custom and usage rather than judicial enforcement.',
    context: 'Topic 2.5.6 & 3.2.6 — A convention is extra-legal in origin, growing out of practice rather than a legislative body.',
  },
  {
    term: 'sanction',
    aliases: ['sanctions', 'legal sanction', 'political sanction'],
    meaning:
      'The penalty, consequence, or backing force that compels obedience to a rule (laws have legal sanction through courts; conventions have political sanction through public opinion and Parliament).',
    context: 'Topic 2.5.6, 3.3 & 3.4.3 — Conventions have no legal sanction in courts, but carry powerful political sanction.',
  },
  {
    term: 'well-nigh',
    meaning:
      'Almost; nearly completely.',
    context: 'Topic 2.5.6 & 3.2.7 — Fundamental conventions have well-nigh been recognised by many Acts of Parliament.',
  },
  {
    term: 'Preamble',
    aliases: ['preamble'],
    meaning:
      'The introductory statement at the beginning of an Act of Parliament or Constitution that sets out its guiding principles, purpose, and background.',
    context: 'Topic 2.5.7 & 3.2.8 — The Preambles to the British North America Act 1867 and Statute of Westminster 1931 explicitly recognised constitutional conventions.',
  },
  {
    term: 'Imperial Parliament',
    meaning:
      'The Parliament of the United Kingdom at Westminster acting in its historical role as the supreme legislature for the British Empire.',
    context: 'Topic 2.5.7 & 3.3.11 — Referenced in the Anglo-Irish Treaty 1921 and British Coal Corporation v. Rex (1935).',
  },
  {
    term: 'Governor-General',
    meaning:
      'The official representative of the British Crown in a Commonwealth Dominion (such as Canada or Australia), who by convention exercises legal powers on the advice of the Dominion’s own Ministers.',
    context: 'Topic 2.5.7 & 3.4.4 — Position defined by conventions agreed at the Imperial Conferences of 1926 and 1930.',
  },
  {
    term: 'Royal Style and Titles',
    meaning:
      'The formal legal title used to describe the Monarch’s sovereignty over the United Kingdom and the Commonwealth realms.',
    context: 'Topic 2.5.7 & 3.2.8 — By convention in the Statute of Westminster, changes to the Royal Style and Titles require the assent of Dominion Parliaments.',
  },
  {
    term: 'assent',
    aliases: ['Royal assent', 'Royal Assent'],
    meaning:
      'Formal approval given by the Monarch (or Dominion Parliaments) to a legislative Bill so that it becomes law. By convention, the Monarch never refuses Royal Assent.',
    context: 'Topic 2.5.7, 4.3.2 & 4.4.1 — The Royal veto is obsolete and the Monarch must signify assent to measures passed by Parliament.',
  },
  {
    term: 'pre-eminence',
    aliases: ['pre-eminent'],
    meaning:
      'Superiority in authority, rank, and leadership above all others.',
    context: 'Topic 2.5.8 & 3.2.9 — The Cabinet system presupposes the pre-eminence and leadership of the Prime Minister.',
  },
  {
    term: 'First Lord of the Treasury',
    meaning:
      'The historic official title held by the British Prime Minister as head of the commission overseeing the Treasury.',
    context: 'Topic 2.5.8 & 3.2.9 — The Ministers of the Crown Act 1937 provided a salary to "the person who is the Prime Minister and the First Lord of the Treasury."',
  },
  {
    term: 'commentaries',
    aliases: ['commentary', 'commentators'],
    meaning:
      'Authoritative books and scholarly treatises written by eminent constitutional experts (such as Erskine May and A.V. Dicey) that explain and systematise constitutional rules.',
    context: 'Topic 2.6 — The sixth source of the British Constitution.',
  },
  {
    term: 'compendiums',
    aliases: ['compendium'],
    meaning:
      'Concise, comprehensive collections of detailed knowledge, rules, and procedures on a subject.',
    context: 'Topic 2.6.2 — Eminent writers like Erskine May provided authoritative compendiums of parliamentary rules.',
  },
  {
    term: 'Treatise',
    aliases: ['treatise'],
    meaning:
      'A formal, systematic, and exhaustive written work examining a subject in depth.',
    context: 'Topic 2.6.3 — Erskine May’s Treatise on the Law, Privileges, Proceedings and Usages of Parliament is the classic guide used by Speakers.',
  },
  {
    term: 'Royal Prerogative',
    aliases: ['prerogative', 'prerogatives'],
    meaning:
      'The historic discretionary powers, rights, and immunities remaining in the hands of the Crown under Common Law (now exercised by Ministers on the Monarch’s behalf).',
    context: 'Topic 2.7 — The seventh source of the Constitution; includes declaring war, making treaties, pardoning criminals, and dissolving Parliament.',
  },
  {
    term: 'Orders in Council',
    meaning:
      'Formal executive orders approved by the Monarch at a meeting of the Privy Council (on ministerial advice), used to execute Royal Prerogative or statutory powers.',
    context: 'Topic 2.7.3 — Royal Prerogative functions are executed through Orders in Council or proclamations.',
  },
  {
    term: 'proclamations',
    aliases: ['proclamation'],
    meaning:
      'Formal public announcements issued under the Great Seal in the Monarch’s name (e.g., to summon, prorogue, or dissolve Parliament).',
    context: 'Topic 2.7.3 — Royal Prerogative powers are executed through Orders in Council, proclamations, and writs.',
  },
  {
    term: 'writs',
    aliases: ['writ', 'Royal writ'],
    meaning:
      'Formal written orders issued under royal or judicial authority commanding a specific action (such as ordering a parliamentary election to be held in each constituency).',
    context: 'Topic 2.7.3 & 4.3.2 — No parliamentary election can be held without the Royal writ under the great seal.',
  },
  {
    term: 'great seal',
    meaning:
      'The official emblem of the Sovereign’s approval attached to the most important state documents, proclamations, and writs.',
    context: 'Topic 2.7.3 — Proclamations and writs under the great seal execute Royal Prerogative powers.',
  },
  {
    term: 'dissolve',
    aliases: ['dissolution', 'dissolves', 'dissolved', 'dissolving'],
    meaning:
      'To formally end the life of a current Parliament so that a general election is held for all seats in the House of Commons.',
    context: 'Topic 2.7.2, 3.4.1 & 4.7.2 — Executed by the Monarch on the advice of the Prime Minister/Cabinet.',
  },

  // =========================================================================
  // PART 3: CONVENTIONS OF THE CONSTITUTION
  // =========================================================================
  {
    term: 'integral',
    meaning:
      'Essential, fundamental, and necessary to make the whole system complete.',
    context: 'Topic 3.1.1 — Conventions form an integral part of the British Constitution.',
  },
  {
    term: 'maimed',
    meaning:
      'Crippled, severely damaged, or deprived of essential strength and ability to function.',
    context: 'Topic 3.1.2 — Without conventions, the British Constitution becomes maimed, if not absolutely unworkable.',
  },
  {
    term: 'scrupulously',
    meaning:
      'With great care, strict honesty, and faithful attention to every detail of duty or principle.',
    context: 'Topic 3.3.1 & 3.5.1 — Why are conventions so scrupulously observed in Britain?',
  },
  {
    term: 'imperative',
    meaning:
      'Absolutely necessary, urgent, and unavoidable.',
    context: 'Topic 3.3.2 — Because annual taxes and the Army Act expire each year, it becomes imperative to summon Parliament annually.',
  },
  {
    term: 'unauthorised',
    aliases: ['unauthorized'],
    meaning:
      'Lacking official legal permission or parliamentary approval.',
    context: 'Topic 3.3.2 — Without an annual session of Parliament, maintaining the army on money from unauthorised taxes becomes illegal.',
  },
  {
    term: 'come to grief',
    meaning:
      'To fail, suffer political ruin, or meet with disaster and collapse.',
    context: 'Topic 3.3.2 — A Ministry will come to grief if it refuses to resign after losing the confidence of the House of Commons.',
  },
  {
    term: 'His or Her Majesty’s Opposition',
    aliases: ['HM Opposition', 'Her Majesty’s Opposition', 'Leader of the Opposition'],
    meaning:
      'The largest non-governing party in the House of Commons, officially recognised as the loyal alternative government whose duty is to scrutinise and criticise the Government.',
    context: 'Topic 2.5.8, 3.3.3 & 3.4.2 — The whole idea of His or Her Majesty’s Opposition is a product of convention (later recognised in the Ministers of the Crown Act 1937).',
  },
  {
    term: 'collective responsibility',
    meaning:
      'The convention that all Cabinet Ministers are jointly accountable to Parliament for government policy, must publicly support Cabinet decisions, and must resign together if defeated on a vote of confidence.',
    context: 'Topic 3.3.4 & 3.4.1 — Temporarily suspended in 1931 when the National Government Cabinet "agreed to differ."',
  },
  {
    term: 'agreed to differ',
    meaning:
      'The famous 1931 exception in Ramsay MacDonald’s coalition National Government where Cabinet Ministers were temporarily allowed to publicly oppose the government’s tariff policy without resigning.',
    context: 'Topic 3.3.4 & 3.7.4 — Cited to show that conventions are flexible and can be modified when exceptional political circumstances demand.',
  },
  {
    term: 'reverted',
    aliases: ['revert'],
    meaning:
      'Returned to a former practice, custom, or established rule.',
    context: 'Topic 3.3.4 & 3.7.4 — In 1929, Stanley Baldwin reverted to the old convention of meeting Parliament after an inconclusive election.',
  },
  {
    term: 'succinctly',
    aliases: ['succinct'],
    meaning:
      'Briefly, clearly, and concisely expressed in a few well-chosen words.',
    context: 'Topic 3.3.6 & 4.3.4 — Neumann and Lord Morrison succinctly summed up the spirit of British political institutions.',
  },
  {
    term: 'time-honoured',
    meaning:
      'Respected, trusted, and valued because it has been practiced successfully for a very long period of history.',
    context: 'Topic 3.3.6 — Britain produced a system of time-honoured customs and conventions based on both precedent and reason.',
  },
  {
    term: 'checks and balances',
    meaning:
      'A constitutional mechanism (typical of the US Presidential system) in which each branch of government has powers to limit and check the others.',
    context: 'Topic 3.3.6 — Neumann noted that the core of the British system is not a formal document or elaborate checks and balances, but the belief that "certain things simply are not done by gentlemen."',
  },
  {
    term: 'constitutional morality',
    meaning:
      'A.V. Dicey’s phrase for the unwritten ethical rules and conventions that restrain legal power and indirectly secure the sovereignty of the people.',
    context: 'Topic 3.3.8 & 3.5.5 — Dicey observed that Britain’s modern code of constitutional morality secures the sovereignty of the people.',
  },
  {
    term: 'roundabout',
    meaning:
      'Indirect rather than direct or straightforward.',
    context: 'Topic 3.3.8 — Conventions secure in a "roundabout way" what is called abroad the sovereignty of the people.',
  },
  {
    term: 'Privy Council',
    aliases: ['Judicial Committee of the Privy Council'],
    meaning:
      'A formal body of advisers to the Sovereign; its Judicial Committee served as the highest court of appeal for the British Empire and Commonwealth.',
    context: 'Topic 3.3.11 & 3.5.7 — In British Coal Corporation v. Rex (1935), the Privy Council distinguished abstract legal theory from political realities.',
  },
  {
    term: 'Rex',
    aliases: ['British Coal Corporation v. Rex'],
    meaning:
      'Latin for "the King" (representing the Crown in legal cases). British Coal Corporation v. Rex (1935) is the landmark Privy Council case on the Statute of Westminster 1931.',
    context: 'Topic 3.3.11 & 3.5.7 — The Privy Council declared that while the Imperial Parliament could repeal the Statute of Westminster in abstract law, "that is theory and has no relation to realities."',
  },
  {
    term: 'abstract law',
    meaning:
      'Purely theoretical legal power on paper, considered apart from political reality, conventions, and practical possibility.',
    context: 'Topic 3.3.11 & 3.5.7 — Contrast between what Parliament can do as a matter of abstract law and what is politically possible in reality.',
  },
  {
    term: 'Glorious Revolution',
    meaning:
      'The bloodless revolution of 1688–1689 that replaced King James II with William and Mary, permanently ending absolute royal rule and establishing the supremacy of Parliament.',
    context: 'Topic 3.4.1 & 5.5 — Settled once and for all that Parliament is supreme and kings hold the throne by the grace of Parliament.',
  },
  {
    term: 'confidence',
    aliases: ['retain its confidence', 'lost the confidence'],
    meaning:
      'The support of a majority of MPs in the House of Commons. Under parliamentary government, the Cabinet can remain in office only so long as it retains the confidence of the Commons.',
    context: 'Topic 3.4.1 & 4.7.1 — If the Commons withdraw their confidence, the Cabinet must either resign or advise a dissolution.',
  },
  {
    term: 'concede',
    aliases: ['conceded'],
    meaning:
      'To grant, yield, or agree to a request (such as the Monarch granting a dissolution of Parliament).',
    context: 'Topic 3.4.1 — A defeated minority Ministry cannot ask for a second dissolution, nor should the Crown concede it if asked.',
  },
  {
    term: 'endorsement',
    aliases: ['endorse'],
    meaning:
      'Formal approval, backing, or ratification given by Parliament to an executive action or treaty.',
    context: 'Topic 3.4.1 — By convention, the Ministry must not declare war or enter into important treaties without securing endorsement by the Commons.',
  },
  {
    term: 'taken into counsel',
    meaning:
      'Consulted and informed beforehand so that Parliament can express its views before the government commits the country to a major action.',
    context: 'Topic 3.4.1 — The House of Commons should be taken into counsel before the Crown is committed to any definite foreign policy action.',
  },
  {
    term: 'subordination',
    aliases: ['subordinate'],
    meaning:
      'Placement in a lower rank or inferior position of authority (such as the House of Lords being subordinate to the elected House of Commons, or local government being subordinate to Parliament).',
    context: 'Topic 3.4.2 & 4.6.2 — The subordination of the Lords rested on convention until the Parliament Act of 1911 made it law.',
  },
  {
    term: 'hitherto',
    meaning:
      'Until now, or up to that particular time in history.',
    context: 'Topic 3.4.2 — The Parliament Act 1911 placed statutory limits on the House of Lords, which had hitherto been regulated by convention only.',
  },
  {
    term: 'Law Lords',
    aliases: ['Law Lord'],
    meaning:
      'Senior appellate judges appointed to the House of Lords who, by convention, alone sat when the House of Lords acted as the highest Court of Appeal.',
    context: 'Topic 3.4.2 & 3.6.2 — By convention, no lay peer other than a Law Lord sits when the House of Lords acts as a Court of Appeal.',
  },
  {
    term: 'three readings',
    meaning:
      'The customary parliamentary requirement that every Bill must be presented, debated on its principles, and voted on at three separate stages before passing a House of Parliament.',
    context: 'Topic 3.4.2 — The rule that every Bill must have three readings before being finally voted upon originated as a convention.',
  },
  {
    term: 'unopposed',
    aliases: ['returned unopposed'],
    meaning:
      'Elected to Parliament without any rival candidate contesting the seat in that constituency.',
    context: 'Topic 3.4.2 — A traditional convention relating to the impartial Speaker of the House of Commons at general elections.',
  },
  {
    term: 'mandate convention',
    aliases: ['mandate', 'mandates', 'mandated'],
    meaning:
      'The convention that a government should not introduce radical or controversial legislation unless that policy was placed before the voters in its election programme.',
    context: 'Topic 3.4.3 & 4.5.3 — Illustrated in 1945 when the Conservative House of Lords passed Labour’s nationalisation bills because Labour had an electoral mandate.',
  },
  {
    term: 'vindication',
    aliases: ['vindicate'],
    meaning:
      'Clear proof, justification, or practical confirmation that a principle is genuine and effective.',
    context: 'Topic 3.4.3 — The mandate convention is described as a vindication of the principle of popular sovereignty.',
  },
  {
    term: 'popular sovereignty',
    aliases: ['sovereignty of the people'],
    meaning:
      'The democratic principle that ultimate political authority resides in the people (the electorate), whose will the government and Parliament must ultimately respect.',
    context: 'Topic 3.3.8 & 3.4.3 — While legal sovereignty rests with Parliament, conventions and the mandate principle secure the political sovereignty of the people.',
  },
  {
    term: 'nationalisation',
    aliases: ['re-nationalisation'],
    meaning:
      'The transfer of major privately owned industries (such as coal, railways, electricity, and steel) into public state ownership.',
    context: 'Topic 3.4.3 & 4.5.3 — Key part of the Labour Party’s 1945 election manifesto that the House of Lords accepted under the mandate convention.',
  },
  {
    term: 'manifesto',
    aliases: ['manifestos'],
    meaning:
      'A public declaration of policies, principles, and legislative proposals published by a political party before a general election.',
    context: 'Topic 3.4.3 — If a party wins a majority, its election manifesto gives it a democratic mandate to enact those proposals.',
  },
  {
    term: 'Imperial Conference',
    aliases: ['Imperial Conferences'],
    meaning:
      'Periodic meetings of the Prime Ministers of Britain and the self-governing Dominions (notably in 1923, 1926, and 1930) that established the conventions of Commonwealth equality.',
    context: 'Topic 3.4.4 — Formulated the rules on treaty-making and the status of Dominion Governors-General.',
  },
  {
    term: 'democratisation',
    aliases: ['democratised', 'democratise'],
    meaning:
      'The historical process of transforming an institution (such as the Executive or the House of Commons) so that it is controlled by and accountable to the people.',
    context: 'Topic 3.6.1 & 5.7 — Conventions democratised the Executive, and Reform Bills from 1832 democratised the House of Commons.',
  },
  {
    term: 'centre of gravity',
    meaning:
      'The main seat of real political power and decisive authority within a state.',
    context: 'Topic 3.6.1 & 5.6 — The Bill of Rights and conventions shifted the centre of gravity from the King to Parliament.',
  },
  {
    term: 'orientation',
    meaning:
      'Direction, focus, or adaptation of policy and institutions toward new social and political goals.',
    context: 'Topic 3.6.5 — New needs demand a new emphasis and a new orientation even when the formal law remains fixed.',
  },
  {
    term: 'motive power',
    meaning:
      'The driving force or energy that makes a machine or political system operate.',
    context: 'Topic 3.6.5 — Conventions are described as the motive power of the British Constitution that lubricates the machinery of government.',
  },
  {
    term: 'lubricate',
    aliases: ['lubricates'],
    meaning:
      'To oil the moving parts of a machine so that it runs smoothly without friction or breakdown.',
    context: 'Topic 3.6.5 — Conventions lubricate the machinery of government and keep it running smoothly.',
  },
  {
    term: 'prescriptions',
    aliases: ['prescription'],
    meaning:
      'Authoritative rules, directions, or guiding principles laid down for governance.',
    context: 'Topic 3.6.6 — Herman Finer noted that the real constitution is a living body of general prescriptions carried into effect by living persons.',
  },
  {
    term: 'harmonise',
    aliases: ['harmony'],
    meaning:
      'To bring different institutions or powers (such as the Executive, Parliament, and the electorate) into peaceful agreement and smooth cooperation.',
    context: 'Topic 3.4.0 & 3.6.7 — Conventions harmonise relations where a purely legal solution is impossible.',
  },
  {
    term: 'eschewed',
    meaning:
      'Deliberately avoided, abstained from, or chose not to do something.',
    context: 'Topic 3.6.8 — In converting a monarchy into a democracy, the British eschewed writing new constitutional articles and relied on conventions.',
  },

  // =========================================================================
  // PART 4: TEN SALIENT FEATURES OF THE BRITISH CONSTITUTION
  // =========================================================================
  {
    term: 'salient',
    aliases: ['Salient Features', 'salient features'],
    meaning:
      'Most prominent, noticeable, important, and defining characteristics.',
    context: 'Part 4 — The ten salient features of the British Constitution (unwritten, evolutionary, flexible, unitary, parliamentary, etc.).',
  },
  {
    term: 'absolute Monarchy',
    aliases: ['absolute monarchy'],
    meaning:
      'A form of government in which the King or Queen possesses unlimited, unrestricted legal power not subject to constitutional or parliamentary control.',
    context: 'Topic 4.3.1 — In ultimate legal theory, the government of the UK is an absolute Monarchy, though in practice it is a democratic republic.',
  },
  {
    term: 'limited constitutional Monarchy',
    aliases: ['constitutional Monarchy', 'constitutional monarchy'],
    meaning:
      'A system in which the Monarch is the ceremonial head of state whose powers are limited by law and convention, while real political power is exercised by an elected Parliament and Cabinet.',
    context: 'Topic 4.3.1 — In form, Britain is a limited constitutional Monarchy.',
  },
  {
    term: 'vested',
    aliases: ['vested in'],
    meaning:
      'Legally placed in, conferred upon, or belonging to a specific person or institution.',
    context: 'Topic 4.3.2 & 4.5.1 — In legal theory, executive government is vested in the Monarch; legislative amendment power is vested in Parliament.',
  },
  {
    term: 'Royal pleasure',
    aliases: ['during the Royal pleasure'],
    meaning:
      'The formal legal doctrine that Ministers and Crown servants hold office for as long as the Monarch pleases (in practice, as long as they retain the support of the House of Commons).',
    context: 'Topic 4.3.2 — In legal theory, Ministers remain in office "during the Royal pleasure."',
  },
  {
    term: 'fountain of justice',
    meaning:
      'The ancient legal doctrine that the Monarch is the original source from whom all judicial authority, courts of law, and pardons derive.',
    context: 'Topic 4.3.2 — In legal theory, the Monarch is the source of law and fountain of justice.',
  },
  {
    term: 'prorogues',
    aliases: ['prorogue', 'prorogued', 'prorogation'],
    meaning:
      'Formally ends a parliamentary session without dissolving Parliament, pausing business until the next session is summoned.',
    context: 'Topic 4.3.2 — In legal theory, Her Majesty summons, dissolves, and prorogues Parliament.',
  },
  {
    term: 'veto',
    meaning:
      'The constitutional power to refuse approval to a Bill passed by the legislature, preventing it from becoming law.',
    context: 'Topic 4.3.2 & 4.4.1 — Though in legal theory the Monarch may veto a law, the Royal veto has been completely obsolete since 1707.',
  },
  {
    term: 'obsolete',
    meaning:
      'Fallen completely out of use; no longer practiced in political reality even if never formally repealed by statute.',
    context: 'Topic 4.4.1 — The Royal veto power has become obsolete and the Monarch must signify assent to all measures passed by Parliament.',
  },
  {
    term: 'The King can do no wrong',
    aliases: ['King can do no wrong'],
    meaning:
      'A fundamental constitutional maxim meaning (1) the Monarch is personally immune from court prosecution, and (2) the Monarch never acts alone—every official act is done on the advice of a Minister who bears full responsibility.',
    context: 'Topic 4.3.3 — Expresses the complete transfer of active political responsibility from the Monarch to Ministers.',
  },
  {
    term: 'complexion',
    meaning:
      'The political character, party balance, or makeup of an elected assembly.',
    context: 'Topic 4.3.4 — The voters decide the political complexion of the House of Commons at a general election.',
  },
  {
    term: 'oblivious',
    meaning:
      'Unaware of, ignoring, or paying no attention to something.',
    context: 'Topic 4.3.4 — No government can remain oblivious of public opinion if it wishes to continue in office.',
  },
  {
    term: 'crowned republic',
    meaning:
      'Sidney and Beatrice Webb’s famous phrase describing Britain as a nation that keeps a Monarch as ceremonial head of state while functioning in practice as a democratic republic.',
    context: 'Topic 4.3.4 — In ultimate theory Britain is an absolute monarchy, in form a limited constitutional monarchy, and in practice a "crowned republic."',
  },
  {
    term: 'transcendental',
    meaning:
      'Surpassing all others; supreme, overarching, and beyond ordinary legal limitations.',
    context: 'Topic 4.4.1 — The legislative authority of the British Parliament is described as transcendental and absolute.',
  },
  {
    term: 'referendum',
    meaning:
      'A direct vote in which the entire electorate is asked to accept or reject a particular proposal or constitutional amendment.',
    context: 'Topic 4.5.1 & 4.6.3 — Popular ratification of constitutional amendments by referendum (as in Switzerland and Australia) is unknown in British constitutional amendment procedure.',
  },
  {
    term: 'tampered',
    aliases: ['tamper', 'tampered with'],
    meaning:
      'Interfered with carelessly, lightly, or without serious justification.',
    context: 'Topic 4.5.1 — Prime Minister James Callaghan observed that constitutions "should not be lightly tampered with, but neither should they be rigid."',
  },
  {
    term: 'legal fiction',
    meaning:
      'An assumption maintained in formal legal theory (such as unlimited Parliamentary or Royal power) even though actual political practice operates under strict democratic restraints.',
    context: 'Topic 4.5.2 — Critics have asserted that the unlimited supremacy of Parliament is a legal fiction because it is exercised under deep responsibility.',
  },
  {
    term: 'enjoins',
    aliases: ['enjoin'],
    meaning:
      'Requires, directs, or commands a certain course of conduct with authority.',
    context: 'Topic 4.5.3 — The mandate convention enjoins that no far-reaching changes should be made until voters have expressed their opinion at a general election.',
  },
  {
    term: 'tariff',
    aliases: ['tariffs'],
    meaning:
      'Taxes or customs duties imposed by a government on imported foreign goods to protect domestic industry or raise revenue.',
    context: 'Topic 4.5.3 — In 1923, Prime Minister Stanley Baldwin dissolved Parliament to seek an electoral mandate on the issue of tariffs.',
  },
  {
    term: 'precarious',
    meaning:
      'Uncertain, fragile, or resting on a very narrow margin (such as a tiny majority of seats in Parliament).',
    context: 'Topic 4.5.3 — In 1964, Harold Wilson’s Labour Government secured a precarious majority but claimed a full mandate to govern.',
  },
  {
    term: 'fluid',
    meaning:
      'Easily shifting or unstable.',
    context: 'Topic 4.5.4 — Though legally the most flexible constitution in the world, in actual practice the British Constitution is far less fluid than writers suggest.',
  },
  {
    term: 'unitary',
    aliases: ['Unitary Constitution', 'unitary government', 'unitary state'],
    meaning:
      'A constitutional system in which all supreme political authority is concentrated in a single central government and legislature (Westminster), and local governments exercise only delegated powers.',
    context: 'Topic 4.6 — Britain has a unitary constitution, in contrast to federal states like the USA or India.',
  },
  {
    term: 'federal',
    aliases: ['federation', 'federating', 'federal polity'],
    meaning:
      'A constitutional system (such as the USA or India) in which powers are constitutionally divided between a central national government and state/provincial governments, protected by a supreme written constitution.',
    context: 'Topic 4.6.2 — The essence of a federation is union, not unity; its units hold original powers derived from the constitution.',
  },
  {
    term: 'devolution',
    meaning:
      'The statutory delegation of powers from the central Parliament of a unitary state to regional assemblies (such as in Scotland and Wales) without surrendering Parliament’s ultimate sovereignty.',
    context: 'Topic 4.6.1 & 4.6.3 — Even with devolution, all legal authority in Britain flows from the Central Government and Parliament.',
  },
  {
    term: 'demarcated',
    aliases: ['demarcate'],
    meaning:
      'Clearly marked out with definite constitutional boundaries of power and jurisdiction.',
    context: 'Topic 4.6.2 — In a federation, the powers exercised by the states and central government are original and clearly demarcated.',
  },
  {
    term: 'encroach',
    aliases: ['encroaches', 'encroached', 'encroaching'],
    meaning:
      'To intrude unlawfully or improperly upon the rights, liberties, or constitutional sphere of another.',
    context: 'Topic 4.6.2 & 4.9.3 — In a federation, neither level of government can encroach upon the other’s sphere; in Britain, Parliament does not unnecessarily encroach upon civil liberties.',
  },
  {
    term: 'bestow',
    aliases: ['bestows', 'bestowed'],
    meaning:
      'To grant, confer, or give as a gift or statutory power.',
    context: 'Topic 4.6.2 — In Britain, local government areas are subordinate units with only such powers as Parliament chooses to bestow.',
  },
  {
    term: 'polity',
    meaning:
      'An organised state or society having a specific form of political government.',
    context: 'Topic 4.6.2 — A written and rigid constitution is a prerequisite of a federal polity.',
  },
  {
    term: 'functionaries',
    aliases: ['functionary'],
    meaning:
      'Officials who actively perform public duties and exercise real executive power.',
    context: 'Topic 4.7.1 — While the King is the legal sovereign, the real executive functionaries are the Ministers.',
  },
  {
    term: 'hyphen that joins',
    aliases: ['buckle that binds'],
    meaning:
      'Walter Bagehot’s famous definition of the Cabinet as the vital link that connects and unites the Executive and Legislative branches in a parliamentary system.',
    context: 'Topic 4.7.1 — Bagehot defined the Cabinet as the "hyphen that joins, the buckle that binds the executive and legislative departments together."',
  },
  {
    term: 'deadlock',
    meaning:
      'A complete standstill or paralysis caused when two branches of government (such as an independent President and Congress) oppose and block each other.',
    context: 'Topic 4.7.2 — Because British Ministers sit in and lead the majority in Parliament, the dangers of deadlock between Executive and Legislature are absent.',
  },
  {
    term: 'inanition',
    meaning:
      'Exhaustion, paralysis, or lack of vitality caused by political stalemate between competing branches of government.',
    context: 'Topic 4.7.2 — Greaves noted that parliamentary government avoids the risks of conflict or inanition resulting from strict separation of powers.',
  },
  {
    term: 'Weimar Constitution',
    meaning:
      'The constitution of the German Republic (1919–1933), cited by Greaves as a historical example of political instability caused by conflict between a separately elected President and Parliament.',
    context: 'Topic 4.7.2 — Contrasted with Britain’s unified parliamentary government.',
  },
  {
    term: 'unison',
    aliases: ['in unison'],
    meaning:
      'Acting together simultaneously as a single united body.',
    context: 'Topic 4.8.1 — Under party government, members of the Cabinet rise and fall in unison.',
  },
  {
    term: 'perpetuate',
    aliases: ['perpetuated'],
    meaning:
      'To preserve and cause a system or practice to continue indefinitely.',
    context: 'Topic 4.8.2 — The British Constitution evolved under the two-party system and its working tends to maintain and perpetuate it.',
  },
  {
    term: 'Rule of Law',
    meaning:
      'A fundamental constitutional principle meaning the supremacy of regular law over arbitrary power, and the equal subjection of all citizens, courts, and officials to the law.',
    context: 'Topic 4.9 — According to Dicey and Lord Hewart, maximum civil liberty in Britain is secured through the Rule of Law.',
  },
  {
    term: 'inherent',
    meaning:
      'Existing as a natural, permanent, and inseparable birthright of the people.',
    context: 'Topic 4.9.1 — The Rule of Law is the product of centuries of struggle by the people for recognition of their inherent rights and privileges.',
  },
  {
    term: 'implicit',
    meaning:
      'Implied and embedded within the fabric of laws and judicial decisions without being written out as a single separate statute.',
    context: 'Topic 4.9.2 — The Rule of Law has never been enacted as a single statute; it is implicit in Acts of Parliament, judicial decisions, and Common Law.',
  },
  {
    term: 'arbitrariness',
    aliases: ['arbitrary', 'arbitrarily'],
    meaning:
      'The exercise of power based on personal whim, unchecked discretion, or despotic will rather than settled, binding rules of law.',
    context: 'Topic 3.7.6 & 4.9.2 — Lord Hewart defined the Rule of Law as the supremacy of law as distinguished from mere arbitrariness.',
  },
  {
    term: 'uniformity',
    meaning:
      'The principle that the exact same legal rules apply consistently everywhere throughout the land.',
    context: 'Topic 4.9.2 — The Rule of Law requires equality before the law, supremacy, uniformity, and universality.',
  },
  {
    term: 'universality',
    meaning:
      'The principle that the law applies to every single person, court, and government official without exception.',
    context: 'Topic 4.9.2 — Under the Rule of Law, citizens, courts, and administrative officials are all universally subject to the law.',
  },
  {
    term: 'curtailed',
    aliases: ['curtail', 'curtailing'],
    meaning:
      'Reduced, restricted, or cut back (such as restricting personal liberties during wartime emergencies).',
    context: 'Topic 4.9.2 & 4.9.3 — Personal liberty may not be curtailed except in accordance with law; Parliament curtails liberties only in times of national emergency.',
  },
  {
    term: 'stringent',
    meaning:
      'Strict, severe, and tightly enforced.',
    context: 'Topic 4.9.3 — The 1934 and 1936 Acts imposed stringent restrictions on speech, assembly, and press.',
  },
  {
    term: 'infringement',
    aliases: ['infringe'],
    meaning:
      'A violation, breach, or wrongful encroachment upon the rights and liberties of citizens.',
    context: 'Topic 4.9.3 — Outside national emergencies, British traditions and political temperament do not tolerate infringement of civil liberties.',
  },
  {
    term: 'hereditary',
    aliases: ['hereditary principle'],
    meaning:
      'Passed down by birth and family succession from parent to child (the basis of the British Monarchy and hereditary peerages in the House of Lords).',
    context: 'Topic 4.10 — A distinctive survival in the British Constitution alongside modern democracy.',
  },
  {
    term: 'reconcilable',
    aliases: ['hardly reconcilable', 'irreconcilable'],
    meaning:
      'Capable of being brought into logical harmony and agreement with another principle.',
    context: 'Topic 4.10.1 — The continuance of the hereditary King and House of Lords appears hardly reconcilable with democratic ideals, yet Britain retains them.',
  },
  {
    term: 'oligarchical',
    aliases: ['oligarchy'],
    meaning:
      'Relating to an oligarchy, where power or status is held by a small privileged or aristocratic group (such as hereditary peers in the House of Lords).',
    context: 'Topic 4.10.1 — Clement Attlee observed that despite monarchical and oligarchical elements, the British system is the best example of parliamentary democracy.',
  },

  // =========================================================================
  // PART 5 & 6: DEVELOPMENT OF THE CONSTITUTION & SCHOLARLY TERMS
  // =========================================================================
  {
    term: 'culminating',
    aliases: ['culminating point', 'culmination'],
    meaning:
      'Reaching the highest, decisive, or final climax after a long historical struggle.',
    context: 'Topic 5.6 — The Bill of Rights (1689) marked the culminating point in the evolution of British constitutional fundamentals.',
  },
  {
    term: 'germinate',
    aliases: ['germinated'],
    meaning:
      'To begin to sprout, grow, and develop—like constitutional seeds planted in earlier centuries maturing into modern democratic institutions.',
    context: 'Topic 5.6 — It took time for seeds sown in earlier periods to germinate, grow, and become fully matured institutions of popular government.',
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

function normalizeLookupKey(word: string): string {
  return word.toLowerCase().replace(/’/g, "'");
}

// Build regex lookup map once
const TERM_MAP = new Map<string, GlossaryEntry>();
const ALL_PATTERNS: string[] = [];

for (const entry of CONSTITUTION_GLOSSARY) {
  const words = [entry.term, ...(entry.aliases || [])];
  for (const w of words) {
    const key = normalizeLookupKey(w);
    if (!TERM_MAP.has(key)) {
      TERM_MAP.set(key, entry);
      const escaped = w
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/['’]/g, "['’]");
      ALL_PATTERNS.push(escaped);
    }
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
      const entry = TERM_MAP.get(normalizeLookupKey(matchedStr));
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
