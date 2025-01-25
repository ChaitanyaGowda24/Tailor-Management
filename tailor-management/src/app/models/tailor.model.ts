export class Tailor {
  tailorId?: number; // Optional for registration
  name: string;
  shopName: string;
  location: Location;
  email: string;
  phone: string;
  password: string;
  ordersCount?: number; // Optional for registration
  completed?: number; // Optional for registration
  status?: string; // Optional for registration
  //isDelivery: string;
  dress: Dress[];
  role?: string; // Optional for registration

  constructor(
    name: string,
    shopName: string,
    location: Location,
    email: string,
    phone: string,
    password: string,
    //isDelivery: string,
    dress: Dress[],
    tailorId?: number,
    ordersCount?: number,
    completed?: number,
    status?: string,
    role?: string
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
    //this.isDelivery = isDelivery;
    this.dress = dress;
    this.role = role;
  }
}

export class Location {
  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export class Dress {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

