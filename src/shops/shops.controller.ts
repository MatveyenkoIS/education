import { ShopsService } from './shops.service';
import { Controller } from '@nestjs/common';
import { Shop } from '../entities/shop.entity';
import { Get, Param, Body, Put, Post, Delete } from '@nestjs/common';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}
  @Get()
  findAll() {
    return this.shopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateShop: Shop) {
    return this.shopsService.update(+id, updateShop);
  }

  @Post()
  create(@Body() createShop: Shop) {
    return this.shopsService.create(createShop);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopsService.remove(+id);
  }
}
