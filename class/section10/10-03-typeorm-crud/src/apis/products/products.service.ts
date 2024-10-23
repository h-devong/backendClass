import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {
  IProductsServiceCreate,
  IProductsServiceFindOne,
} from './interfaces/products-service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) //typeorm
    private readonly productsRepository: Repository<Product>, //typeorm
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }
  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      ...createProductInput,
      // 하나하나 직접 나열하는 방시
      // name: '마우스',
      // description: 'very good mouse',
      // price: 5000,
    });
    return result;
    //result 안에는 무엇이 있을까?
    //result = {
    //  id: '134314-324123-4234'
    //  name: 'mouse'
    //  description: 'verygoodmouse'
    // price: 3000
    //}
  }
}
