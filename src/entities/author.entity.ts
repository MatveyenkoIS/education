import { Book } from 'src/entities/book.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('authors') //указываем что это не просто клаcс, а сущность в рамках TypeOrm, в БД будет храниться как таблица
export class Author {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn() //колонка - идентификатор, значение генерируется автоматически
  id: number;

  @ApiProperty({ example: 'Стивен', description: 'Имя автора' })
  @Column({}) //колонка таблицы, сюда можно добавить большое количество параметров для БД, например тип, уникальность, триггер и т.д.
  name: string;

  @ApiProperty({ example: 'Эдвин', description: 'Отчество/второе имя автора' })
  @Column ({})
  middlename: string;

  @ApiProperty({ example: 'Кинг', description: 'Фамилия автора' })
  @Column ({})
  surname: string;

  @ApiProperty({ example: 'Хоррор', description: 'Основной жанр автора' })
  @Column()
  maingenre: string;

  @ManyToMany((type) => Book, (book) => book.authors)
  @JoinTable({
    //join таблица с названием author_book
    name: 'author_book',
    joinColumn: { name: 'id' }, //для связи с идентификатором автора
    inverseJoinColumn: { name: 'id' }, //для связи с идентификатором книги
  })
  books: Book [];
}