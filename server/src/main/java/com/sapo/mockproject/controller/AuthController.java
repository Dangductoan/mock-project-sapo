package com.sapo.mockproject.controller;

import com.sapo.mockproject.dto.UserAuthDTO;
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
    public Map<String, UserDTO> login(@Valid @RequestBody UserAuthDTO userAuthDTO) {
        Map<String, UserDTO> data = new HashMap<>();
        data.put(userAuthDTO.responseDataName(), authService.login(userAuthDTO));
        return data;
    }

    @PostMapping("/signup")
    public Map<String, UserDTO> registerUser(@Valid @RequestBody UserAuthDTO userAuthDTO) {
        Map<String, UserDTO> map = new HashMap<>();
        map.put(userAuthDTO.responseDataName(), authService.register(userAuthDTO));
        return map;
    }
}