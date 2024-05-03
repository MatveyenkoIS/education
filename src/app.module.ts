import { Module } from '@nestjs/common';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { ShopsModule } from './shops/shops.module';
import { DatasourceModule } from './datasource/datasource.module';

@Module({
  imports: [AuthorsModule, BooksModule, ShopsModule, DatasourceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}


