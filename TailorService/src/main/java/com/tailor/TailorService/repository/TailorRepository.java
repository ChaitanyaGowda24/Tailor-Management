package com.tailor.TailorService.repository;

import com.tailor.TailorService.entity.Tailor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TailorRepository extends JpaRepository<Tailor, Long> {


    // Search by shopName
    List<Tailor> findByShopNameContainingIgnoreCase(String shopName);

    // Search by name (no need for "username", just use "name")
    Optional<Tailor> findByName(String name);

    // Search by email for login purposes
    Optional<Tailor> findByEmail(String email);

    List<Tailor> findTailorsByDressName(String dressName);

    List<Tailor> findTailorsByDressId(Long dressId);
}
