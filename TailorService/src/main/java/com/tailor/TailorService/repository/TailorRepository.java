package com.tailor.TailorService.repository;

import com.tailor.TailorService.entity.Tailor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TailorRepository extends JpaRepository<Tailor, Long> {
    List<Tailor> findByShopNameContainingIgnoreCase(String shopName);
}
