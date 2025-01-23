export enum Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export class Order {
  orderId: number;
  customerId: number;
  measureId: number;
  tailorId: number;
  shopId: number;
  orderDate: Date;
  deliveryDate: Date;
  status: Status;

  constructor(
    orderId: number,
    customerId: number,
    measureId: number,
    tailorId: number,
    shopId: number,
    orderDate: Date,
    deliveryDate: Date,
    status: Status
  ) {
    this.orderId = orderId;
    this.customerId = customerId;
    this.measureId = measureId;
    this.tailorId = tailorId;
    this.shopId = shopId;
    this.orderDate = orderDate;
    this.deliveryDate = deliveryDate;
    this.status = status;
  }
}
