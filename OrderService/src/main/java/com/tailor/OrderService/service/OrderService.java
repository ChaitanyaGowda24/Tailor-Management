package com.tailor.OrderService.service;


import com.tailor.OrderService.dtos.CustomerDetailsDTO;
import com.tailor.OrderService.dtos.MeasurementDetailsDTO;
import com.tailor.OrderService.dtos.OrderDetailsDTO;
import com.tailor.OrderService.entity.Order;
import com.tailor.OrderService.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    public CustomerDetailsDTO fetchCustomerDetails(long customerId) {
        String url = "http://localhost:8082/api/users/" + customerId;  // Replace with actual endpoint
        return webClientBuilder.build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(CustomerDetailsDTO.class)
                .block();
    }

    public MeasurementDetailsDTO fetchMeasurementDetails(long measureId) {
        String url = "http://localhost:8083/measurementById/" + measureId;  // Replace with actual endpoint
        return webClientBuilder.build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(MeasurementDetailsDTO.class)
                .block();
    }

    public OrderDetailsDTO getOrderDetailsWithAllInfo(long orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();

            CustomerDetailsDTO customerDetails = fetchCustomerDetails(order.getCustomerId());
            MeasurementDetailsDTO measurementDetails = fetchMeasurementDetails(order.getMeasureId());

            OrderDetailsDTO orderDetailsDTO = new OrderDetailsDTO();
            orderDetailsDTO.setOrderId(order.getOrderId());
            orderDetailsDTO.setCustomerDetails(customerDetails);
            orderDetailsDTO.setMeasurementDetails(measurementDetails);
            orderDetailsDTO.setOrderDate(order.getOrderDate());
            orderDetailsDTO.setDeliveryDate(order.getDeliveryDate());
            orderDetailsDTO.setStatus(order.getStatus());


            return orderDetailsDTO;
        }
        return null;
    }

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

    // Edit (update) order details
    public Order editOrder(long orderId, Order updatedOrder) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (orderOptional.isPresent()) {
            Order existingOrder = orderOptional.get();
            existingOrder.setCustomerId(updatedOrder.getCustomerId());
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

    //Get Order by shopId
    public List<Order> getOrdersByShopId(Long shopId) {
        return orderRepository.findByShopId(shopId);
    }

    public List<Order> getOrdersByTailorId(Long tailorId) {
        return orderRepository.findByTailorId(tailorId);
    }

}
