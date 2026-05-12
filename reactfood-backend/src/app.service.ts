import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private products = [
    { id: 'p1', title: 'Chicken Caesar Salad', description: 'Grilled chicken, romaine, parmesan, Caesar dressing.', price: 12, category: 'Salads', ingredients: ['chicken','romaine','parmesan','croutons'], nutrition:{calories:420, protein_g:30, carbs_g:12, fat_g:25}, weight_g:350 },
    { id: 'p2', title: 'Classic Beef Burger', description: 'Beef patty, cheddar, lettuce, tomato, house sauce.', price: 14, category: 'Burgers', ingredients:['bun','beef','cheese','lettuce'], nutrition:{calories:750, protein_g:40, carbs_g:55, fat_g:38}, weight_g:300 },
    { id: 'p3', title: 'Margherita Pizza', description: 'Tomato, mozzarella, fresh basil.', price: 11, category: 'Pizza', ingredients:['dough','tomato','mozzarella','basil'], nutrition:{calories:780, protein_g:30, carbs_g:90, fat_g:28}, weight_g:500 },
  ];
  
  private orders: any[] = [];

  getProducts() {
    return this.products;
  }

  createOrder(orderData: any) {
    const newOrder = {
      orderId: Math.random().toString(36).substring(2, 9),
      status: 'success',
      createdAt: new Date().toISOString(),
      customer: orderData.customer,
      items: orderData.items,
      total: orderData.total,
    };
    
    this.orders.push(newOrder);
    console.log('📦 Нове замовлення отримано:', newOrder);
    
    return newOrder;
  }
}