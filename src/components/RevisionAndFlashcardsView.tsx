import React, { useState } from 'react';
import {
  KEY_QUOTES_TABLE,
  KEY_CASES_TABLE,
  KEY_STATUTES_TABLE,
  KEY_DATES_TABLE,
  FINAL_ANSWER_KEYS,
} from '../data/revisionAndFlashcardsData';
import { SmartText } from './WordMeaningTooltip';
import { ArrowRight, FileText, KeyRound } from 'lucide-react';

interface RevisionAndFlashcardsViewProps {
  onNavigateToTopicMcqs: (topicId: string) => void;
  onNavigateToTopicNotes: (topicId: string) => void;
}

type SubTab = 'revision_sheet' | 'answer_key';

export const RevisionAndFlashcardsView: React.FC<RevisionAndFlashcardsViewProps> = ({
  onNavigateToTopicMcqs,
  onNavigateToTopicNotes,
}) => {
  const [subTab, setSubTab] = useState<SubTab>('revision_sheet');

  return (
    <div className="space-y-6">
      {/* Clean Header & Sub-tab Switcher */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-950">
              Revision Sheet &amp; Answer Key
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Condensed summary across Parts 1–6, landmark tables, and master answer key
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSubTab('revision_sheet')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                subTab === 'revision_sheet'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Revision Sheet</span>
            </button>
            <button
              onClick={() => setSubTab('answer_key')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                subTab === 'answer_key'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Answer Key (966)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================
          SUB-TAB 1: FULL REVISION SHEET (PARTS 1–6 + QUOTES, CASES, STATUTES, DATES)
         =================================================================== */}
      {subTab === 'revision_sheet' && (
        <div className="space-y-6">
          {/* 1. Nature and Content */}
          <section className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-2.5">
              1. Nature and Content of the Constitution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-900">1.1 Meaning of Constitution</h3>
                <ul className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
                  <li>· General meaning: Written, precise, systematic document; supreme law; special amendment procedure; statutory law must be consistent with letter and spirit; otherwise unconstitutional/ultra vires.</li>
                  <li>· Britain: No written/codified constitution; undefined, unsystematised, undecided; lacks precision and coherence; no single document; scattered enactments; greater part unwritten (custom).</li>
                  <li>· Constitutional law = statutory law: Same source, same procedure; no judicial review; courts cannot set aside Parliament&apos;s enactments.</li>
                  <li>· Unwritten and flexible: Product of history and evolution; &ldquo;child of wisdom and chance&rdquo;; Jennings: &ldquo;not made but grown—no paper.&rdquo;</li>
                  <li>· Paine &amp; Tocqueville: Said British Constitution did not exist — wrong; no State without constitution; no constitution wholly written or entirely unwritten; difference is degree, not kind.</li>
                  <li>· Bryce: Written constitutions &ldquo;developed by interpretation, fringed with decisions, enlarged by customs.&rdquo;</li>
                  <li>· US: 7 Articles, 10 pages; India: 395 Articles, 12 Schedules.</li>
                  <li>· No constitution complete by itself: Framework/skeleton filled by detailed rules, customs, judicial decisions, amendments.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-slate-900">1.2 Nature: Body of Basic Rules</h3>
                <ul className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
                  <li>· Same in nature as other constitutions; only difference: never systematised/codified.</li>
                  <li>· Dynamic: Ever-growing; roots in past, branches in future.</li>
                  <li>· Practical: Expediency, not theory; matter-of-fact.</li>
                  <li>· Lacks logic/symmetry (Ogg): &ldquo;Lacks symmetry, abounds in the illogical&rdquo; — but not a hotchpotch; rules deduced from British experience and consciously applied.</li>
                  <li>· Anson: &ldquo;Rambling structure&rdquo;; &ldquo;convenient rather than symmetrical&rdquo;; divergence of law and custom, theory and practice.</li>
                  <li>· Bagehot: Prerequisites — mutual confidence among electors, calm national mind, gift of rationality; adult and practical nation; codified constitution &ldquo;more trouble than worth.&rdquo;</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Sources of the Constitution */}
          <section className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-2.5">
              2. Sources of the Constitution (7 Categories)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-900 font-semibold">
                    <th className="py-2.5 pr-3 w-8">#</th>
                    <th className="py-2.5 px-3 w-48">Source</th>
                    <th className="py-2.5 pl-3">Key Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">1</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Charters, Petitions, Statutes</td>
                    <td className="py-3 pl-3">Magna Carta 1215, Petition of Rights 1628, Bill of Rights 1689, Act of Settlement 1701, Parliament Act 1911/1949, Statute of Westminster 1931, Indian Independence Act 1947; product of political crisis; Elder William P.: &ldquo;Bible of the British Constitution&rdquo;</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">2</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Ordinary Statutes</td>
                    <td className="py-3 pl-3">Suffrage, elections, public officials; not crisis-driven; passed as needed; vitally important for democracy; repeal against &ldquo;constitutional sense&rdquo;; system would become unworkable; Parliament sovereign (&ldquo;make or unmake any law&rdquo;)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">3</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Judicial Decisions</td>
                    <td className="py-3 pl-3">Interpret/define/develop Charters and Statutes; create precedents; Sheriff of Middlesex (1840): Parliament can punish members for breach of privilege; Bradlaugh v. Gossett (1884): Parliament supreme over courts in internal affairs</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">4</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Common Law</td>
                    <td className="py-3 pl-3">King&apos;s prerogative; Parliament&apos;s supremacy; civil liberties (speech, press, assembly, home, jury trial); based on usage; Blackstone: customs &ldquo;not set down in any written statute... depending on immemorial usages&rdquo;; &ldquo;bulwark of British freedom&rdquo;; continually developing</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">5</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Usages and Conventions</td>
                    <td className="py-3 pl-3">Centre and soul of constitutional law; fundamental convention = Cabinet Government; Finer: rules of political behaviour not established in statutes/judicial decisions/parliamentary customs; object: make executive and legislature responsible to will of people; Jennings: rest on general acquiescence</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">6</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Commentaries</td>
                    <td className="py-3 pl-3">Less reliable; systematise rules; acquired status of constitutional documents; Erskine May&apos;s Treatise — classic guide to parliamentary procedure/privileges, referred to by Speakers; Dicey&apos;s Law of the Constitution — more than commentary</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">7</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Royal Prerogative</td>
                    <td className="py-3 pl-3">Declare war, make treaties, pardon criminals, dissolve Parliament; executed through Orders in Council, proclamations, writs under great seal; performed by Ministers on behalf of Monarch; authority from Crown, not Parliament</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Conventions of the Constitution */}
          <section className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-2.5">
              3. Conventions of the Constitution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
              <div className="space-y-1.5">
                <h3 className="font-semibold text-slate-900">3.1 Meaning &amp; 3.2 Laws vs Conventions</h3>
                <ul className="space-y-1.5 leading-relaxed">
                  <li>· Dicey: indefinite number of customs, traditions, precedents; integral part; not law; nowhere written down; without them Constitution maimed/unworkable.</li>
                  <li>· Fundamental convention: Cabinet Government.</li>
                  <li>· Law vs Convention: Origin (legal body vs extra-legal practice), Formulation (precise terms vs never formulated), Enforcement (courts vs no legal sanction), Binding force (willingness of people / general acquiescence).</li>
                  <li>· Recognised by British North America Act 1867, Anglo-Irish Treaty 1921, Status of Union Act 1934, Statute of Westminster 1931, Ministers of the Crown Act 1937 (£10,000 salary to PM).</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-semibold text-slate-900">3.3 &amp; 3.5 Sanction &amp; Why Observed</h3>
                <ul className="space-y-1.5 leading-relaxed">
                  <li>· Dicey: Violation ultimately = breach of law (annual session → taxes → Army Act).</li>
                  <li>· Lowell: Dicey incomplete; Parliament can pass permanent laws; some violations cause no legal breach (Speaker not resigning from party; PM from Lords).</li>
                  <li>· Jennings: Exist for good reasons; political difficulties; government as co-operative function; habit of obedience.</li>
                  <li>· Neumann: &ldquo;Unconstitutional&rdquo; = &ldquo;not proper&rdquo;; things simply not done by gentlemen.</li>
                  <li>· Marshall &amp; Moodie: Describe how legal powers must be exercised to be tolerated by those affected.</li>
                  <li>· Privy Council (1935) British Coal Corporation v. Rex: abstract law vs. realities.</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-semibold text-slate-900">3.4 Kinds of Conventions (4 Groups)</h3>
                <ul className="space-y-1.5 leading-relaxed">
                  <li>· 1. Parliament–Executive Harmony (Cabinet Government): Ministers MPs, majority party, under PM, collective responsibility, resign/dissolve on losing confidence.</li>
                  <li>· 2. Legislative Procedure / Two Houses: Annual session; two Houses; Commons financial initiative; Lords subordination; Law Lords judicial; three readings; HM Opposition; Speaker no-party man.</li>
                  <li>· 3. Government–Electorate (Mandate Convention): Controversial legislation needs electoral mandate (1945 Labour nationalisation; Viscount Cranborne).</li>
                  <li>· 4. Dominion/Commonwealth Relations: Statute of Westminster 1931; Imperial Conferences 1923, 1926, 1930.</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-semibold text-slate-900">3.6 Role of Conventions &amp; 3.7 Limits of Dicey</h3>
                <ul className="space-y-1.5 leading-relaxed">
                  <li>· Democratise Executive; revolutionise Judiciary (Law Lords); enable Commonwealth collaboration.</li>
                  <li>· &ldquo;Flesh which clothes dry bones of law&rdquo;; motive power; lubricate machinery of government.</li>
                  <li>· Precedents broken when circumstances change: 1931 National Government &ldquo;agreement to differ&rdquo; (justified by Baldwin); Disraeli 1868 (resigned without meeting Parliament); Baldwin 1929 (reverted to old convention).</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Salient Features */}
          <section className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-2.5">
              4. Salient Features (10 Features)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-900 font-semibold">
                    <th className="py-2.5 pr-3 w-8">#</th>
                    <th className="py-2.5 px-3 w-48">Feature</th>
                    <th className="py-2.5 pl-3">Key Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">1</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Mostly Unwritten</td>
                    <td className="py-3 pl-3">No single document; scattered; greater part unwritten (custom); written elements don&apos;t comprise Constitution by themselves</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">2</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Product of Development</td>
                    <td className="py-3 pl-3">Organic growth; McIntosh: &ldquo;constitutions grow, not made&rdquo;; no revolutionary upheavals; Ogg: &ldquo;continuity hardly paralleled&rdquo;; Morrison: peaceful evolution</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">3</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Theory vs Practice</td>
                    <td className="py-3 pl-3">Theory: absolute monarchy; form: limited constitutional monarchy; practice: democratic republic; &ldquo;King can do no wrong&rdquo;; &ldquo;crowned republic&rdquo; (Webbs); Jennings: &ldquo;government by opinion&rdquo;</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">4</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Sovereignty of Parliament</td>
                    <td className="py-3 pl-3">Supreme; make/unmake any law; no judicial review; veto obsolete; Monarch must assent</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">5</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Flexible</td>
                    <td className="py-3 pl-3">No special procedure; no referendum (unlike Switzerland/Australia); mandate convention; Callaghan; Ogg: psychological checks; legally most flexible, actually less fluid</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">6</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Unitary</td>
                    <td className="py-3 pl-3">All authority from London; local units subordinate; unlike federal USA/India; written/rigid constitution pre-requisite of federation</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">7</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Parliamentary Government</td>
                    <td className="py-3 pl-3">Ministers from majority party; responsible to Commons; Bagehot: Cabinet = &ldquo;hyphen that joins, buckle that binds&rdquo;; Greaves: right to govern flows through legislature to Cabinet</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">8</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Two-Party System</td>
                    <td className="py-3 pl-3">Government and Opposition; coherent expression; 17th century origin; 200 years two parties; Labour 1921; SDP 1981 (short-lived)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">9</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Rule of Law</td>
                    <td className="py-3 pl-3">Common Law basis; no specific rights (unlike USA/India); Lord Hewart: &ldquo;supremacy/dominance of law vs arbitrariness&rdquo;; judiciary as guardian; Parliament can curtail in emergency (WWI, 1934/1936 Acts, WWII Emergency Powers Act 1939)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-mono text-slate-400">10</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Hereditary Character</td>
                    <td className="py-3 pl-3">Monarchy hereditary; House of Lords hereditary peers; Attlee: &ldquo;best example of democracy despite monarchical and oligarchical elements&rdquo;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Development & 6. Suggested Readings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-3 text-xs sm:text-sm text-slate-700">
              <h2 className="text-base sm:text-lg font-bold text-slate-950 border-b border-slate-100 pb-2">
                5. Development of the Constitution
              </h2>
              <ul className="space-y-1.5 leading-relaxed">
                <li>· Freeman: Continuous development; unbroken for 1400 years; no wholly new constitution; each step natural consequence of earlier step.</li>
                <li>· Three Periods: First (To 1485 — Foundations); Second (1485–1689 — Reconstruction: Tudor, Stuart, Puritan Revolution, Commonwealth); Third (1689–present — Fructification).</li>
                <li>· Glorious Revolution 1689 &amp; Bill of Rights: Kings held throne by grace of Parliament; limitations on King&apos;s powers; no Roman Catholic ruler; centre of gravity shifted from King to Parliament.</li>
                <li>· 8 Main Lines of Growth: (1) Diminished powers of King, (2) Emergence of Cabinet/responsible Ministry, (3) Rise of political parties, (4) Leadership of PM, (5) Shifting power within Parliament, (6) Democratisation of Commons (Reform Bills from 1832), (7) Changes in British Empire, (8) Labour Government reduced absolute number and hereditary element in House of Lords.</li>
              </ul>
            </section>

            <section className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-3 text-xs sm:text-sm text-slate-700">
              <h2 className="text-base sm:text-lg font-bold text-slate-950 border-b border-slate-100 pb-2">
                6. Suggested Readings
              </h2>
              <ul className="space-y-1.5 leading-relaxed">
                <li>· Amery (Thoughts on the Constitution), Amos (The English Constitution), Anson (Law and Custom of the Constitution), Bagehot (The English Constitution), Birch (Representative and Responsible Government).</li>
                <li>· Dicey (Law of the Constitution), Gooch (The Government of England), Greaves (The British Constitution), Finer (Governments of Greater European Powers).</li>
                <li>· Jennings (Cabinet Government; The Law and the Constitution), Keith (Constitution of England from Queen Victoria to George VI), Keith &amp; Gibbs (The British Cabinet System).</li>
                <li>· Laski (Parliamentary Government in England; Reflections on the Constitution), Low (The Governance of England), Lowell (Government of England), Morrison (British Parliamentary Democracy).</li>
                <li>· Muir (How Britain is Governed), Munro (The Governments of Europe), Ogg (English Government and Politics), Philips (Constitutional and Administrative Law), Wheare (Modern Constitutions), Yardley (Introduction to British Constitutional Law).</li>
              </ul>
            </section>
          </div>

          {/* Key Quotes */}
          <section className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-3">
            <h2 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-2.5">
              Key Quotes to Remember
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-900 font-semibold">
                    <th className="py-2.5 pr-4">Quote</th>
                    <th className="py-2.5 pl-4 w-56">Author</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {KEY_QUOTES_TABLE.map((row, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 pr-4 text-slate-700">
                        <SmartText text={row.quote} />
                      </td>
                      <td className="py-2.5 pl-4 font-semibold text-slate-900">{row.author}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Key Cases, Key Dates & Key Statutes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-5">
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-2">
                  Key Cases
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-900 font-semibold">
                        <th className="py-2 pr-3">Case</th>
                        <th className="py-2 px-3">Year</th>
                        <th className="py-2 pl-3">Principle</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {KEY_CASES_TABLE.map((c, idx) => (
                        <tr key={idx}>
                          <td className="py-2.5 pr-3 font-semibold text-slate-900">{c.caseName}</td>
                          <td className="py-2.5 px-3 font-mono text-slate-500">{c.year}</td>
                          <td className="py-2.5 pl-3 text-slate-700">{c.principle}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h2 className="text-lg font-bold text-slate-950">
                  Key Constitutional Dates
                </h2>
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-900 font-semibold sticky top-0 bg-white">
                        <th className="py-2 pr-3 w-28">Date</th>
                        <th className="py-2 pl-3">Event</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {KEY_DATES_TABLE.map((d, idx) => (
                        <tr key={idx}>
                          <td className="py-2 pr-3 font-mono font-semibold text-slate-900">{d.date}</td>
                          <td className="py-2 pl-3 text-slate-700">{d.event}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-3">
              <h2 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-2">
                Key Statutes
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-900 font-semibold">
                      <th className="py-2 pr-3">Statute</th>
                      <th className="py-2 px-3">Year</th>
                      <th className="py-2 pl-3">Significance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {KEY_STATUTES_TABLE.map((s, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 pr-3 font-semibold text-slate-900">{s.statute}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-500">{s.year}</td>
                        <td className="py-2.5 pl-3 text-slate-700">{s.significance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          SUB-TAB 2: FINAL ANSWER KEY — ALL TOPICS COMBINED (966 MCQs)
         =================================================================== */}
      {subTab === 'answer_key' && (
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-950">
              Final Answer Key — All 966 MCQs
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {FINAL_ANSWER_KEYS.map((sec) => (
              <div
                key={sec.topicId}
                className="py-4 first:pt-1 last:pb-1 space-y-1.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {sec.title}{' '}
                    <span className="text-xs font-mono font-normal text-slate-400">
                      · {sec.countLabel}
                    </span>
                  </h3>
                  <div className="flex items-center gap-3 text-xs">
                    {!sec.topicId.startsWith('ALL_') && (
                      <button
                        onClick={() => onNavigateToTopicNotes(sec.topicId)}
                        className="font-medium text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
                      >
                        Notes
                      </button>
                    )}
                    <button
                      onClick={() => onNavigateToTopicMcqs(sec.topicId)}
                      className="font-semibold text-blue-900 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Practice</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-mono text-slate-600 leading-relaxed">
                  {sec.answersString}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
