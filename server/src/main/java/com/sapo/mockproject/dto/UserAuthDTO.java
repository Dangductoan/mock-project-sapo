package com.sapo.mockproject.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UserAuthDTO extends UserDTO {

    @NotNull
    private String username;

    @NotNull
    private String password;

}
