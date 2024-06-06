import { Module } from '@nestjs/common';
import { AuthorsService } from './author.service';
import { AuthorsController } from './authors.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/entities/author.entity';
import { Book } from 'src/entities/book.entity';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Author, Book]),
  ],
})
export class AuthorsModule {}

