import { AuthorsService } from './author.service';
import { Controller } from '@nestjs/common';
import { Author } from '../entities/author.entity';
import { CreateAuthorDto } from './dto/AuthorDTO';
import { Get, Param, Body, Put, Post, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('authors')
@ApiTags('Авторы')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}
  @ApiOperation({summary: 'Список авторов'})
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @ApiOperation({summary: 'Чтение автора'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @ApiOperation({summary: 'Неполное чтение автора'})
  @Get('incomplete')
  findIncomplete() {
    this.authorsService.findIncomplete();
  }
  
  @ApiOperation({summary: 'Редактирование автора'})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAuthor: Author) {
    return this.authorsService.update(+id, updateAuthor);
  }

  @ApiOperation({summary: 'Создание автора'})
  @Post()
  create(@Body() createauthors: CreateAuthorDto) {
    return this.authorsService.create(createauthors);
  }
  
  @ApiOperation({summary: 'Удаление автора'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
