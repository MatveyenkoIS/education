import { BooksService } from './books.service';
import { Controller } from '@nestjs/common';
import { Book } from '../entities/book.entity';
import { Get, Param, Body, Put, Post, Delete } from '@nestjs/common';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBook: Book) {
    return this.booksService.update(+id, updateBook);
  }

  @Post()
  create(@Body() createBook: Book) {
    return this.booksService.create(createBook);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}