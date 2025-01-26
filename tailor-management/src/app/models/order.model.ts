export interface Order {
  orderId: number;
  customerId: number;
  measureId: number;
  tailorId: number;
  shopId: number;
  orderDate: string;
  deliveryDate: string;
  status: string; // PENDING, COMPLETED, IN_PROGRESS, REJECTED
}
