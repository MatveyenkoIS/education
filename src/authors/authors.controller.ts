import { AuthorsService } from './author.service';
import { Controller } from '@nestjs/common';
import { Author } from '../entities/author.entity';
import { Get, Param, Body, Put, Post, Delete } from '@nestjs/common';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAuthor: Author) {
    return this.authorsService.update(+id, updateAuthor);
  }

  @Post()
  create(@Body() createAuthor: Author) {
    return this.authorsService.create(createAuthor);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
