package com.sapo.mockproject.service.impl;

import com.sapo.mockproject.domain.ERole;
import com.sapo.mockproject.domain.Role;
import com.sapo.mockproject.domain.User;
import com.sapo.mockproject.dto.UserDTO;
import com.sapo.mockproject.exception.InvalidResourceException;
import com.sapo.mockproject.exception.ResourceNotFoundException;
import com.sapo.mockproject.repository.RoleRepository;
import com.sapo.mockproject.repository.UserRepository;
import com.sapo.mockproject.security.jwt.JwtUtils;
import com.sapo.mockproject.service.AuthService;
import com.sapo.mockproject.service.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder encoder;

    private final JwtUtils jwtUtils;

    private final UserMapper userConverter;

    public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder,
                           JwtUtils jwtUtils, UserMapper userConverter) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.userConverter = userConverter;
    }

    @Override
    public UserDTO register(UserDTO userDTO) {
        if (userRepository.existsByUsername(userDTO.getUsername()))
            throw new InvalidResourceException("Tên tài khoản đã được sử dụng");
        User user = userConverter.toEntity(userDTO);
        Optional<Role> role = roleRepository.findByName(ERole.ROLE_ACCOUNTANT);
        if (role.isPresent()) {
            user.setRole(role.get());
            user.setPassword(encoder.encode(userDTO.getPassword()));
            user = userRepository.save(user);
            String token = jwtUtils.generateJwtToken(user.getUsername());
            userDTO = userConverter.toDto(user);
            userDTO.setToken(token);

            return userDTO;
        } else {
            System.out.println("ROLE_ACCOUNTANT doesn't exist in database!");
            throw new ResourceNotFoundException("Có lỗi gì đó");
        }
    }

    @Override
    public UserDTO login(UserDTO userDTO) {
        Optional<User> user = userRepository.findByUsername(userDTO.getUsername());
        if (user.isEmpty())
            throw new ResourceNotFoundException("Tên đăng nhập không tồn tại");
        if (!encoder.matches(userDTO.getPassword(), user.get().getPassword()))
            throw new ResourceNotFoundException("Mật khẩu không chính xác");

        String token = jwtUtils.generateJwtToken(userDTO.getUsername());
        userDTO = userConverter.toDto(user.get());
        userDTO.setToken(token);

        return userDTO;
    }
}