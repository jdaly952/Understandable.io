import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, type }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={`legal-modal-${type}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-bg border-4 border-ink w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-[2.5rem] flex flex-col shadow-[24px_24px_0_0_rgba(0,0,0,0.1)]"
          >
            <div className="flex justify-between items-center p-8 md:p-12 border-b-2 border-border bg-surface/50">
              <h2 className="font-display text-2xl md:text-5xl font-black uppercase tracking-tight text-ink">
                {title}
              </h2>
              <button 
                onClick={onClose}
                className="p-4 hover:bg-ink hover:text-bg transition-all rounded-full border-2 border-ink"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-16 font-sans text-lg md:text-xl leading-relaxed text-ink/80 prose prose-lg prose-ink max-w-none">
              {type === 'privacy' ? (
                <div className="space-y-10">
                  <section>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-ink mb-6">1. Data Collection</h3>
                    <p>Understandable.io ("we", "us") collects minimal information to provide our services. When you sign in with Google, we collect your name and email address to manage your personal learning history.</p>
                  </section>
                  <section>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-ink mb-6">2. Usage of Data</h3>
                    <p>Your conceptual mappings and "Understandables" are stored securely in our database. We do not sell your personal information to third parties. We use your data exclusively to sync your learning history across devices.</p>
                  </section>
                  <section>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-ink mb-6">3. Model Interactions</h3>
                    <p>The topics you input are processed by AI models (Gemini) to generate explanations. We do not transmit your personal identity (name, email) to the AI service provider.</p>
                  </section>
                  <section>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-ink mb-6">4. Payments & Security</h3>
                    <p>Payments for physical goods (engravings) are processed securely through Stripe. Understandable.io does not store your credit card information. All transactions are encrypted and handled by a PCI-compliant provider.</p>
                  </section>
                  <section>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-ink mb-6">5. Cookies & Storage</h3>
                    <p>We use local browser storage and session cookies to maintain your login state and preferences.</p>
                  </section>
                  <section>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-ink mb-6">6. Your Rights</h3>
                    <p>You may request the deletion of your account and data at any time through our contact channels or by signing out and clearing your history.</p>
                  </section>
                </div>
              ) : (
                <div className="space-y-10">
                  <section>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-ink mb-6">1. Agreement to Terms</h3>
                    <p>By accessing Understandable.io, you agree to be bound by these terms. If you do not agree, please do not use the service.</p>
                  </section>
                  <section>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-ink mb-6">2. Professional Accuracy</h3>
                    <p>The content generated is for educational and conceptual overview purposes. While we strive for "Universal Clarity", AI-generated content may occasionally contain inaccuracies. Always verify critical information from primary sources.</p>
                  </section>
                  <section>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-ink mb-6">3. Use of Service</h3>
                    <p>You agree not to use the service for generating harmful, illegal, or deceptive content. We reserve the right to terminate access for users who violate these principles.</p>
                  </section>
                  <section>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-ink mb-6">4. Intellectual Property</h3>
                    <p>The underlying mapping engine and visual architecture are the property of Understandable.io. You retain rights to specify the topics you explore.</p>
                  </section>
                </div>
              )}
              
              <div className="mt-20 pt-12 border-t border-border opacity-40 font-mono text-sm uppercase">
                Last Updated: April 2026 // Understandable.io Compliance
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
