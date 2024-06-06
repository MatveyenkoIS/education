import { Author } from "./author.entity";
import { Shop } from "./shop.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
  
@Entity('books')
export class Book {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Сияние', description: 'Название книги' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Хоррор', description: 'Жанр книги' })
  @Column()
  genre: string;

  @ApiProperty({ example: '1977', description: 'Год публикации книги' })
  @Column()
  yearofpublication: number;
  @ManyToMany((type) => Author, (author) => author.books)
  @JoinTable({
    name: 'book_author',
    joinColumn: { name: 'id' },
    inverseJoinColumn: { name: 'id' },
  })
  authors: Author[];
  @ManyToMany((type) => Author, (author) => author.books)
  @JoinTable({
    name: 'book_shop',
    joinColumn: { name: 'id' },
    inverseJoinColumn: { name: 'id' },
  })
  shops: Shop[];
}
