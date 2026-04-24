export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
  order?: number;
}

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
