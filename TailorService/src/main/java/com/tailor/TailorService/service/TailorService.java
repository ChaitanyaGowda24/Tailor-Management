package com.tailor.TailorService.service;

import com.tailor.TailorService.entity.Dress;
import com.tailor.TailorService.entity.LoginRequest;
import com.tailor.TailorService.entity.Tailor;
import com.tailor.TailorService.exception.*;
import com.tailor.TailorService.repository.TailorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TailorService {

    private static final Logger logger = LoggerFactory.getLogger(TailorService.class);

    @Autowired
    private TailorRepository tailorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Tailor loginUser(LoginRequest loginRequest) {
        // Get email and password from loginRequest
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Optional<Tailor> userOptional = tailorRepository.findByEmail(email);

        if (userOptional.isPresent() && passwordEncoder.matches(password, userOptional.get().getPassword())) {
            return userOptional.get(); // Login successful
        } else {
            throw new InvalidCredentialsException("Invalid credentials");
        }
    }



    public Tailor addTailor(Tailor tailor) {


        // Check if the shop name (username) is already taken
        if (tailorRepository.findByShopNameContainingIgnoreCase(tailor.getShopName()).size() > 0) {
            throw new UsernameAlreadyTakenException("Username already taken.");
        }

        // Validate username (only letters and numbers allowed)
        if (!tailor.getName().matches("^[a-zA-Z0-9]+$")) {
            throw new InvalidUsernameFormatException("Username can only contain letters and numbers.");
        }


        // Check if email already exists
        if (tailorRepository.findAll().stream().anyMatch(existingTailor -> existingTailor.getEmail().equalsIgnoreCase(tailor.getEmail()))) {
            throw new EmailAlreadyExistsException("Email already exists! Please use a different email.");
        }

        if (!isValidEmail(tailor.getEmail())) {
            throw new InvalidEmailFormatException("Invalid email format! Please enter a valid email address.");
        }


        // Validate password
        if (!isStrongPassword(tailor.getPassword())) {
            throw new InvalidPasswordFormatException("Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one digit.");
        }

        // Log success message before saving
        logger.info("Tailor successfully registered: {}", tailor.getEmail());

        // Save the tailor if all validations pass
        return tailorRepository.save(tailor);
    }

    // Helper method for password validation
    private boolean isValidPassword(String password) {
        String passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$";
        return password.matches(passwordPattern);
    }

    // Helper method to validate email format using regex
    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return email != null && email.matches(emailRegex);
    }

    // Helper method to validate password strength
    private boolean isStrongPassword(String password) {
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$";
        return password != null && password.matches(passwordRegex);
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

    public Tailor updateTailor(Long tailorId, Tailor updatedTailor) {
        return tailorRepository.findById(tailorId).map(tailor -> {
            // Update basic fields
            tailor.setName(updatedTailor.getName());
            tailor.setShopName(updatedTailor.getShopName());
            tailor.setLocation(updatedTailor.getLocation());
            tailor.setPhone(updatedTailor.getPhone());
            tailor.setEmail(updatedTailor.getEmail());
            tailor.setPassword(updatedTailor.getPassword());
            tailor.setStatus(updatedTailor.getStatus());

            // Update dress collection
            List<Dress> existingDresses = tailor.getDress();
            existingDresses.clear(); // Clear the old collection
            existingDresses.addAll(updatedTailor.getDress()); // Add updated dresses

            return tailorRepository.save(tailor);
        }).orElseThrow(() -> new RuntimeException("Tailor not found with ID: " + tailorId));
    }

    public List<Tailor> getTailorsByDressName(String dressName) {
        return tailorRepository.findTailorsByDressName(dressName);
    }

    public List<Tailor> getTailorsByDressId(Long dressId) {
        return tailorRepository.findTailorsByDressId(dressId);
    }
    // Delete a tailor by ID
    public void deleteTailor(Long tailorId) {
        tailorRepository.deleteById(tailorId);
    }
}
