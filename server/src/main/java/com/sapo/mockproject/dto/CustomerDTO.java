package com.sapo.mockproject.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;

@Component
@Getter
@Setter
public class CustomerDTO extends BaseDTO<Integer>{
    @NotNull(message = "Chưa nhập tên")
    private String name;

    private String code;

    @NotNull(message = "Chưa nhập số điện thoại")
    private String phoneNumber;

    @NotNull(message = "Chưa nhập địa chỉ")
    private String address;

    private String email;

    @NotNull(message = "Chưa chọn nhóm khách hàng")
    private String groupCustomer;

    private String createdBy;

    @Override
    public String responseDataName() {
        return "customer";
    }
}
