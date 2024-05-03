import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  imports: [DatasourceModule],
})
export class ShopsModule {}