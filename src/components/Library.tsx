import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, orderBy, onSnapshot, getDocs, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Category, Item, IndexCard } from '../types';
import { 
  ChevronRight, 
  ArrowLeft, 
  BookOpen, 
  Cpu, 
  Terminal, 
  Layers, 
  Code2, 
  Lightbulb, 
  Zap, 
  Search,
  MessageSquare,
  X
} from 'lucide-react';

interface LibraryProps {
  onClose: () => void;
  onSelectItem: (item: Item, indexCard: IndexCard) => void;
  showFeedback: () => void;
}

export const Library: React.FC<LibraryProps> = ({ onClose, onSelectItem, showFeedback }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    
    // Hardcoded initial data to prevent empty library
    const cats: Category[] = [
      { id: 'dev-mastery', name: 'Software Mastery', description: 'Deep dives into engineering concepts.', icon: 'Code2', order: 1 },
      { id: 'math-physics', name: 'Mathematics & Physics', description: 'The laws governing reality.', icon: 'Cpu', order: 2 },
      { id: 'sys-design', name: 'System Architecture', description: 'The blueprint of robust pipelines.', icon: 'Layers', order: 3 },
      { id: 'cognitive-sci', name: 'Cognitive Science', description: 'Understanding the human mind.', icon: 'Lightbulb', order: 4 },
      { id: 'art-history', name: 'Art & History', description: 'The evolution of human expression.', icon: 'Code2', order: 5 }
    ];

    const its: Item[] = [
      // Software Mastery
      { id: 'closures', categoryId: 'dev-mastery', title: 'Closures', shortDescription: 'Functions that remember their birthplace.', icon: 'Zap', order: 1 },
      { id: 'event-loop', categoryId: 'dev-mastery', title: 'The Event Loop', shortDescription: 'How single-threaded environments handle concurrency.', icon: 'Layers', order: 2 },
      { id: 'recursion', categoryId: 'dev-mastery', title: 'Recursion', shortDescription: 'A function calling itself to break down problems.', icon: 'Terminal', order: 3 },
      { id: 'pointers', categoryId: 'dev-mastery', title: 'Pointers', shortDescription: 'Variables that hold memory addresses.', icon: 'Search', order: 4 },
      { id: 'functional-prog', categoryId: 'dev-mastery', title: 'Functional Programming', shortDescription: 'Using pure functions without side-effects.', icon: 'Code2', order: 5 },
      
      // Math & Physics
      { id: 'relativity', categoryId: 'math-physics', title: 'General Relativity', shortDescription: 'Gravity as the bending of spacetime.', icon: 'Lightbulb', order: 1 },
      { id: 'quantum-ent', categoryId: 'math-physics', title: 'Quantum Entanglement', shortDescription: 'Spooky action at a distance.', icon: 'Zap', order: 2 },
      { id: 'calculus', categoryId: 'math-physics', title: 'Calculus', shortDescription: 'The mathematics of continuous change.', icon: 'Layers', order: 3 },
      { id: 'chaos-theory', categoryId: 'math-physics', title: 'Chaos Theory', shortDescription: 'Sensitive dependence on initial conditions.', icon: 'Terminal', order: 4 },

      // System Architecture
      { id: 'microservices', categoryId: 'sys-design', title: 'Microservices', shortDescription: 'Decoupled systems communicating via APIs.', icon: 'Cpu', order: 1 },
      { id: 'load-balancing', categoryId: 'sys-design', title: 'Load Balancing', shortDescription: 'Distributing traffic to prevent overload.', icon: 'Layers', order: 2 },
      { id: 'event-sourcing', categoryId: 'sys-design', title: 'Event Sourcing', shortDescription: 'Treating structural changes as immutable sequences.', icon: 'Terminal', order: 3 },

      // Cognitive Science
      { id: 'neuroplasticity', categoryId: 'cognitive-sci', title: 'Neuroplasticity', shortDescription: 'The brains ability to reorganize itself.', icon: 'Cpu', order: 1 },
      { id: 'cognitive-bias', categoryId: 'cognitive-sci', title: 'Cognitive Biases', shortDescription: 'Systematic patterns of deviation from norm.', icon: 'Layers', order: 2 },
      { id: 'theory-of-mind', categoryId: 'cognitive-sci', title: 'Theory of Mind', shortDescription: 'Understanding that others have distinct beliefs.', icon: 'Search', order: 3 },

      // Art & History
      { id: 'renaissance', categoryId: 'art-history', title: 'The Renaissance', shortDescription: 'The revival of classical learning.', icon: 'Lightbulb', order: 1 },
      { id: 'impressionism', categoryId: 'art-history', title: 'Impressionism', shortDescription: 'Capturing the feeling of a moment.', icon: 'Zap', order: 2 },
      { id: 'stoicism', categoryId: 'art-history', title: 'Stoicism', shortDescription: 'Ancient philosophy for emotional resilience.', icon: 'Terminal', order: 3 },
    ];

    const cards: IndexCard[] = [
      { 
        id: 'card-ctrl', 
        itemId: 'ctrl-key', 
        explanation: 'The Control key is a modifier key which, when pressed in conjunction with another key, performs a special operation. In the context of "Computer Fluidity", it is your primary tool for rapid execution without leaving the home row.',
        examples: ['CTRL+C: Copy text to clipboard', 'CTRL+V: Paste from clipboard', 'CTRL+Z: Undo last action'],
        walkthrough: ['1. Place your left pinky on the CTRL key.', '2. Press and hold.', '3. Tap the "C" key with your index finger.', '4. Release both. You have copied.'],
        relatedItems: ['The Mouse', 'Keyboard Shortcuts']
      },
      {
        id: 'card-project-nav',
        itemId: 'project-nav',
        explanation: 'The Project Navigator is the primary sidebar in Xcode where you manage your files, resources, and configuration. It is the mental map of your software architecture.',
        examples: ['Finding .swift files', 'Managing Assets.xcassets', 'Organizing folders'],
        walkthrough: ['1. Press CMD+1 to open it instantly.', '2. Use the filter bar at the bottom to find files.', '3. Drag and drop to reorganize.'],
        relatedItems: ['Interface Builder', 'Build Settings']
      }
    ];

    setCategories(cats);
    setItems(its);
    
    // Store cards globally or use a ref if needed, but for now we'll just mock it on fetch
    (window as any).__LIBRARY_CARDS = cards;
    
    setLoading(false);
  }, []);

  const handleItemClick = (item: Item) => {
    const cards = (window as any).__LIBRARY_CARDS || [];
    const card = cards.find((c: any) => c.itemId === item.id);
    
    if (card) {
      onSelectItem(item, card);
    } else {
      const dummyCard: IndexCard = {
        id: `dummy-${item.id}`,
        itemId: item.id,
        explanation: `This is a synthesized explanation for ${item.title}. The essence of this tool has been mapped to existing mental structures.`,
        examples: ['Practical implementation 1', 'Practical implementation 2'],
        walkthrough: ['Step 1: Initiation', 'Step 2: Execution', 'Step 3: Synthesis']
      };
      onSelectItem(item, dummyCard);
    }
  };

  const filteredItems = items.filter(it => 
    (!selectedCategory || it.categoryId === selectedCategory.id) &&
    (it.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     it.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-bg text-ink flex flex-col overflow-hidden"
    >
      {/* Header */}
      <header className="px-6 md:px-12 py-6 border-b border-border flex justify-between items-center bg-surface shrink-0">
        <div className="flex items-center gap-6">
          <button 
            onClick={selectedCategory ? () => setSelectedCategory(null) : onClose}
            className="p-3 hover:bg-ink/5 rounded-full transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col">
            <h2 className="font-display font-black text-3xl uppercase tracking-tighter">
              {selectedCategory ? selectedCategory.name : 'Learning Library'}
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">
              {selectedCategory ? selectedCategory.description : 'Explore structured knowledge nodes'}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 bg-ink/5 px-6 py-3 rounded-2xl border border-ink/10 focus-within:border-accent transition-all">
          <Search size={18} className="opacity-30" />
          <input 
            type="text" 
            placeholder="Search concepts..."
            className="bg-transparent outline-none font-mono text-xs uppercase tracking-widest w-48"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button 
          onClick={onClose}
          className="p-3 hover:bg-ink/5 rounded-full transition-all"
        >
          <X size={24} />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
        <div className="max-w-7xl mx-auto w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-6">
               <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
               <p className="font-mono text-[9px] uppercase tracking-[0.4em] font-bold animate-pulse opacity-40">Syncing Knowledge Nodes...</p>
            </div>
          ) : !selectedCategory && !searchQuery ? (
            /* Category Grid */
            <>
              {categories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((cat, i) => (
                    <button
                      key={`cat-${cat.id || cat.name}`}
                      onClick={() => setSelectedCategory(cat)}
                      className="group flex flex-col p-8 bg-surface border border-border rounded-2xl hover:border-accent/40 hover:shadow-xl transition-all text-left shadow-sm relative overflow-hidden"
                    >
                      <div className="w-12 h-12 bg-accent/5 text-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-bg transition-all">
                        {cat.icon === 'Cpu' ? <Cpu size={24} /> : <Code2 size={24} />}
                      </div>
                      <h3 className="text-xl font-display font-medium tracking-tight mb-2 group-hover:text-accent transition-colors">{cat.name}</h3>
                      <p className="text-ink/60 text-xs leading-relaxed mb-6 line-clamp-2">{cat.description}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-widest opacity-30">
                          {items.filter(it => it.categoryId === cat.id).length} Concepts
                        </span>
                        <ChevronRight size={16} className="opacity-0 group-hover:opacity-40 translate-x-[-8px] group-hover:translate-x-0 transition-all text-accent" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-40 opacity-20 text-center">
                   <BookOpen size={32} className="mb-6" />
                   <h3 className="text-xl font-display font-medium uppercase mb-2">Library Empty</h3>
                   <p className="font-mono text-[9px] uppercase tracking-widest max-w-xs">No structured categories found in the core index.</p>
                </div>
              )}
            </>
          ) : (
            /* Item List */
            <div className="flex flex-col gap-3">
              {filteredItems.map((item, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  key={`item-${item.id}`}
                  onClick={() => handleItemClick(item)}
                  className="group w-full max-w-4xl mx-auto flex items-center p-6 bg-surface border border-border rounded-xl hover:border-accent/40 hover:bg-accent/[0.01] transition-all text-left"
                >
                  <div className="w-12 h-12 bg-accent/5 text-accent rounded-lg flex items-center justify-center mr-6 group-hover:scale-105 transition-transform">
                    {item.icon === 'Zap' ? <Zap size={20} /> : 
                     item.icon === 'Layers' ? <Layers size={20} /> :
                     item.icon === 'Terminal' ? <Terminal size={20} /> :
                     item.icon === 'Search' ? <Search size={20} /> :
                     <Lightbulb size={20} />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-medium tracking-tight group-hover:text-accent transition-colors">{item.title}</h4>
                    <p className="text-ink/40 text-xs mt-0.5">{item.shortDescription}</p>
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all text-accent font-bold mr-6">
                    View
                  </div>
                  <ChevronRight size={20} className="opacity-10 group-hover:opacity-40 group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))}

              {filteredItems.length === 0 && (
                <div className="flex flex-col items-center justify-center py-40 opacity-20">
                  <div className="text-6xl mb-6">🕳️</div>
                  <p className="font-mono text-sm uppercase tracking-widest">No matching concepts found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Global Feedback Floating Button (Internal Library One if preferred, or use the global one) */}
      <div className="fixed bottom-12 right-12">
        <button 
          onClick={showFeedback}
          className="flex items-center gap-3 bg-ink text-bg px-8 py-4 rounded-full font-mono text-[10px] uppercase tracking-[0.3em] font-black hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          <MessageSquare size={16} />
          Submit Feedback
        </button>
      </div>
    </motion.div>
  );
};
