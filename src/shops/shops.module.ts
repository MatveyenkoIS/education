import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Shop } from 'src/entities/shop.entity';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Shop, Book])
  ],
})
export class ShopsModule {}