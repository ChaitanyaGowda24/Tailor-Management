export class User {
  id?: number; // Optional for registration
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role?: string; // Optional for registration

  constructor(
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    id?: number,
    role?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.role = role;
  }
}

export class LoginRequest {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

