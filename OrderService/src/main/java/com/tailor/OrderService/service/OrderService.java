package com.tailor.OrderService.service;


import com.tailor.OrderService.entity.Order;
import com.tailor.OrderService.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private com.tailor.OrderService.repository.OrderRepository orderRepository;

    // Create a new order
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    // Get order details by ID
    public Optional<Order> getOrderDetails(long orderId) {
        return orderRepository.findById(orderId);
    }

    // Update order status
    public Order updateOrderStatus(long orderId, Order.Status status) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setStatus(status);
            return orderRepository.save(order);
        }
        return null;
    }

    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get orders by status
    public List<Order> getOrdersByStatus(Order.Status status) {
        return orderRepository.findByStatus(status);
    }

    // Get orders by tailor ID
    public List<Order> getOrdersByTailorId(long tailorId) {
        return orderRepository.findByTailorId(tailorId);
    }

    // Edit (update) order details
    public Order editOrder(long orderId, Order updatedOrder) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order existingOrder = orderOptional.get();
            existingOrder.setCustomerId(updatedOrder.getCustomerId());
            existingOrder.setTailorId(updatedOrder.getTailorId());
            existingOrder.setOrderDate(updatedOrder.getOrderDate());
            existingOrder.setDeliveryDate(updatedOrder.getDeliveryDate());
            existingOrder.setStatus(updatedOrder.getStatus());
            return orderRepository.save(existingOrder);
        }
        return null;
    }

    // Delete order
    public void deleteOrder(long orderId) {
        orderRepository.deleteById(orderId);
    }

}
