import { Module } from '@nestjs/common';
import { BoardsModule } from './apis/boards/boards.moudule';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './apis/boards/entities/board.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    BoardsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '8042',
      database: 'myproject',
      entities: [Board],
      synchronize: true,
      logging: true,
    }),
    //ProductsModule,
    //UsersModule,
  ],
})
export class AppModule {}
