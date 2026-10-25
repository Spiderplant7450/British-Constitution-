import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  TOPIC_FLASHCARD_DECKS,
  MASTER_ONE_LINE_REVISIONS,
} from '../data/revisionAndFlashcardsData';
import { SmartText } from './WordMeaningTooltip';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  LayoutGrid,
  RectangleHorizontal,
  Check,
  RotateCcw,
} from 'lucide-react';
import { FlashcardItem } from '../types/constitution';

type ViewMode = 'carousel' | 'grid' | 'master_76';

export const FlashcardsPage: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<number>(1);
  const [selectedDeckId, setSelectedDeckId] = useState<string>('1.1');
  const [viewMode, setViewMode] = useState<ViewMode>('carousel');

  // Single-Card Study Mode state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSingleCardFlipped, setIsSingleCardFlipped] = useState<boolean>(false);
  const [shuffledCards, setShuffledCards] = useState<FlashcardItem[] | null>(null);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  // Grid Mode state
  const [flippedGridCards, setFlippedGridCards] = useState<Record<string, boolean>>({});
  const [flipAllGrid, setFlipAllGrid] = useState<boolean>(false);

  const decksInSelectedPart = TOPIC_FLASHCARD_DECKS.filter(
    (d) => d.partNumber === selectedPart
  );

  const currentDeck =
    TOPIC_FLASHCARD_DECKS.find((d) => d.topicId === selectedDeckId) ||
    TOPIC_FLASHCARD_DECKS[0];

  const activeCardsList = shuffledCards || currentDeck.flashcards;
  const activeCard = activeCardsList[currentIndex] || activeCardsList[0];
  const activeCardKey = `${currentDeck.topicId}-${activeCard?.number}`;

  useEffect(() => {
    setCurrentIndex(0);
    setIsSingleCardFlipped(false);
    setShuffledCards(null);
    setFlipAllGrid(false);
  }, [selectedDeckId]);

  const handleSelectPart = (partNum: number) => {
    setSelectedPart(partNum);
    const firstDeck = TOPIC_FLASHCARD_DECKS.find((d) => d.partNumber === partNum);
    if (firstDeck) {
      setSelectedDeckId(firstDeck.topicId);
    }
  };

  const handleNextCard = () => {
    setIsSingleCardFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % activeCardsList.length);
    }, 110);
  };

  const handlePrevCard = () => {
    setIsSingleCardFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? activeCardsList.length - 1 : prev - 1
      );
    }, 110);
  };

  const handleShuffleDeck = () => {
    setIsSingleCardFlipped(false);
    const copy = [...currentDeck.flashcards];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setShuffledCards(copy);
    setCurrentIndex(0);
  };

  const handleResetDeckOrder = () => {
    setIsSingleCardFlipped(false);
    setShuffledCards(null);
    setCurrentIndex(0);
  };

  const toggleGridCardFlip = (cardKey: string) => {
    setFlippedGridCards((prev) => ({
      ...prev,
      [cardKey]: !prev[cardKey],
    }));
  };

  const handleToggleFlipAllGrid = () => {
    const nextVal = !flipAllGrid;
    setFlipAllGrid(nextVal);
    const updated: Record<string, boolean> = { ...flippedGridCards };
    for (const c of currentDeck.flashcards) {
      updated[`${currentDeck.topicId}-${c.number}`] = nextVal;
    }
    setFlippedGridCards(updated);
  };

  const toggleMastered = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredCards((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const deckMasteredCount = currentDeck.flashcards.filter(
    (c) => masteredCards[`${currentDeck.topicId}-${c.number}`]
  ).length;

  return (
    <div className="space-y-6">
      {/* Clean Header & Mode Bar */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-950">
              Flashcards
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Tap or click any card to flip in 3D
            </p>
          </div>

          {/* Segmented Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto no-scrollbar">
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'carousel'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <RectangleHorizontal className="w-3.5 h-3.5" />
              <span>Single Card</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Card Grid</span>
            </button>
            <button
              onClick={() => setViewMode('master_76')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'master_76'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <span>76 One-Liners</span>
            </button>
          </div>
        </div>

        {/* Clean Two-Step Part & Topic Selector */}
        {viewMode !== 'master_76' && (
          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            {/* Part Selector Row */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {[
                { part: 1, label: 'Part 1: Nature' },
                { part: 2, label: 'Part 2: Sources' },
                { part: 3, label: 'Part 3: Conventions' },
                { part: 4, label: 'Part 4: Salient Features' },
                { part: 5, label: 'Part 5: Development' },
                { part: 6, label: 'Part 6: Readings' },
              ].map((item) => (
                <button
                  key={item.part}
                  onClick={() => handleSelectPart(item.part)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedPart === item.part
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Topic Selector Row for the Chosen Part */}
            {decksInSelectedPart.length > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
                {decksInSelectedPart.map((deck) => {
                  const isSelected = selectedDeckId === deck.topicId;
                  return (
                    <button
                      key={deck.topicId}
                      onClick={() => setSelectedDeckId(deck.topicId)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isSelected
                          ? 'bg-blue-50 text-blue-950 border border-blue-200 font-semibold'
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      {deck.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ===================================================================
          MODE 1: SINGLE-CARD 3D DECK
         =================================================================== */}
      {viewMode === 'carousel' && activeCard && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-8 space-y-6">
            {/* Minimal Deck Top Bar */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-950">
                  {currentDeck.title}
                </h2>
                <p className="text-xs text-slate-500 font-mono tabular-nums mt-0.5">
                  {currentIndex + 1} of {activeCardsList.length}
                  {deckMasteredCount > 0 ? ` · ${deckMasteredCount} mastered` : ''}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShuffleDeck}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Shuffle</span>
                </button>
                {shuffledCards && (
                  <button
                    onClick={handleResetDeckOrder}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Clean 3D Flipping Card (Zero "Front" or "Back" labels) */}
            <div className="max-w-xl mx-auto">
              <div
                onClick={() => setIsSingleCardFlipped((prev) => !prev)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    setIsSingleCardFlipped((prev) => !prev);
                  } else if (e.key === 'ArrowRight') {
                    handleNextCard();
                  } else if (e.key === 'ArrowLeft') {
                    handlePrevCard();
                  }
                }}
                aria-label="Flip flashcard"
                className="perspective-1000 w-full h-64 sm:h-72 cursor-pointer select-none focus:outline-none"
              >
                <motion.div
                  className="w-full h-full relative preserve-3d"
                  animate={{ rotateY: isSingleCardFlipped ? 180 : 0 }}
                  transition={{
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 220,
                    damping: 22,
                  }}
                >
                  {/* Side A (Question) */}
                  <div className="flashcard-side-a absolute inset-0 w-full h-full backface-hidden rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md border-2">
                    <div className="flex items-center justify-between text-xs font-mono opacity-70">
                      <span>#{activeCard.number}</span>
                      <RotateCw className="w-4 h-4" />
                    </div>

                    <div className="my-auto py-3 text-center">
                      <p className="text-lg sm:text-2xl font-semibold leading-snug font-display">
                        {activeCard.front}
                      </p>
                    </div>

                    <div className="h-4" />
                  </div>

                  {/* Side B (Answer — Flipped) */}
                  <div className="flashcard-side-b absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md border-2">
                    <div className="flex items-center justify-between text-xs font-mono opacity-90">
                      <span>#{activeCard.number}</span>
                      <button
                        type="button"
                        onClick={(e) => toggleMastered(activeCardKey, e)}
                        className={`px-2.5 py-1 rounded-md text-xs font-sans font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer ${
                          masteredCards[activeCardKey]
                            ? 'bg-emerald-400 text-slate-950'
                            : 'bg-black/25 text-white hover:bg-black/35 border border-white/20'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{masteredCards[activeCardKey] ? 'Mastered' : 'Got it'}</span>
                      </button>
                    </div>

                    <div className="my-auto py-3 text-center">
                      <p className="text-base sm:text-xl font-medium leading-relaxed">
                        {activeCard.back}
                      </p>
                    </div>

                    <div className="h-4" />
                  </div>
                </motion.div>
              </div>

              {/* Simple Navigation Controls */}
              <div className="mt-5 flex items-center justify-between gap-2">
                <button
                  onClick={handlePrevCard}
                  className="px-4 py-2.5 min-h-[42px] text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setIsSingleCardFlipped((prev) => !prev)}
                  className="btn-primary-action px-5 py-2.5 min-h-[42px] text-xs sm:text-sm font-semibold rounded-xl inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Flip Card</span>
                </button>

                <button
                  onClick={handleNextCard}
                  className="px-4 py-2.5 min-h-[42px] text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Topic One-Line Revisions */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-950">
              One-Line Revisions — {currentDeck.title}
            </h3>
            <ul className="divide-y divide-slate-100 text-sm text-slate-700">
              {currentDeck.oneLiners.map((line, idx) => (
                <li key={idx} className="py-2.5 first:pt-0 last:pb-0 leading-relaxed">
                  <SmartText text={line} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODE 2: CLEAN 3D CARD GRID (Distinct Front & Back Colors)
         =================================================================== */}
      {viewMode === 'grid' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-950">
                {currentDeck.title}
              </h2>

              <button
                onClick={handleToggleFlipAllGrid}
                className="px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{flipAllGrid ? 'Reset Cards' : 'Flip All'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {currentDeck.flashcards.map((card) => {
                const cardKey = `${currentDeck.topicId}-${card.number}`;
                const isFlipped = Boolean(flippedGridCards[cardKey]);

                return (
                  <div
                    key={cardKey}
                    onClick={() => toggleGridCardFlip(cardKey)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        toggleGridCardFlip(cardKey);
                      }
                    }}
                    className="perspective-1000 h-44 cursor-pointer select-none"
                  >
                    <motion.div
                      className="w-full h-full relative preserve-3d"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{
                        duration: 0.45,
                        type: 'spring',
                        stiffness: 230,
                        damping: 22,
                      }}
                    >
                      {/* Side A (Question) */}
                      <div className="flashcard-side-a absolute inset-0 w-full h-full backface-hidden rounded-xl border-2 p-4 flex flex-col justify-between transition-colors shadow-xs">
                        <div className="flex items-center justify-between text-xs font-mono opacity-70">
                          <span>#{card.number}</span>
                          <RotateCw className="w-3.5 h-3.5" />
                        </div>

                        <div className="my-auto py-1">
                          <p className="text-sm sm:text-[15px] font-semibold leading-snug">
                            {card.front}
                          </p>
                        </div>

                        <div className="h-2" />
                      </div>

                      {/* Side B (Answer — Flipped) */}
                      <div className="flashcard-side-b absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl border-2 p-4 flex flex-col justify-between shadow-sm">
                        <div className="flex items-center justify-between text-xs font-mono opacity-85">
                          <span>#{card.number}</span>
                          <RotateCw className="w-3.5 h-3.5" />
                        </div>

                        <div className="my-auto py-1 overflow-y-auto">
                          <p className="text-sm font-medium leading-relaxed">
                            {card.back}
                          </p>
                        </div>

                        <div className="h-2" />
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Topic One-Line Revisions */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-950">
              One-Line Revisions — {currentDeck.title}
            </h3>
            <ul className="divide-y divide-slate-100 text-sm text-slate-700">
              {currentDeck.oneLiners.map((line, idx) => (
                <li key={idx} className="py-2.5 first:pt-0 last:pb-0 leading-relaxed">
                  <SmartText text={line} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODE 3: 76 MASTER ONE-LINE REVISIONS
         =================================================================== */}
      {viewMode === 'master_76' && (
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-950">
              76 Master One-Line Revisions (Parts 1 to 6)
            </h2>
          </div>

          <ul className="divide-y divide-slate-100 text-sm text-slate-800">
            {MASTER_ONE_LINE_REVISIONS.map((line, idx) => (
              <li key={idx} className="py-2.5 first:pt-0 last:pb-0 leading-relaxed">
                <SmartText text={line} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
