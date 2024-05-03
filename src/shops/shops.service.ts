import { Injectable } from "@nestjs/common";
import { DatasourceService } from "../datasource/datasource.service";
import { Shop } from "../entities/shop.entity";
import { HttpStatus } from "@nestjs/common";

@Injectable()
export class ShopsService {
  constructor(private readonly datasourceService: DatasourceService) {}
  create(shop: Shop) {
    this.datasourceService.getShops().push(shop);
    return shop;
  }

  findOne(id: number) {
    return this.datasourceService
      .getShops()
      .find((shop) => shop.id === id);
  }

  findAll(): Shop[] {
    return this.datasourceService.getShops();
  }

  update(id: number, updatedShop: Shop) {
    const index = this.datasourceService
      .getShops()
      .findIndex((shop) => shop.id === id);
    this.datasourceService.getShops()[index] = updatedShop;
    return this.datasourceService.getShops()[index];
  }

  remove(id: number) {
    const index = this.datasourceService
      .getShops()
      .findIndex((shop) => shop.id === id);
    this.datasourceService.getShops().splice(index, 1);
    return HttpStatus.OK;
  }
}