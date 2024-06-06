import { ApiProperty } from "@nestjs/swagger";
import { Book } from "./book.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('shops')
export class Shop {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'ЧитайГород', description: 'Название магазина' })
  @Column({ unique: true }) //поле должно быть уникальным
  name: string;

  @ApiProperty({ example: 'Москва', description: 'Город магазина' })
  @Column()
  city: string;

  @ApiProperty({ example: 'Профсоюзная', description: 'Улица магазина' })
  @Column()
  street: string;

  @ApiProperty({ example: '56', description: 'Номер строения магазина' })
  @Column()
  buildingnumber: number;
  @ManyToMany((type) => Book, (book) => book.shops)
  @JoinTable({
    name: 'shop_book',
    joinColumn: { name: 'id' },
    inverseJoinColumn: { name: 'id' },
  })
  books: Book[];
}
