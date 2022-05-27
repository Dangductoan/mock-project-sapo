package com.sapo.mockproject.controller;

import com.sapo.mockproject.dto.UserDTO;
import com.sapo.mockproject.service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public Map<String, UserDTO> login(@Valid @RequestBody UserDTO userDTO) {
        Map<String, UserDTO> data = new HashMap<>();
        data.put(userDTO.responseDataName(), authService.login(userDTO));
        return data;
    }

    @PostMapping("/signup")
    public Map<String, UserDTO> registerUser(@Valid @RequestBody UserDTO userDTO) {
        Map<String, UserDTO> map = new HashMap<>();
        map.put(userDTO.responseDataName(), authService.register(userDTO));
        return map;
    }
}