package com.tailor.TailorService.controller;

import com.tailor.TailorService.dtos.LoginDto;
import com.tailor.TailorService.entity.Dress;
import com.tailor.TailorService.entity.LoginRequest;
import com.tailor.TailorService.entity.Tailor;
import com.tailor.TailorService.exception.*;
import com.tailor.TailorService.service.TailorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/tailors")
public class TailorController {

    @Autowired
    private TailorService tailorService;

    @Autowired
    private WebClient.Builder webClientBuilder; // Inject the WebClient bean

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
    public ResponseEntity<Map<String, String>> registerTailor(@RequestBody Tailor tailor) {
        try {

            tailor.setDress(tailor.getDress().stream()
                    .filter(dress -> dress.getPrice() > 0)
                    .collect(Collectors.toList()));

            // Delegate registration to the service layer
            Tailor registeredTailor = tailorService.addTailor(tailor);

            // Prepare login details to send to the Login Microservice
            LoginDto loginDto = new LoginDto();
            loginDto.setId(registeredTailor.getTailorId());
            loginDto.setEmail(registeredTailor.getEmail());
            loginDto.setPassword(registeredTailor.getPassword());
            loginDto.setRole("TAILOR"); // Assuming the role is fixed for tailors

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


            Map<String, String> response = new HashMap<>();
            response.put("message", "Tailor successfully registered");
            response.put("email", tailor.getEmail());
            // Return success response
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (UsernameAlreadyTakenException | InvalidUsernameFormatException |
                 EmailAlreadyExistsException | InvalidEmailFormatException | InvalidPasswordFormatException ex) {
            // Handle validation exceptions and send BAD_REQUEST
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", ex.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            // Handle unexpected errors
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "An unexpected error occurred: " + ex.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
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