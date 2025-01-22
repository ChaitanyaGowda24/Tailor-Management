package com.tailor.TailorService.service;

import com.tailor.TailorService.entity.Dress;
import com.tailor.TailorService.entity.Tailor;
import com.tailor.TailorService.repository.TailorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TailorService {

    @Autowired
    private TailorRepository tailorRepository;

    // Add a new tailor
    public Tailor addTailor(Tailor tailor) {
        return tailorRepository.save(tailor);
    }

    // Get a tailor by ID
    public Optional<Tailor> getTailorById(Long tailorId) {
        return tailorRepository.findById(tailorId);
    }

    // Get all shops
    public List<Tailor> getAllShops() {
        return tailorRepository.findAll();
    }

    // Get all dresses
    public List<Dress> getAllDresses() {
        return tailorRepository.findAll().stream()
                .flatMap(tailor -> tailor.getDress().stream())
                .toList();
    }

    // Get a particular dress by name
    public Optional<Dress> getDressByName(String dressName) {
        return tailorRepository.findAll().stream()
                .flatMap(tailor -> tailor.getDress().stream())
                .filter(dress -> dress.getName().equalsIgnoreCase(dressName))
                .findFirst();
    }

    // Get a shop by name
    public List<Tailor> getShopByName(String shopName) {
        return tailorRepository.findByShopNameContainingIgnoreCase(shopName);
    }

    // Update a tailor
    public Tailor updateTailor(Long tailorId, Tailor updatedTailor) {
        return tailorRepository.findById(tailorId).map(tailor -> {
            tailor.setName(updatedTailor.getName());
            tailor.setShopName(updatedTailor.getShopName());
            tailor.setLocation(updatedTailor.getLocation());
            tailor.setPhone(updatedTailor.getPhone());
            tailor.setEmail(updatedTailor.getEmail());
            tailor.setPassword(updatedTailor.getPassword());
            tailor.setStatus(updatedTailor.getStatus());
            tailor.setIsDelivery(updatedTailor.getIsDelivery());
            tailor.setDress(updatedTailor.getDress());
            return tailorRepository.save(tailor);
        }).orElseThrow(() -> new RuntimeException("Tailor not found with ID: " + tailorId));
    }

    // Delete a tailor by ID
    public void deleteTailor(Long tailorId) {
        tailorRepository.deleteById(tailorId);
    }
}
