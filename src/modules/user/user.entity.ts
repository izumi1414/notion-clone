export class User{
  name!: string;
  password!: string;
  email!: string;

  constructor(data: User) {
    Object.assign(this, data)
  }
}