package com.Tailor.UserService.controller;

import com.Tailor.UserService.dtos.LoginDto;
import com.Tailor.UserService.exceptions.InvalidCredentialsException;
import com.Tailor.UserService.model.LoginRequest;
import com.Tailor.UserService.model.User;
import com.Tailor.UserService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok("Login successful");
        } catch (InvalidCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }



    // Endpoint to register a new user
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user); // Register the user

        // Prepare login details to send to the Login Microservice
        LoginDto loginDto = new LoginDto();
        loginDto.setEmail(registeredUser.getEmail());
        loginDto.setPassword(registeredUser.getPassword());
        loginDto.setRole("CUSTOMER"); // Assuming the role is fixed for tailors

// Send login details to the Login Microservice using WebClient
        String url = "http://localhost:8086/login/saveLoginDetails"; // Ensure the URL is correct
        LoginDto responsee = webClientBuilder.build()
                .post()
                .uri(url)
                .header("Authorization", "Bearer ") // Add token if needed
                .bodyValue(loginDto)
                .retrieve()
                .bodyToMono(LoginDto.class)
                .block();
        return ResponseEntity.ok(registeredUser); // Return the registered user details
    }

    // Endpoint to get user details by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserDetails(@PathVariable Long id) {
        Optional<User> user = userService.getUserDetails(id); // Get user details by ID
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get()); // Return user details if found
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if user not found
        }
    }

    // Get all users
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Update user details
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> user = userService.updateUser(id, updatedUser);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.deleteUser(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
