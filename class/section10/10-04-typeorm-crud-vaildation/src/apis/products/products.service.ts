import {
  // HttpException,
  // HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {
  IProductServiceCheckSoldout,
  IProductServiceUpdate,
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

  async update({
    productId,
    updateProductInput,
  }: IProductServiceUpdate): Promise<Product> {
    //
    //기존 있는 내용을 재사용하여 , 로직을 통일 하자
    const product = await this.findOne({ productId });

    this.checkSoldout({ product });
    // this.productsRepository.create() // DB 접속이랑 관련 없음 ㅈㄴ 필요 없음
    // this.productsRepository.insert() // 결과를 객체로 못 돌려 받는 방법
    // this.productsRepository.update() // 결곽를 객체로 못 돌려 받는 수정 방법

    const result = this.productsRepository.save({
      // id: product.id, //id가 있으면 수정 없으면 등록으로 작동함
      // isSoldout: product.isSoldout,
      // createAt: product.createAt,
      // name: product.name,

      // name: updateProductInput.name,
      // price: updateProductInput.price,
      // description: updateProductInput.description,

      ...product, //원래 있던 내용으로 저장
      // 수정 후, 수정 되지 않은 다른 결과값까지 모두 객체로 돌려 받고 싶을때
      ...updateProductInput, // 업데이트 된 부분을 덮어 쓰기로 저장 즉 업데이트 됨
    });
    return result;
  }

  //checkSoldout을 함수로 만드는 이유 => 수정시, 삭제시 등 같은 검증 로직 사용
  checkSoldout({ product }: IProductServiceCheckSoldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다');
    }
    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   ); //예외 처리
    // }
  }
}
