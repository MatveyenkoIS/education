import { BooksService } from './books.service';
import { Controller } from '@nestjs/common';
import { Book } from '../entities/book.entity';
import { Get, Param, Body, Put, Post, Delete } from '@nestjs/common';
import { CreateBookDto } from './dto/BookDTO';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('books')
@ApiTags ('Книги')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @ApiOperation({ summary: 'Список книг'})
  @Get()
  findAll() {
    return this.booksService.findAll();
  }
  
  @ApiOperation({ summary: 'Чтение книги'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @ApiOperation({ summary: 'Неполное чтение книги'})
  @Get('incomplete')
  findIncomplete() {
    this.booksService.findIncomplete();
  }

  @ApiOperation({ summary: 'Редактирование книги'})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBook: Book) {
    return this.booksService.update(+id, updateBook);
  }

  @ApiOperation({ summary: 'Создание книги'})
  @Post()
  create(@Body() createbooks: CreateBookDto) {
    return this.booksService.create(createbooks);
  }
  
  @ApiOperation({ summary: 'Удаление книги'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}