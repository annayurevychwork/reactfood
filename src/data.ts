import { Product } from './types';

export const SAMPLE_PRODUCTS: Product[] = [
  { id: 'p1', title: 'Chicken Caesar Salad', description: 'Grilled chicken, romaine, parmesan, Caesar dressing.', price: 12, category: 'Salads', ingredients: ['chicken','romaine','parmesan','croutons'], nutrition:{calories:420, protein_g:30, carbs_g:12, fat_g:25}, weight_g:350 },
  { id: 'p2', title: 'Classic Beef Burger', description: 'Beef patty, cheddar, lettuce, tomato, house sauce.', price: 14, category: 'Burgers', ingredients:['bun','beef','cheese','lettuce'], nutrition:{calories:750, protein_g:40, carbs_g:55, fat_g:38}, weight_g:300 },
  { id: 'p3', title: 'Spaghetti Carbonara', description: 'Spaghetti, pancetta, egg yolk, pecorino.', price: 13, category: 'Pasta', ingredients:['spaghetti','pancetta','egg','cheese'], nutrition:{calories:640, protein_g:25, carbs_g:80, fat_g:22}, weight_g:320 },
  { id: 'p4', title: 'Margherita Pizza', description: 'Tomato, mozzarella, fresh basil.', price: 11, category: 'Pizza', ingredients:['dough','tomato','mozzarella','basil'], nutrition:{calories:780, protein_g:30, carbs_g:90, fat_g:28}, weight_g:500 },
  { id: 'p5', title: 'Grilled Salmon', description: 'Salmon fillet, lemon butter, seasonal greens.', price: 18, category: 'Main', ingredients:['salmon','lemon','butter','greens'], nutrition:{calories:520, protein_g:38, carbs_g:6, fat_g:36}, weight_g:280 },
  { id: 'p6', title: 'Vegetable Stir Fry', description: 'Mixed veggies, soy glaze, sesame seeds.', price: 10, category: 'Vegan', ingredients:['broccoli','carrot','pepper','soy sauce'], nutrition:{calories:340, protein_g:8, carbs_g:45, fat_g:10}, weight_g:300 },
  { id: 'p7', title: 'Chicken Tacos', description: 'Soft tortillas, shredded chicken, pico de gallo.', price: 9, category: 'Street Food', ingredients:['tortilla','chicken','onion','cilantro'], nutrition:{calories:460, protein_g:28, carbs_g:48, fat_g:12}, weight_g:220 },
  { id: 'p8', title: 'Greek Salad', description: 'Tomato, cucumber, olives, feta, oregano.', price: 8, category: 'Salads', ingredients:['tomato','cucumber','olives','feta'], nutrition:{calories:280, protein_g:7, carbs_g:10, fat_g:22}, weight_g:250 },
  { id: 'p9', title: 'Beef Pho', description: 'Aromatic broth, rice noodles, thin-sliced beef.', price: 12, category: 'Soups', ingredients:['beef','noodles','herbs','broth'], nutrition:{calories:560, protein_g:32, carbs_g:70, fat_g:14}, weight_g:450 },
  { id: 'p10', title: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center.', price: 7, category: 'Dessert', ingredients:['chocolate','flour','egg','butter'], nutrition:{calories:420, protein_g:6, carbs_g:50, fat_g:22}, weight_g:150 },
];
