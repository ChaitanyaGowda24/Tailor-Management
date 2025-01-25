package com.tailor.TailorService.controller;

import com.tailor.TailorService.entity.Dress;
import com.tailor.TailorService.entity.LoginRequest;
import com.tailor.TailorService.entity.Tailor;
import com.tailor.TailorService.exception.*;
import com.tailor.TailorService.service.TailorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tailors")
public class TailorController {

    @Autowired
    private TailorService tailorService;

    // Login for a tailor
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Tailor tailor = tailorService.loginUser(loginRequest);
            return ResponseEntity.ok(tailor);  // Return the tailor data
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


    @PostMapping("/register")
    public ResponseEntity<String> registerTailor(@RequestBody Tailor tailor) {
        try {
            // Delegate registration to the service layer
            Tailor registeredTailor = tailorService.addTailor(tailor);
            // Return success response
            return new ResponseEntity<>("Tailor successfully registered: " + registeredTailor.getEmail(), HttpStatus.CREATED);
        } catch (UsernameAlreadyTakenException | InvalidUsernameFormatException |
                 EmailAlreadyExistsException | InvalidEmailFormatException | InvalidPasswordFormatException ex) {
            // Handle validation exceptions and send BAD_REQUEST
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            // Handle unexpected errors
            return new ResponseEntity<>("An unexpected error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
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