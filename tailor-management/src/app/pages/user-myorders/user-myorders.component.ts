import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { OrderService } from 'src/app/services/order.service';
import { Order, CustomerDetails, MeasurementDetails } from '../../models/order.model';

@Component({
  selector: 'app-user-myorders',
  templateUrl: './user-myorders.component.html',
  styleUrls: ['./user-myorders.component.css']
})
export class UserMyordersComponent implements OnInit {
  // Filter Variables
  filterOrderId: string = '';
  filterStatus: string = '';
  filterShopName: string = '';
  filterTailorId: string = '';

  // Status Options for Filter
  statusOptions: string[] = ['PENDING', 'COMPLETED', 'ACCEPTED', 'REJECTED', 'IN_PROGRESS', 'YET_TO_PICK_UP', 'PICKED_UP'];

  // Orders Data
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  orderDetailsMap: Map<number, Order> = new Map();

  // Order Details Modal
  isOrderDetailsModalOpen: boolean = false;
  selectedOrder: Order | null = null;

  // Dashboard Data
  totalOrders: number = 0;
  statusChart: any;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const customerId = localStorage.getItem('id');
    if (customerId) {
      this.loadOrders(+customerId);
    }
  }

  loadOrders(customerId: number): void {
    this.orderService.getOrdersByCustomerId(customerId).subscribe({
      next: (orders) => {
        console.log('Orders from backend:', orders);  // Check if tailorId is here

        this.orders = orders.map(order => ({
          orderId: order.orderId,
          customerId: order.customerId || customerId,
          tailorId: order.tailorId,  // Ensure this field is populated
          status: order.status,
          orderDate: order.orderDate,
          deliveryDate: order.deliveryDate,
          customerDetails: order.customerDetails || {
            userId: customerId,
            name: 'Loading...',
            email: '',
            phoneNumber: '',
            role: '',
            createdAt: '',
            password: ''
          },
          measurementDetails: order.measurementDetails || {
            measurement_id: 0,
            userId: customerId,
            gender: '',
            category: '',
            design: '',
            measurements: '',
            price: 0
          }
        }));

        this.filteredOrders = [...this.orders];
        this.totalOrders = orders.length;
        this.createStatusChart();

        // Load full details for each order
        this.orders.forEach(order => {
          this.loadOrderDetails(order.orderId);
          console.log(order);  // Check if tailorId is being set correctly
        });
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      }
    });
  }


  loadOrderDetails(orderId: number): void {
    this.orderService.getOrderDetails(orderId).subscribe({
      next: (orderDetails) => {
        console.log('Order Details:', orderDetails);  // Check if tailorId is in orderDetails

        // Update both orders and filteredOrders arrays
        const updateOrderInArray = (arr: Order[]) => {
          const index = arr.findIndex(o => o.orderId === orderId);
          if (index !== -1) {
            arr[index] = { ...orderDetails };
          }
        };

        updateOrderInArray(this.orders);
        updateOrderInArray(this.filteredOrders);
        this.orderDetailsMap.set(orderId, orderDetails);
      },
      error: (error) => {
        console.error(`Error loading details for order ${orderId}:`, error);
      }
    });
  }

  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      const orderIdMatch = !this.filterOrderId ||
        order.orderId.toString().includes(this.filterOrderId);

      const statusMatch = !this.filterStatus ||
        order.status === this.filterStatus;

      const tailorIdMatch = !this.filterTailorId ||
        (order.tailorId && order.tailorId.toString().includes(this.filterTailorId));

      const shopNameMatch = !this.filterShopName ||
        (order.customerDetails && order.customerDetails.name.toLowerCase().includes(this.filterShopName.toLowerCase()));

      return orderIdMatch && statusMatch && tailorIdMatch && shopNameMatch;
    });
  }

  clearFilters(): void {
    this.filterOrderId = '';
    this.filterStatus = '';
    this.filterShopName = '';
    this.filterTailorId = '';
    this.filteredOrders = [...this.orders];
  }

  viewOrderDetails(order: Order): void {
    if (this.orderDetailsMap.has(order.orderId)) {
      this.selectedOrder = this.orderDetailsMap.get(order.orderId) || null;
      this.isOrderDetailsModalOpen = true;
    } else {
      this.loadOrderDetails(order.orderId);
      this.selectedOrder = order;
      this.isOrderDetailsModalOpen = true;
    }
  }

  closeOrderDetailsModal(): void {
    this.isOrderDetailsModalOpen = false;
    this.selectedOrder = null;
  }

  createStatusChart(): void {
    const statusCounts = this.statusOptions.map(status =>
      this.orders.filter(order => order.status === status).length
    );

    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;
    if (this.statusChart) {
      this.statusChart.destroy();
    }

    this.statusChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.statusOptions,
        datasets: [{
          label: 'Orders by Status',
          data: statusCounts,
         backgroundColor: [
           '#FF6384', // Pending
           '#36A2EB', // Accepted
           '#4BC0C0', // Completed
           '#FFCE56', // Rejected
           '#FF5733', // In Progress
           '#DAF7A6', // Delivered
           '#900C3F'  // Yet to Pickup
         ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

  ngOnDestroy(): void {
    if (this.statusChart) {
      this.statusChart.destroy();
    }
  }

isStepActive(status: string): boolean {
    if (!this.selectedOrder) return false;

    const statusOrder = [
      'YET_TO_PICK_UP',
      'PICKED_UP',
      'IN_PROGRESS',
      'COMPLETED',
      'DELIVERED',
      'REJECTED'
    ];

    const currentIndex = statusOrder.indexOf(this.selectedOrder.status);
    const stepIndex = statusOrder.indexOf(status);

    return stepIndex <= currentIndex;
  }
}
