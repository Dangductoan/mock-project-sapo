package com.sapo.mockproject.service;

import com.sapo.mockproject.dto.UserDTO;

public interface AuthService {

    UserDTO register(UserDTO userDTO);

    UserDTO login(UserDTO userDTO);
}
