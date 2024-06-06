import { ShopsService } from './shops.service';
import { Controller } from '@nestjs/common';
import { Shop } from '../entities/shop.entity';
import { CreateShopDto } from './dto/ShopDTO';
import { Get, Param, Body, Put, Post, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('shops')
@ApiTags ('Магазины')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}
  @ApiOperation({ summary: 'Список магазинов'})
  @Get()
  findAll() {
    return this.shopsService.findAll();
  }

  @ApiOperation({ summary: 'Чтение магазина'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Неполное чтение магазина'})
  @Get('incomplete')
  findIncomplete() {
    this.shopsService.findIncomplete();
  }

  @ApiOperation({ summary: 'Редактирование магазина'})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateShop: Shop) {
    return this.shopsService.update(+id, updateShop);
  }

  @ApiOperation({ summary: 'Создание магазина'})
  @Post()
  create(@Body() createshops: CreateShopDto) {
    return this.shopsService.create(createshops);
  }

  @ApiOperation({ summary: 'Удаление магазина'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopsService.remove(+id);
  }
}
