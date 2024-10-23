import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productsCategories.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productsSaleslocations.entity';
import { ProductTag } from 'src/apis/productsTags/productsTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  // CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  // UpdateDateColumn,
} from 'typeorm';

@Entity() //mysql
@ObjectType() //graphql
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @JoinColumn() //조인 데코레이터 //mysql
  @OneToOne(() => ProductSaleslocation) //관계 데코레이터 //mysql
  @Field(() => ProductSaleslocation) //graphql 데코레이터
  productsSaleslocation: ProductSaleslocation;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @Field(() => [ProductTag])
  productTags: ProductTag[];

  // @CreateDateColumn() //데이터 등록 시 등록시간 자동을 추가
  // createAt: Date;
  // @UpdateDateColumn() //데이터 수정 시 등록시간 자동을 추가
  // updateAt: Date;
  @DeleteDateColumn() //소프트 삭제 시간 기록을 위함
  deletedAt: Date;
}
