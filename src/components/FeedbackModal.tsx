import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string;
  topic?: string;
  step?: number;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ 
  isOpen, 
  onClose, 
  context = "general", 
  topic, 
  step 
}) => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState(auth.currentUser?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'feedback'), {
        uid: auth.currentUser?.uid || null,
        userEmail: email,
        message: message.trim(),
        context,
        topic: topic || null,
        step: step !== undefined ? step : null,
        createdAt: serverTimestamp(),
      });
      setIsSubmitted(true);
      setMessage('');
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Failed to send feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="feedback-modal-root" className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-md bg-bg border-4 border-ink shadow-[12px_12px_0_0_rgba(0,0,0,1)] p-8 relative overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-ink/5 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                <MessageSquare size={24} />
              </div>
              <h2 className="font-sans text-2xl font-black uppercase tracking-tight">Feedback</h2>
            </div>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Thank you!</h3>
                <p className="text-ink/60">Your feedback helps us make Understandable better for everyone.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest font-black mb-2 opacity-40">
                    Your Message
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind, report a bug, or suggest a feature..."
                    className="w-full bg-ink/5 border-2 border-ink/10 rounded-xl p-4 min-h-[150px] focus:border-accent outline-none font-sans transition-colors resize-none"
                  />
                </div>

                {!auth.currentUser && (
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest font-black mb-2 opacity-40">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-ink/5 border-2 border-ink/10 rounded-xl p-4 focus:border-accent outline-none font-sans transition-colors"
                    />
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">
                    <AlertCircle size={16} />
                    <span className="text-sm font-bold">{error}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !message.trim()}
                    className="w-full bg-accent text-bg font-black uppercase tracking-widest py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        Send Feedback
                      </>
                    )}
                  </button>
                </div>

                <p className="font-mono text-[8px] uppercase tracking-[0.2em] opacity-30 text-center">
                  Context: <span className="font-black text-ink">{context}</span>
                  {topic && <> • Topic: <span className="font-black text-ink">{topic}</span></>}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
