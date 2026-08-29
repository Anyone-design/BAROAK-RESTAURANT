export type DietaryType = 'veg' | 'non-veg' | 'chef-special' | 'spicy' | 'contains-alcohol' | 'gluten-free';

export interface MenuCategory {
  id: string;
  name: string;
  tagline: string;
  icon: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  dietary: DietaryType[];
  flavorProfile: string[];
  ingredients: string[];
  pairing: string;
  badge?: string;
  image: string;
}

export interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
}
