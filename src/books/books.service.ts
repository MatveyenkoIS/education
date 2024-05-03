import { Injectable } from "@nestjs/common";
import { DatasourceService } from "../datasource/datasource.service";
import { Book } from "../entities/book.entity";
import { HttpStatus } from "@nestjs/common";

@Injectable()
export class BooksService {
  constructor(private readonly datasourceService: DatasourceService) {}
  create(book: Book) {
    this.datasourceService.getBooks().push(book);
    return book;
  }

  findOne(id: number) {
    return this.datasourceService
      .getBooks()
      .find((book) => book.id === id);
  }

  findAll(): Book[] {
    return this.datasourceService.getBooks();
  }

  update(id: number, updatedBook: Book) {
    const index = this.datasourceService
      .getAuthors()
      .findIndex((book) => book.id === id);
    this.datasourceService.getBooks()[index] = updatedBook;
    return this.datasourceService.getBooks()[index];
  }

  remove(id: number) {
    const index = this.datasourceService
      .getBooks()
      .findIndex((book) => book.id === id);
    this.datasourceService.getBooks().splice(index, 1);
    return HttpStatus.OK;
  }
}