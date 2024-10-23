export interface IUsersServiceCreate {
  email: string;
  password: string;
  name: string;
  age: number;
}

export interface IUserServiceFindOneByEmail {
  email: string;
}
