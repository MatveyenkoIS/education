import { ApiProperty } from "@nestjs/swagger";

export class CreateShopDto {
    @ApiProperty({ example: 'Лабиринт', description: 'Название магазина' })
    name: string;

    @ApiProperty({ example: 'Москва', description: 'Город магазина' })
    city: string;

    @ApiProperty({ example: 'Ленинский проспект', description: 'Улица магазина' })
    street: string;

    @ApiProperty({ example: '62', description: 'Номер строения магазина' })
    buildingnumber: number;

    @ApiProperty({ example: [1, 5], description: 'Список идентификаторов книг' })
    books: number [];
  }