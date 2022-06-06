package com.sapo.mockproject.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sapo.mockproject.domain.Role;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;

@Component
@Getter
@Setter
public class UserDTO extends BaseDTO<Integer> {

    @NotNull(message = "Chưa nhập tên đăng nhập")
    private String username;

    @NotNull(message = "Chưa nhập tên mật khẩu")
    private String password;

    @NotNull(message = "Chưa nhập tên ")
    private String name;

    @NotNull(message = "Chưa nhập số điện thoại")
    private String phoneNumber;

    @NotNull(message = "Chưa nhập địa chỉ")
    private String address;

    private String token;

    private Role role;

    @Override
    public String responseDataName() {
        return "user";
    }

    @JsonIgnore
    @JsonProperty(value = "password")
    public String getPassword() {
        return password;
    }
}
