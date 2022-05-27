package com.sapo.mockproject.dto;

import com.sapo.mockproject.domain.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;

@Component
@Getter
@Setter
public class CustomerDTO extends BaseDTO<Integer>{

    private String name;

    @NotNull
    private String code;

    private String phoneNumber;

    private String address;

    private String email;

    @NotNull
    private User user;

    @Override
    public String responseDataName() {
        return "customer";
    }
}
