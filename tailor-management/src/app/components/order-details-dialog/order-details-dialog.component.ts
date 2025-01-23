import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
selector: 'app-order-details-dialog',
template: `
<h2 mat-dialog-title>Order Details</h2>
<mat-dialog-content>
<p><strong>Order ID:</strong> {{ data.orderId }}</p>
<p><strong>Customer ID:</strong> {{ data.customerId }}</p>
<p><strong>Customer Name:</strong> {{ data.customerName }}</p>
<p><strong>Phone:</strong> {{ data.phone }}</p>
<p><strong>Email:</strong> {{ data.email }}</p>
<p><strong>Measurements:</strong> {{ data.measurements }}</p>
<p><strong>Category:</strong> {{ data.category }}</p>
<p><strong>Price:</strong> {{ data.price }}</p>
<p><strong>Design:</strong> {{ data.design }}</p>
<p><strong>Due Date:</strong> {{ data.dueDate | date: 'mediumDate' }}</p>
</mat-dialog-content>
<mat-dialog-actions>
<button mat-button mat-dialog-close>Close</button>
</mat-dialog-actions>
`,
})
export class OrderDetailsDialogComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
