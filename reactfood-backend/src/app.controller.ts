import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('products')
  getProducts() {
    return this.appService.getProducts();
  }

  @Post('orders')
  placeOrder(@Body() body: any) {
    return this.appService.createOrder(body);
  }
}