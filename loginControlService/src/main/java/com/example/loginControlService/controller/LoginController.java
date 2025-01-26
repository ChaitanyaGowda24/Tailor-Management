package com.example.loginControlService.controller;

import com.example.loginControlService.dto.AuthRequest;
import com.example.loginControlService.entity.Login;
import com.example.loginControlService.service.JwtService;
import com.example.loginControlService.service.LoginService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class LoginController {

    @Autowired
    LoginService loginService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/saveLoginDetails")
    public Login saveLoginDetails(@RequestBody  Login login){
        return loginService.saveLoginDetails(login);
    }

    // Login endpoint
    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@Valid @RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
            if (authentication.isAuthenticated()) {
                return jwtService.generateToken(authRequest.getEmail());
            } else {
                throw new UsernameNotFoundException("Invalid user request!");
            }
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("Invalid user request!", e);
        }
    }
}
