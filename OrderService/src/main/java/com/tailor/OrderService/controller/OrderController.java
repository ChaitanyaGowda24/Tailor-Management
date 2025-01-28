package com.tailor.OrderService.controller;

import com.tailor.OrderService.dtos.OrderDetailsDTO;
import com.tailor.OrderService.entity.Order;
import com.tailor.OrderService.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Endpoint to place a new order
    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
        Order createdOrder = orderService.createOrder(order);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    // Endpoint to get order details by ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderDetails(@PathVariable int id) {
        Optional<Order> order = orderService.getOrderDetails(id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update order status
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable("id") int orderId, @RequestBody Order.Status status) {
        Order updatedOrder = orderService.updateOrderStatus(orderId, status);
        return updatedOrder != null ? ResponseEntity.ok(updatedOrder) : ResponseEntity.notFound().build();
    }

    // Get all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // Get orders by status
    @GetMapping("/status/{status}")
    public List<Order> getOrdersByStatus(@PathVariable("status") Order.Status status) {
        return orderService.getOrdersByStatus(status);
    }

    // Endpoint to fetch orders by shop ID
    @GetMapping("/shop/{shopName}")
    public ResponseEntity<List<Order>> getOrdersByShopName(@PathVariable("shopName") String shopName) {
        List<Order> orders = orderService.getOrdersByShopName(shopName);
        return ResponseEntity.ok(orders);
    }

    // Endpoint to fetch orders by shop ID
    @GetMapping("/tailor/{tailorId}")
    public ResponseEntity<List<Order>> getOrdersByTailorId(@PathVariable("tailorId") Long tailorId) {
        List<Order> orders = orderService.getOrdersByTailorId(tailorId);
        return ResponseEntity.ok(orders);
    }


    // Edit order
    @PutMapping("/{id}")
    public ResponseEntity<Order> editOrder(@PathVariable("id") int orderId, @RequestBody Order updatedOrder) {
        Order editedOrder = orderService.editOrder(orderId, updatedOrder);
        return editedOrder != null ? ResponseEntity.ok(editedOrder) : ResponseEntity.notFound().build();
    }

    // Delete order
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable("id") int orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<OrderDetailsDTO> getOrderDetailsWithAllInfo(@PathVariable long id) {
        OrderDetailsDTO orderDetails = orderService.getOrderDetailsWithAllInfo(id);
        if (orderDetails != null) {
            return ResponseEntity.ok(orderDetails);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to fetch orders by shop ID
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Order>> getOrdersByCustomerId(@PathVariable("customerId") Long customerId) {
        List<Order> orders = orderService.getOrdersByCustomerId(customerId);
        return ResponseEntity.ok(orders);
    }
}
