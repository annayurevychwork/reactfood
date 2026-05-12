export type Nutrition = {
  calories: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  fiber_g?: number;
};

export type Product = {
  id: string;
  title: string;
  description?: string;
  price: number;
  category?: string;
  ingredients?: string[];
  nutrition?: Nutrition;
  weight_g?: number;
};

export type CartItem = { product: Product; quantity: number; };
export type User = { id: string; email: string; name?: string; token?: string };
