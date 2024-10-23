import { Module } from '@nestjs/common';
import { BoardsModule } from './apis/boards/boards.moudule';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    BoardsModule,
    //ProductsModule,
    //UsersModule,
  ],
})
export class AppModule {}
