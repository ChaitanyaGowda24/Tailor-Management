import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsDialogComponent } from '../../components/order-details-dialog/order-details-dialog.component';
export interface Order {
orderId: string;
customerId: string;
dueDate: Date;
status: string;
customerName?: string;
phone?: string;
email?: string;
measurements?: string;
category?: string;
price?: number;
design?: string;
}

@Component({
selector: 'app-tailor-home',
templateUrl: './tailor-home.component.html',
styleUrls: ['./tailor-home.component.css'],
})
export class TailorHomeComponent implements OnInit {
// Sample data for orders
orders: Order[] = [
{
orderId: 'ORD001',
customerId: 'CUST001',
dueDate: new Date('2023-10-15'),
      status: 'Pending',
      customerName: 'John Doe',
      phone: '123-456-7890',
      email: 'john@example.com',
      measurements: 'Chest: 40, Waist: 32',
      category: 'Shirt',
      price: 50,
      design: 'Casual',
    },
    {
      orderId: 'ORD002',
      customerId: 'CUST002',
      dueDate: new Date('2023-10-20'),
      status: 'Accepted',
      customerName: 'Jane Smith',
      phone: '987-654-3210',
      email: 'jane@example.com',
      measurements: 'Chest: 38, Waist: 30',
      category: 'Dress',
      price: 80,
      design: 'Formal',
    },
  ];

  // Table data source
  dataSource = new MatTableDataSource<Order>(this.orders);

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

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  // Apply filters
  applyFilters() {
    this.dataSource.data = this.orders.filter((order) => {
      return (
        (!this.orderIdFilter ||
          order.orderId
            .toLowerCase()
            .includes(this.orderIdFilter.toLowerCase())) &&
        (!this.customerIdFilter ||
          order.customerId
            .toLowerCase()
            .includes(this.customerIdFilter.toLowerCase())) &&
        (!this.dueDateFilter || order.dueDate === this.dueDateFilter) &&
        (!this.statusFilter || order.status === this.statusFilter)
      );
    });
  }

  // Clear filters
  clearFilters() {
    this.orderIdFilter = '';
    this.customerIdFilter = '';
    this.dueDateFilter = null;
    this.statusFilter = '';
    this.applyFilters();
  }

  // Update status
  updateStatus(order: Order, newStatus: string) {
    order.status = newStatus;
    // Call API to update status in the backend
    console.log('Updated Status:', order);
  }

  // Open order details dialog
  openOrderDetails(order: Order) {
    this.dialog.open(OrderDetailsDialogComponent, {
      width: '500px',
      data: order,
    });
  }
}
