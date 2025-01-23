export class User {
  userId: number;
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  createdAt: Date;

  constructor(
    userId: number,
    name: string,
    email: string,
    password: string,
    role: string,
    phoneNumber: string,
    createdAt: Date = new Date()
  ) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.createdAt = createdAt;
  }
}
