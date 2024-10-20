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
import { ProductsTagsService } from '../productsTags/products.Tags.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) //typeorm
    private readonly productsRepository: Repository<Product>, //typeorm
    private readonly productsSaleslocationsService: ProductsSaleslocationsService,
    private readonly productsTagsService: ProductsTagsService,
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
    //2. 상품과 상품거래 위치를 같이 등록하는 방법
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;
    //2-1 상품 거래위치 등록
    const result = await this.productsSaleslocationsService.create({
      productSaleslocation,
    }); //서비스를 타고 가야 하는 이융는?
    //2-2 상품태그 등록
    //productTags가 ["#전자제품","#영등포","컴퓨터"]와 같은 패턴
    const tagNames = productTags.map((el) => el.name.replace('#', ''));
    const prevTags = await this.productsTagsService.findByNames({ tagNames });
    const temp = [];

    tagNames.forEach((el) => {
      const isExists = prevTags.find((prevEl) => el === prevEl.name); // prevEl ? 전자제품
      if (!isExists) temp.push({ name: el }); //prevTags 즉 이미 있는 tag들은 제외하고 새로운 tag들만 temp에 저장
    });

    const newTags = await this.productsTagsService.bulkIntsert({ names: temp });

    const tags = [...prevTags, ...newTags.identifiers]; //원래 있던 태그들과 새로운 태그를 합쳐서 등록
    // newTags.identifiers id만 가져오기
    //레파지토리에 직접 접근하면 검증로직을 통일 시킬 수 없음
    console.log(result);
    const result2 = this.productsRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs id 만 넣기
      productCategory: {
        id: productCategoryId,
      },
      productTags: tags,
    });
    return result2;
  }

  //숙제-1) 왜 아래가 에러가 발생하는지
  //숙제-2) 아래 해결
  async update({
    productId,
    updateProductInput,
  }: IProductServiceUpdate): Promise<Product> {
    //
    //기존 있는 내용을 재사용하여 , 로직을 통일 하자
    const product = await this.findOne({ productId });

    this.checkSoldout({ product });

    const result = this.productsRepository.save({
      ...product, //원래 있던 내용으로 저장
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
