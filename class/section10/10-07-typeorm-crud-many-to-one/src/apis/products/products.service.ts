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
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) //typeorm
    private readonly productsRepository: Repository<Product>, //typeorm
    private readonly ProductsSaleslocationsService: ProductsSaleslocationsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory'], //join해서 불러오기
    });
  }
  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    // 상품 하나만 등록할 때 사용하는 방법
    // const result = this.productsRepository.save({
    //   ...createProductInput,
    // 하나하나 직접 나열하는 방시
    // name: '마우스',
    // description: 'very good mouse',
    // price: 5000,
    // });
    // return result;

    //2. 상품과 상품거래 위치를 같이 등록하는 방법
    const { productSaleslocation, productCategoryId, ...product } =
      createProductInput;

    const result = await this.ProductsSaleslocationsService.create({
      productSaleslocation,
    }); //서비스를 타고 가야 하는 이융는?
    //  //레파지토리에 직접 접근하면 검증로직을 통일 시킬 수 없음
    console.log(result);
    const result2 = this.productsRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs id 만 넣기
      productCategory: {
        id: productCategoryId,
      },
    });
    return result2;
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

  async delete({ productId }: IProductServiceDelete): Promise<boolean> {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;
    //
    // 2. 소프트 삭제(직접 구현) - isDeleted
    // this.productsRepository.update({ id: productId }, { isDeleted: true });
    //
    // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productsRepository.update({ id: productId }, { deletedAt: new Date()});
    //
    // 4. 소프트 삭제(typeORM 제공)- softRemove
    // this.productsRepository.softRemove({ id: productId }); //단점: id로만 삭제 가능
    //                                                        //장점: 여러 id 한번에 삭제 가능
    //                                                        //     .softRemove([{id: qqq},{id: zzz},{id: aaa},])
    //
    // 5. 소프트 삭제(typeORM 제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId }); //단점: 여러 id 한번에 삭제 불가능
    return result.affected ? true : false; //                                   //장점: 다른 컬럼으로도 삭제 가능
  }
}

interface IProductServiceDelete {
  productId: string;
}
