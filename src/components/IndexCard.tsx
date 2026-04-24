import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb, PlayCircle, Layers, ArrowRight, MessageSquare, BookOpen, Zap } from 'lucide-react';
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
        <div key="index-card-modal-root" className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
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
            className="relative w-full max-w-4xl max-h-[90vh] bg-bg border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-8 py-8 border-b border-border flex justify-between items-start bg-accent/[0.02]">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-accent text-bg rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <BookOpen size={28} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-3xl font-display font-medium tracking-tight leading-tight">{item.title}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 mt-1">{item.shortDescription}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-ink/5 rounded-full transition-all opacity-40 hover:opacity-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
              <div className="max-w-2xl mx-auto space-y-12">
                
                {/* 1. Explanation */}
                <section>
                  <label className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] font-medium mb-5 opacity-40">
                    <Lightbulb size={12} className="text-accent" />
                    Cognitive Synthesis
                  </label>
                  <p className="text-xl md:text-2xl font-sans leading-relaxed text-ink/90 font-medium">
                    {card.explanation}
                  </p>
                </section>

                {/* Impact / Why it Matters */}
                {card.whyItMatters && (
                  <section className="p-8 bg-accent/[0.03] border border-accent/10 rounded-2xl">
                    <label className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] font-medium mb-4 opacity-40">
                      <Zap size={12} className="text-accent" />
                      Strategic Value
                    </label>
                    <p className="text-lg font-sans font-medium leading-relaxed italic text-ink/70">
                      {card.whyItMatters}
                    </p>
                  </section>
                )}

                {/* 2. Examples */}
                <section>
                  <label className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] font-medium mb-5 opacity-40">
                    <PlayCircle size={12} className="text-accent" />
                    Contextual Applications
                  </label>
                  <ul className="space-y-3">
                    {card.examples.map((example, i) => (
                      <li key={`ex-${item.id}-${i}`} className="flex items-start gap-4 p-5 bg-surface border border-border rounded-xl">
                        <div className="w-5 h-5 bg-accent/10 text-accent rounded flex items-center justify-center shrink-0 font-mono text-[9px] font-bold mt-1">
                          {i + 1}
                        </div>
                        <span className="text-base font-medium opacity-80">{example}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 3. Walkthrough */}
                {card.walkthrough && card.walkthrough.length > 0 && (
                  <section>
                    <label className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] font-medium mb-6 opacity-40">
                      <ArrowRight size={12} className="text-accent" />
                      Implementation Path
                    </label>
                    <div className="space-y-6">
                      {card.walkthrough.map((step, i) => (
                        <div key={`walk-${item.id}-${i}`} className="relative pl-10">
                          {i < card.walkthrough!.length - 1 && (
                            <div className="absolute left-[15px] top-6 bottom-[-24px] w-[1px] bg-border" />
                          )}
                          <div className="absolute left-0 top-0 w-8 h-8 bg-accent/5 text-accent border border-accent/20 rounded-full flex items-center justify-center font-mono text-[10px] font-bold z-10">
                            {i + 1}
                          </div>
                          <p className="text-lg font-medium opacity-70 pt-1 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 4. Related Concepts */}
                {card.relatedItems && card.relatedItems.length > 0 && (
                  <section className="pt-8 border-t border-border">
                    <label className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] font-medium mb-5 opacity-40">
                      <Layers size={12} className="text-accent" />
                      Adjacent Nodes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {card.relatedItems.map((rel, i) => (
                        <span key={`rel-${item.id}-${i}`} className="px-4 py-2 bg-surface border border-border rounded-lg font-mono text-[9px] uppercase tracking-wider font-semibold opacity-60">
                          {rel}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>

            {/* Sticky Footer for Feedback */}
            <div className="px-8 py-5 bg-surface border-t border-border flex justify-between items-center shrink-0">
              <p className="font-mono text-[9px] uppercase tracking-widest opacity-30">
                Ref: <span className="text-ink font-medium">{item.id}</span>
              </p>
              <button 
                onClick={showFeedback}
                className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest font-bold text-accent/60 hover:text-accent transition-all px-4 py-2 hover:bg-accent/5 rounded-lg border border-accent/10"
              >
                <MessageSquare size={14} />
                Feedback
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
