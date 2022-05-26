package com.sapo.mockproject.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sapo.mockproject.domain.Role;
import org.springframework.stereotype.Component;

@Component
public class UserDTO extends BaseDTO<Integer> {

    private String username;

    @JsonIgnore
    private String password;

    private String name;

    private Long phoneNumber;

    private String address;

    private String token;

    private Role role;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String responseDataName() {
        return "user";
    }
}
