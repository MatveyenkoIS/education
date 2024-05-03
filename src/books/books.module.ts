import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [DatasourceModule],
})
export class BooksModule {}