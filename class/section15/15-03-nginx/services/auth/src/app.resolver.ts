import { Mutation, Query, Resolver } from '@nestjs/graphql';
// import { AppService } from './app.service';

@Resolver()
export class AppResolever {
  // constructor(private readonly appService) {}

  @Mutation(() => String)
  login() {
    return 'accessToken';
  }

  @Query(() => String)
  aaa() {
    return 'aaa';
  }
}
