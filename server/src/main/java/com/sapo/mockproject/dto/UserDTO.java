package com.sapo.mockproject.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sapo.mockproject.domain.Role;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class UserDTO extends BaseDTO<Integer> {

    private String username;

    @JsonIgnore
    private String password;

    private String name;

    private Long phoneNumber;

    private String address;

    private String token;

    private Role role;

    @Override
    public String responseDataName() {
        return "user";
    }
}
