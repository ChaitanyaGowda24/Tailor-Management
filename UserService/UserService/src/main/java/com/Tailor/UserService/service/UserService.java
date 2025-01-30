package com.Tailor.UserService.service;

import com.Tailor.UserService.exceptions.*;
import com.Tailor.UserService.model.User;
import com.Tailor.UserService.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    public User loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent() && passwordEncoder.matches(password, userOptional.get().getPassword())) {
            return userOptional.get(); // Login successful
        } else {
            throw new InvalidCredentialsException("Invalid credentials");
        }
    }


    // Register a new user
    public User registerUser(User user) {

        // Check if the username is already taken
        if (userRepository.findByName(user.getName()).isPresent()) {
            throw new UsernameAlreadyTakenException("Username is already taken");
        }

        // Validate username format
        if (!isValidUsername(user.getName())) {
            throw new InvalidUsernameException("Username can only contain letters and numbers");
        }

        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new DuplicateEmailException("Email already exists! Please use a different email.");
        }

        // Validate email format
        if (!isValidEmail(user.getEmail())) {
            throw new InvalidInputException("Invalid email format! Please enter a valid email address.");
        }

        // Validate password strength
        if (!isStrongPassword(user.getPassword())) {
            throw new InvalidInputException(
                    "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one digit."
            );
        }

        logger.info("User successfully registered: {}", user.getEmail());
        user.setRole("CUSTOMER");
        // Send welcome email
        try {
            emailService.sendWelcomeEmail(user.getEmail(), user.getEmail());
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
        }

        return userRepository.save(user); // Save the user to the database
    }

    // Helper method to validate the username format (only alphanumeric characters)
    private boolean isValidUsername(String username) {
        String usernameRegex = "^[a-zA-Z0-9]+$";  // Only letters and numbers
        return username != null && username.matches(usernameRegex);
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

    // Get user details by ID
    public Optional<User> getUserDetails(Long id) {
        return userRepository.findById(id); // Retrieve user details by ID
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Update user details
    public Optional<User> updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setAddress(updatedUser.getAddress());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setRole(updatedUser.getRole());
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            return userRepository.save(existingUser);
        });
    }

    // Delete user by ID
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
