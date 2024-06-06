import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { DatasourceService } from "../datasource/datasource.service";
import { Book } from "../entities/book.entity";
import { Author } from "src/entities/author.entity";
import { CreateBookDto } from "./dto/BookDTO";
import { IncompleteBookDto } from "./dto/incomplete-book.dto";

@Injectable()
export class BooksService {
  constructor(private readonly datasourceService: DatasourceService,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(bookDto: CreateBookDto): Promise<Book>
 {
    const book = this.bookRepository.create();
    book.title = bookDto.title;
    book.genre = bookDto.genre;
    book.yearofpublication = bookDto.yearofpublication;
    const authors = await this.authorRepository.findBy({
      id: In(bookDto.authors),
    });
    book.authors = authors;
    await this.bookRepository.save(book);
    return book;
  }

  async findIncomplete(): Promise<IncompleteBookDto[]> {
    const books = await this.bookRepository.find();
    const incompleteBooks: IncompleteBookDto[] = books.map((book) => {
      const incompleteBook = new IncompleteBookDto();
      incompleteBook.id = book.id;
      incompleteBook.title = book.title;
      incompleteBook.genre = book.genre;
      return incompleteBook;
    });
    return incompleteBooks;
  }

  async findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne({
      where: { id }, //указываем условие поиска по id
      relations: { authors: true, shops: true }, //получаем связанные объекты
    });
  }

  async findAll(): Promise<Book[]> {
    const books = await this.bookRepository.find({
      //получаем связанные объекты
      relations: {
        shops: true,
        authors: true,
      },
    });
    return books;
  }

  async update(id: number, updatedBook: Book) {
    const book = await this.bookRepository.findOne({where: { id } });
    book.title = updatedBook.title;
    book.authors = updatedBook.authors;
    await this.bookRepository.save(book);
    return book;
  }

  remove(id: number) {
    this.bookRepository.delete({ id });
  }
}
