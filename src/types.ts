export interface Item {
  id: string;
  categoryId: string;
  title: string;
  shortDescription: string;
  icon?: string;
  order?: number;
}

export interface IndexCard {
  id: string;
  itemId: string;
  explanation: string;
  examples: string[];
  walkthrough?: string[];
  relatedItems?: string[];
  whyItMatters?: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  preferredLearningStyle?: string;
  createdAt: any;
  lastActive: any;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
  order: number;
}

export interface Concept {
  id: string;
  title: string;
  normalizedTitle: string;
  categoryId?: string;
  tags: string[];
  rank: number;
  explanationCount: number;
  lastExplanation?: any;
  createdAt: any;
  updatedAt: any;
}

export interface Explanation {
  id: string;
  conceptId: string;
  userId?: string;
  payload: any;
  learningStyle: string;
  votes: {
    ups: number;
    downs: number;
  };
  isPublic: boolean;
  createdAt: any;
}

export interface UserVaultItem {
  id: string;
  userId: string;
  conceptId: string;
  explanationId: string;
  conceptTitle: string;
  savedAt: any;
  notes?: string;
}
