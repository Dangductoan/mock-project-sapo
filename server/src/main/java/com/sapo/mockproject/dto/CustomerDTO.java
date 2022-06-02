package com.sapo.mockproject.dto;

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

    private String groupCustomer;

    private String createdBy;

    @Override
    public String responseDataName() {
        return "customer";
    }
}
