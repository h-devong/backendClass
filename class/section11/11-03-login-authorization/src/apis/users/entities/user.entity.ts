import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType() //리턴 타입
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String) //비밀번호는 브라우저에 전달하지 않음
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  age: number;
}
