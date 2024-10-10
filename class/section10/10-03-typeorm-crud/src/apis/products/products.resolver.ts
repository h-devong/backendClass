import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService, //
  ) {}
  @Query(() => [Product]) //playground 에서 쿼리에 리턴 타입
  fetchProducts(): Promise<Product[]> {
    return this.productsService.findAll(); //기능 product 전부 보여주기
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') // playground 설명 추가 및 데코레이터
    productId: string, //
  ): Promise<Product> {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') // playground 설명 추가 및 데코레이터
    createProductInput: CreateProductInput, //타입 스크립트 및 playground에 타입 명시
  ): Promise<Product> {
    // << 브라우저에 결과를 보내주는 2가지 방법?>>

    //1. 등록된 내용이 담긴 객체를 그대로 브라우저에 돌려보내주기
    return this.productsService.create({ createProductInput });
    //2. 결과 메시지만 간단히 보내주기
    //return '정상적으로 상품이 등록되었습니다.'
  }
}
