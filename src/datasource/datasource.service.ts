import { Injectable } from '@nestjs/common';
import { Author } from '../entities/author.entity';
import { Book } from '../entities/book.entity';
import { Shop } from '../entities/shop.entity';

@Injectable()
export class DatasourceService {
  private authors: Author[] = [];
  private books: Book[] = [];
  private shops: Shop[] = [];

  getAuthors(): Author[] {
    return this.authors;
  }

  getBooks(): Book[] {
    return this.books;
  }

  getShops(): Shop[] {
    return this.shops;
  }
}
