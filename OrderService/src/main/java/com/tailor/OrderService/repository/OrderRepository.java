package com.tailor.OrderService.repository;

import com.tailor.OrderService.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(Order.Status status);

    List<Order> findByTailorId(Long tailorId);

    List<Order> findByShopName(String shopName);
}
