import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { DatasourceService } from "../datasource/datasource.service";
import { Book } from "../entities/book.entity";
import { Author } from "src/entities/author.entity";
import { CreateAuthorDto } from "./dto/AuthorDTO";
import { IncompleteAuthorDto } from "./dto/incomplete-author.dto";

@Injectable()
export class AuthorsService {
  constructor(private readonly datasourceService: DatasourceService,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(authorDto: CreateAuthorDto): Promise<Author>
  {
     const author = this.authorRepository.create();
     author.name = authorDto.name;
     author.middlename = authorDto.middlename;
     author.surname  = authorDto.surname;
     author.maingenre = authorDto.maingenre;
     const books = await this.bookRepository.findBy({
       id: In(authorDto.books),
     });
     author.books = books;
     await this.authorRepository.save(author);
     return author;
   }

   async findIncomplete(): Promise<IncompleteAuthorDto[]> {
    const authors = await this.authorRepository.find();
    const incompleteAuthors: IncompleteAuthorDto[] = authors.map((author) => {
      const incompleteAuthor = new IncompleteAuthorDto();
      incompleteAuthor.id = author.id;
      incompleteAuthor.name = author.name;
      incompleteAuthor.surname = author.surname;
      incompleteAuthor.maingenre = author.maingenre;
      return incompleteAuthor;
    });
    return incompleteAuthors;
  }

  async findOne(id: number): Promise<Author> {
    return this.authorRepository.findOne({
      where: { id }, //указываем условие поиска по id
      relations: { books: true }, //получаем связанные объекты
    });
  }

  async findAll(): Promise<Author[]> {
    const authors = await this.authorRepository.find({
      //получаем связанные объекты
      relations: {
        books: true,
      },
    });
    return authors;
  }

  async update(id: number, updatedAuthor: Author) {
    const author = await this.authorRepository.findOne({where: { id } });
    author.name = updatedAuthor.name;
    author.books = updatedAuthor.books;
    await this.authorRepository.save(author);
    return author;
  }

  remove(id: number) {
    this.authorRepository.delete({ id });
  }
}
