package com.tailor.TailorService.controller;

import com.tailor.TailorService.entity.Dress;
import com.tailor.TailorService.entity.Tailor;
import com.tailor.TailorService.service.TailorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tailors")
public class TailorController {

    @Autowired
    private TailorService tailorService;

    // Add a new tailor
    @PostMapping
    public ResponseEntity<Tailor> addTailor(@RequestBody Tailor tailor) {
        return ResponseEntity.ok(tailorService.addTailor(tailor));
    }

    // Get a tailor by ID
    @GetMapping("/{id}")
    public ResponseEntity<Tailor> getTailorById(@PathVariable Long id) {
        Optional<Tailor> tailor = tailorService.getTailorById(id);
        return tailor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all shops
    @GetMapping
    public ResponseEntity<List<Tailor>> getAllShops() {
        return ResponseEntity.ok(tailorService.getAllShops());
    }

    // Get all dresses
    @GetMapping("/dresses")
    public ResponseEntity<List<Dress>> getAllDresses() {
        return ResponseEntity.ok(tailorService.getAllDresses());
    }

    // Get a particular dress by name
    @GetMapping("/dresses/{name}")
    public ResponseEntity<Dress> getDressByName(@PathVariable String name) {
        Optional<Dress> dress = tailorService.getDressByName(name);
        return dress.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get a shop by name
    @GetMapping("/search")
    public ResponseEntity<List<Tailor>> getShopByName(@RequestParam String shopName) {
        return ResponseEntity.ok(tailorService.getShopByName(shopName));
    }

    // Update a tailor
    @PutMapping("/{id}")
    public ResponseEntity<Tailor> updateTailor(@PathVariable Long id, @RequestBody Tailor updatedTailor) {
        try {
            return ResponseEntity.ok(tailorService.updateTailor(id, updatedTailor));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a tailor by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTailor(@PathVariable Long id) {
        tailorService.deleteTailor(id);
        return ResponseEntity.noContent().build();
    }
}
