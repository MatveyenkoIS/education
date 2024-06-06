import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/entities/author.entity';
import { Book } from 'src/entities/book.entity';
import { Shop } from 'src/entities/shop.entity';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Book, Author, Shop]),
  ],
})
export class BooksModule {}