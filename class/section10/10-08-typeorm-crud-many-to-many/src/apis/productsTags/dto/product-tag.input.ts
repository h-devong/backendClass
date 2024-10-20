import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductTagInput {
  @Field(() => String)
  name: string;
}
