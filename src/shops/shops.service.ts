import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { DatasourceService } from "../datasource/datasource.service";
import { Book } from "../entities/book.entity";
import { Shop } from "src/entities/shop.entity";
import { CreateShopDto } from "./dto/ShopDTO";
import { IncompleteShopDto } from "./dto/incomplete-shop.dto";

@Injectable()
  export class ShopsService {
    constructor(private readonly datasourceService: DatasourceService,
      @InjectRepository(Book)
      private readonly bookRepository: Repository<Book>,
      @InjectRepository(Shop)
      private readonly shopRepository: Repository<Shop>,
    ) {}

    async create(shopDto: CreateShopDto): Promise<Shop>
 {
    const shop = this.shopRepository.create();
    shop.name = shopDto.name;
    shop.city = shopDto.city;
    shop.street = shopDto.street;
    shop.buildingnumber = shopDto.buildingnumber;
    const books = await this.bookRepository.findBy({
      id: In(shopDto.books),
    });
    shop.books = books;
    await this.shopRepository.save(shop);
    return shop;
  }

  async findIncomplete(): Promise<IncompleteShopDto[]> {
    const shops = await this.shopRepository.find();
    const incompleteShops: IncompleteShopDto[] = shops.map((shop) => {
      const incompleteShop = new IncompleteShopDto();
      incompleteShop.id = shop.id;
      incompleteShop.name = shop.name;
      return incompleteShop;
    });
    return incompleteShops;
  }

  async findOne(id: number): Promise<Shop> {
    return this.shopRepository.findOne({
      where: { id }, //указываем условие поиска по id
      relations: { books: true }, //получаем связанные объекты
    });
  }

  async findAll(): Promise<Shop[]> {
    const shops = await this.shopRepository.find({
      //получаем связанные объекты
      relations: {
        books: true,
      },
    });
    return shops;
  }

  async update(id: number, updatedShop: Shop) {
    const shop = await this.shopRepository.findOne({where: { id } });
    shop.name = updatedShop.name;
    shop.books = updatedShop.books;
    await this.shopRepository.save(shop);
    return shop;
  }

  remove(id: number) {
    this.shopRepository.delete({ id });
  }
}