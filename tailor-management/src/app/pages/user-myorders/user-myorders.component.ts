import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'; // Import Chart.js

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
statusOptions: string[] = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

// Orders Data (Mock Data)
orders: any[] = [
{
orderId: '12345',
tailorId: '101',
shopName: 'Tailor Shop A',
orderedOn: new Date('2023-10-01'),
      deliveredOn: new Date('2023-10-10'),
      status: 'Completed',
      dressCategory: 'Suits',
      measurements: { chest: 40, waist: 32, length: 42 },
      design: { neckType: 'Notch Lapel', sleeveType: 'Full Sleeve' },
      price: 2000
    },
    {
      orderId: '67890',
      tailorId: '102',
      shopName: 'Tailor Shop B',
      orderedOn: new Date('2023-10-05'),
      deliveredOn: null,
      status: 'In Progress',
      dressCategory: 'Blouse',
      measurements: { bust: 36, waist: 30, length: 38 },
      design: { sleeveType: 'Half Sleeve', neckline: 'Round Neck' },
      price: 1500
    }
  ];

  // Filtered Orders
  filteredOrders: any[] = this.orders;

  // Order Details Modal
  isOrderDetailsModalOpen: boolean = false;
  selectedOrder: any = null;

  // Dashboard Data
  totalOrders: number = 0;
  statusChart: any;

  ngOnInit(): void {
    this.totalOrders = this.orders.length;
    this.applyFilters();
    this.createStatusChart();
  }

  // Apply Filters
  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      return (
        (!this.filterOrderId || order.orderId.includes(this.filterOrderId)) &&
        (!this.filterStatus || order.status === this.filterStatus) &&
        (!this.filterShopName || order.shopName.toLowerCase().includes(this.filterShopName.toLowerCase())) &&
        (!this.filterTailorId || order.tailorId.includes(this.filterTailorId))
      );
    });
  }

  // Clear Filters
  clearFilters(): void {
    this.filterOrderId = '';
    this.filterStatus = '';
    this.filterShopName = '';
    this.filterTailorId = '';
    this.applyFilters();
  }

  // View Order Details
  viewOrderDetails(order: any): void {
    this.selectedOrder = order;
    this.isOrderDetailsModalOpen = true;
  }

  // Close Order Details Modal
  closeOrderDetailsModal(): void {
    this.isOrderDetailsModalOpen = false;
  }

  // Create Status Chart
  createStatusChart(): void {
    const statusCounts = this.statusOptions.map(status => {
      return this.orders.filter(order => order.status === status).length;
    });

    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;
    this.statusChart = new Chart(ctx, {
      type: 'pie', // You can also use 'bar' for a bar chart
      data: {
        labels: this.statusOptions,
        datasets: [
          {
            label: 'Orders by Status',
            data: statusCounts,
            backgroundColor: [
              '#FF6384', // Pending
              '#36A2EB', // In Progress
              '#4BC0C0', // Completed
              '#FFCE56'  // Cancelled
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Disable aspect ratio to fit the container
      }
    });
  }
}
