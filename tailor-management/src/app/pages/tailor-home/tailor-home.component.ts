import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsDialogComponent } from '../../components/order-details-dialog/order-details-dialog.component';
import { OrderService } from '../../services/order.service'; // Import the OrderService
import { Order } from '../../models/order.model'; // Import the Order model

@Component({
  selector: 'app-tailor-home',
  templateUrl: './tailor-home.component.html',
  styleUrls: ['./tailor-home.component.css'],
})
export class TailorHomeComponent implements OnInit {
  // Table data source
  dataSource = new MatTableDataSource<Order>();

  // Columns to display in the table
  displayedColumns: string[] = [
    'orderId',
    'customerId',
    'dueDate',
    'status',
    'actions',
  ];

  // Filter fields
  orderIdFilter: string = '';
  customerIdFilter: string = '';
  dueDateFilter: Date | null = null;
  statusFilter: string = '';

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService // Inject the OrderService
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  // Fetch orders for the logged-in tailor
  fetchOrders(): void {
    const tailorId = Number(localStorage.getItem('id')); // Get tailorId from local storage
    if (tailorId) {
      this.orderService.getOrdersByTailorId(tailorId).subscribe(
        (orders: Order[]) => {
          this.dataSource.data = orders; // Set the fetched orders as the table data source
        },
        (error) => {
          console.error('Failed to fetch orders:', error);
        }
      );
    }
  }

  // Apply filters
  applyFilters(): void {
    this.dataSource.data = this.dataSource.data.filter((order) => {
      return (
        (!this.orderIdFilter ||
          order.orderId.toString().includes(this.orderIdFilter)) &&
        (!this.customerIdFilter ||
          order.customerId.toString().includes(this.customerIdFilter)) &&
        (!this.dueDateFilter || order.deliveryDate === this.dueDateFilter.toISOString()) &&
        (!this.statusFilter || order.status === this.statusFilter)
      );
    });
  }

  // Clear filters
  clearFilters(): void {
    this.orderIdFilter = '';
    this.customerIdFilter = '';
    this.dueDateFilter = null;
    this.statusFilter = '';
    this.fetchOrders(); // Reload the original data
  }

  // Update status
  updateStatus(order: Order, newStatus: string): void {
    this.orderService.updateOrderStatus(order.orderId, newStatus).subscribe(
      (updatedOrder: Order) => {
        console.log('Status updated successfully:', updatedOrder);
        // Update the order status in the table
        order.status = updatedOrder.status;
      },
      (error) => {
        console.error('Failed to update status:', error);
      }
    );
  }

  // Open order details dialog
  openOrderDetails(order: Order): void {
    this.dialog.open(OrderDetailsDialogComponent, {
      width: '500px',
      data: order,
    });
  }
}
