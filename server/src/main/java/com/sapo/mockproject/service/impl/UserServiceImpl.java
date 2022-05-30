package com.sapo.mockproject.service.impl;

import com.sapo.mockproject.domain.ERole;
import com.sapo.mockproject.domain.Role;
import com.sapo.mockproject.domain.User;
import com.sapo.mockproject.dto.UserDTO;
import com.sapo.mockproject.exception.InvalidResourceException;
import com.sapo.mockproject.repository.GenericRepository;
import com.sapo.mockproject.repository.RoleRepository;
import com.sapo.mockproject.repository.UserRepository;
import com.sapo.mockproject.service.mapper.GenericMapper;
import com.sapo.mockproject.service.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserServiceImpl extends BaseServiceImpl<Integer, UserDTO, User> {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userConverter;
    private final PasswordEncoder encoder;

    public UserServiceImpl(GenericRepository<User, Integer> genericRepository, GenericMapper<Integer, UserDTO, User> genericMapper, UserRepository userRepository, RoleRepository roleRepository, UserMapper userConverter, PasswordEncoder encoder) {
        super(genericRepository, genericMapper);
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userConverter = userConverter;
        this.encoder = encoder;
    }

    @Override
    public boolean checkUniqueFields(UserDTO userDTO) {
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent())
            throw new InvalidResourceException("Username already in use!");
        if (userRepository.findByPhoneNumber(userDTO.getPhoneNumber()).isPresent())
            throw new InvalidResourceException("Phone number already in use!");
        return false;
    }
    @Override
    public UserDTO save(UserDTO userDTO) {
        if(checkUniqueFields(userDTO)) return null;
        User user = userConverter.toEntity(userDTO);
        Optional<Role> role = roleRepository.findByName(ERole.ROLE_ACCOUNTANT);
        if (role.isPresent()) {
            user.setRole(role.get());
            user.setPassword(encoder.encode(userDTO.getPassword()));
            user = userRepository.save(user);
            userDTO = userConverter.toDto(user);
            return userDTO;
        }

        return genericMapper.toDto(userRepository.save(genericMapper.toEntity(userDTO)));
    }
    @Override
    public UserDTO update(UserDTO userDTO){
//        if(!(userDTO.getUsername()==null))
//            throw new InvalidResourceException("We don't provide change usename");
        User user = userRepository.getById(userDTO.getId());
        user.setPassword(encoder.encode(userDTO.getPassword()));
        user = userRepository.save(user);
        userDTO = userConverter.toDto(user);
        return genericMapper.toDto(userRepository.save(genericMapper.toEntity(userDTO)));
    }
}
