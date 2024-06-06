import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
    @ApiProperty({ example: 'Остров сокровищ', description: 'Название книги' })
    title: string;

    @ApiProperty({ example: 'Приключенческий роман', description: 'Жанр книги' })
    genre: string;

    @ApiProperty({ example: '1883', description: 'Год публикации книги' })
    yearofpublication: number;

    @ApiProperty({ example: [1, 4], description: 'Список идентификаторов авторов книги/идентификатор автора книги' })
    authors: number[];
  }