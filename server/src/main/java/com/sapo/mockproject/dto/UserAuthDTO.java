package com.sapo.mockproject.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UserAuthDTO extends BaseDTO<Integer> {
    @NotNull(message = "Chưa nhập tên đăng nhập")
    private String username;

    @NotNull(message = "Chưa nhập tên mật khẩu")
    private String password;

    @Override
    public String responseDataName() {
        return "user";
    }
}
