import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb, PlayCircle, Layers, ArrowRight, MessageSquare } from 'lucide-react';
import { Item, IndexCard as IndexCardType } from '../types';

interface IndexCardProps {
  item: Item | null;
  card: IndexCardType | null;
  isOpen: boolean;
  onClose: () => void;
  showFeedback: () => void;
}

export const IndexCard: React.FC<IndexCardProps> = ({ item, card, isOpen, onClose, showFeedback }) => {
  if (!item || !card) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-bg border-[6px] border-ink rounded-[4rem] shadow-[24px_24px_0_0_rgba(0,0,0,0.2)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-12 py-10 border-b-4 border-ink flex justify-between items-start bg-accent/5">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-accent text-bg rounded-2xl flex items-center justify-center">
                  <BookOpen size={32} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-4xl font-display font-black uppercase tracking-tighter leading-tight">{item.title}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest opacity-40">{item.shortDescription}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-ink/5 rounded-full transition-all"
              >
                <X size={32} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
              <div className="max-w-2xl mx-auto space-y-16">
                
                {/* 1. Explanation */}
                <section>
                  <label className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] font-black mb-6 opacity-40">
                    <Lightbulb size={14} className="text-accent" />
                    Plain-English Synthesis
                  </label>
                  <p className="text-2xl font-sans leading-relaxed text-ink/80">
                    {card.explanation}
                  </p>
                </section>

                {/* 2. Examples */}
                <section>
                  <label className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] font-black mb-6 opacity-40">
                    <PlayCircle size={14} className="text-accent" />
                    Real-World Transmutations
                  </label>
                  <ul className="space-y-4">
                    {card.examples.map((example, i) => (
                      <li key={i} className="flex items-start gap-4 p-6 bg-surface border-2 border-border rounded-2xl">
                        <div className="w-6 h-6 bg-accent/10 text-accent rounded-lg flex items-center justify-center shrink-0 font-mono text-[10px] font-black">
                          {i + 1}
                        </div>
                        <span className="text-lg font-medium opacity-80">{example}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 3. Walkthrough */}
                {card.walkthrough && card.walkthrough.length > 0 && (
                  <section>
                    <label className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] font-black mb-6 opacity-40">
                      <ArrowRight size={14} className="text-accent" />
                      Neural Walkthrough
                    </label>
                    <div className="space-y-6">
                      {card.walkthrough.map((step, i) => (
                        <div key={i} className="relative pl-12">
                          {i < card.walkthrough!.length - 1 && (
                            <div className="absolute left-[19px] top-8 bottom-[-24px] w-1 bg-ink/10" />
                          )}
                          <div className="absolute left-0 top-0 w-10 h-10 bg-accent text-bg rounded-full flex items-center justify-center font-mono text-xs font-black z-10">
                            {i + 1}
                          </div>
                          <p className="text-xl font-bold opacity-70 pt-1 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 4. Related Concepts */}
                {card.relatedItems && card.relatedItems.length > 0 && (
                  <section className="pt-8 border-t-4 border-ink/5">
                    <label className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] font-black mb-6 opacity-40">
                      <Layers size={14} className="text-accent" />
                      Related Cognitive Nodes
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {card.relatedItems.map((rel, i) => (
                        <span key={i} className="px-6 py-3 bg-surface border-2 border-border rounded-full font-mono text-[10px] uppercase tracking-widest font-black opacity-60">
                          {rel}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>

            {/* Sticky Footer for Feedback */}
            <div className="px-12 py-8 bg-surface border-t-4 border-ink flex justify-between items-center shrink-0">
              <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">
                Cognitive Node ID: <span className="text-ink font-black">{item.id}</span>
              </p>
              <button 
                onClick={showFeedback}
                className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest font-black text-accent hover:opacity-100 transition-all px-6 py-3 hover:bg-accent/5 rounded-xl border border-accent/20"
              >
                <MessageSquare size={16} />
                Report Friction
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const BookOpen = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
