package com.sapo.mockproject.dto;

import javax.validation.constraints.NotNull;

public class UserAuthDTO extends UserDTO {

    @NotNull
    private String username;

    @NotNull
    private String password;

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }
}
