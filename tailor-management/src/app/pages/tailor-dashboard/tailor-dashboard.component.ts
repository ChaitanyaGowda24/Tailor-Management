import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { OrderService } from '../../services/order.service'; // Import the OrderService
import { Order } from '../../models/order.model'; // Import the Order model

@Component({
  selector: 'app-tailor-dashboard',
  templateUrl: './tailor-dashboard.component.html',
  styleUrls: ['./tailor-dashboard.component.css'],
})
export class TailorDashboardComponent implements OnInit {
  // Dashboard statistics
  totalOrders = 0;
  completedOrders = 0;
  pendingOrders = 0;
  rejectedOrders = 0;
  inProgressOrders = 0;

  // Recent orders
  recentOrders: Order[] = [];

  // Chart data
  chartData = {
    labels: ['Completed', 'Pending', 'Rejected', 'In Progress'],
    datasets: [
      {
        data: [0, 0, 0, 0], // Initialize with zeros
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#2196F3'],
        hoverBackgroundColor: ['#45A049', '#FFB300', '#E53935', '#1E88E5'],
      },
    ],
  };

  // Chart options
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const tailorId = Number(localStorage.getItem('id')); // Get tailorId from local storage
    if (tailorId) {
      this.fetchOrders(tailorId);
    }
  }

  // Fetch orders for the logged-in tailor
  fetchOrders(tailorId: number): void {
    this.orderService.getOrdersByTailorId(tailorId).subscribe(
      (orders: Order[]) => {
        this.recentOrders = orders.slice(0, 5); // Show the 5 most recent orders
        this.calculateStatistics(orders); // Calculate dashboard statistics
        this.updateChartData(); // Update the chart data
        this.createChart(); // Initialize the chart
      },
      (error) => {
        console.error('Failed to fetch orders:', error);
      }
    );
  }

  // Calculate dashboard statistics
  calculateStatistics(orders: Order[]): void {
    this.totalOrders = orders.length;
    this.completedOrders = orders.filter((order) => order.status === 'COMPLETED').length;
    this.pendingOrders = orders.filter((order) => order.status === 'PENDING').length;
    this.rejectedOrders = orders.filter((order) => order.status === 'REJECTED').length;
    this.inProgressOrders = orders.filter((order) => order.status === 'IN_PROGRESS').length;
  }

  // Update the chart data
  updateChartData(): void {
    this.chartData.datasets[0].data = [
      this.completedOrders,
      this.pendingOrders,
      this.rejectedOrders,
      this.inProgressOrders,
    ];
  }

  // Function to create the chart
  createChart(): void {
    const ctx = document.getElementById('ordersChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: this.chartData,
      options: this.chartOptions,
    });
  }
}
