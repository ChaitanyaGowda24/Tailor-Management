export class Tailor {
  tailorId: number;
  name: string;
  shopName: string;
  location: Location;
  email: string;
  phone: string;
  password: string;
  ordersCount: number;
  completed: number;
  status: string;
  isDelivery: string;
  dress: Dress[];
  role: string;

  constructor(
    tailorId: number,
    name: string,
    shopName: string,
    location: Location,
    email: string,
    phone: string,
    password: string,
    ordersCount: number,
    completed: number,
    status: string,
    isDelivery: string,
    dress: Dress[],
    role: string = 'TAILOR'
  ) {
    this.tailorId = tailorId;
    this.name = name;
    this.shopName = shopName;
    this.location = location;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.ordersCount = ordersCount;
    this.completed = completed;
    this.status = status;
    this.isDelivery = isDelivery;
    this.dress = dress;
    this.role = role;
  }
}
