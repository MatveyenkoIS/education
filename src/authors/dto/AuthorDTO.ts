import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthorDto {
    @ApiProperty({ example: 'Роберт', description: 'Имя автора' })
    name: string;

    @ApiProperty({ example: 'Льюис', description: 'Отчество/второе имя автора' })
    middlename: string;

    @ApiProperty({ example: 'Стивенсон', description: 'Фамилия автора' })
    surname: string;

    @ApiProperty({ example: 'Приключенческий роман', description: 'Основной жанр автора' })
    maingenre: string;

    @ApiProperty({ example: [2, 6], description: 'Список идентификаторов книг автора' })
    books: number[];
}