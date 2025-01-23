import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
selector: 'app-tailor-dashboard',
templateUrl: './tailor-dashboard.component.html',
styleUrls: ['./tailor-dashboard.component.css'],
})
export class TailorDashboardComponent implements OnInit {
// Mock data for dashboard
totalOrders = 120;
completedOrders = 80;
pendingOrders = 30;
rejectedOrders = 10;

// Recent orders
recentOrders = [
{ orderId: 'ORD001', customerName: 'John Doe', status: 'Completed', dueDate: '2023-10-15' },
{ orderId: 'ORD002', customerName: 'Jane Smith', status: 'Pending', dueDate: '2023-10-20' },
{ orderId: 'ORD003', customerName: 'Alice Johnson', status: 'Rejected', dueDate: '2023-10-25' },
];

// Chart data
chartData = {
labels: ['Completed', 'Pending', 'Rejected'],
datasets: [
{
data: [this.completedOrders, this.pendingOrders, this.rejectedOrders],
backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
hoverBackgroundColor: ['#45A049', '#FFB300', '#E53935'],
},
],
};

// Chart options
chartOptions = {
responsive: true,
maintainAspectRatio: false,
};

constructor() {}

  ngOnInit(): void {
    // Initialize the chart
    this.createChart();
  }

  // Function to create the chart
  createChart() {
    const ctx = document.getElementById('ordersChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: this.chartData,
      options: this.chartOptions,
    });
  }
}
