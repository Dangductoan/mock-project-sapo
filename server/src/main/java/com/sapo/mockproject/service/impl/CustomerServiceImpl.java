package com.sapo.mockproject.service.impl;

import com.sapo.mockproject.domain.Customer;
import com.sapo.mockproject.dto.CustomerDTO;
import com.sapo.mockproject.exception.InvalidResourceException;
import com.sapo.mockproject.repository.CustomerRepository;
import com.sapo.mockproject.repository.GenericRepository;
import com.sapo.mockproject.repository.UserRepository;
import com.sapo.mockproject.service.mapper.CustomerMapper;
import com.sapo.mockproject.service.mapper.GenericMapper;
import com.sapo.mockproject.service.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;

public class CustomerServiceImpl extends BaseServiceImpl<Integer, CustomerDTO, Customer> {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    private final PasswordEncoder encoder;

    private final UserRepository userRepository;

    public CustomerServiceImpl(GenericRepository<Customer, Integer> genericRepository, GenericMapper<Integer, CustomerDTO, Customer> genericMapper, CustomerRepository customerRepository, UserMapper userConverter, UserMapper customerConverter, CustomerMapper customerConverter1, CustomerMapper customerMapper, PasswordEncoder encoder, UserRepository userRepository) {
        super(genericRepository, genericMapper);
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
        this.encoder = encoder;
        this.userRepository = userRepository;
    }

    @Override
    public boolean checkUniqueFields(CustomerDTO customerDTO) {
        if (customerRepository.findByCode(customerDTO.getCode()).isPresent())
            throw new InvalidResourceException("Already have this customer!");
        if (!(userRepository.findById(customerDTO.getUser().getId()).isPresent()))
            throw new InvalidResourceException("Your accountant isn't exist");
        return false;
    }

    @Override
    public CustomerDTO save(CustomerDTO customerDTO) {
        if(checkUniqueFields(customerDTO)) return null;
        Customer customer = customerMapper.toEntity(customerDTO);
        customer.setCode(customerDTO.getCode().toUpperCase());
        customer = customerRepository.save(customer);
        customerDTO = customerMapper.toDto(customer);
        return genericMapper.toDto(customerRepository.save(genericMapper.toEntity(customerDTO)));
    }
    @Override
    public CustomerDTO update(CustomerDTO customerDTO){
        Customer customer = customerRepository.getById(customerDTO.getId());
        customer.setCode(customerDTO.getCode().toUpperCase());
        customer = customerRepository.save(customer);
        customerDTO = customerMapper.toDto(customer);
        return genericMapper.toDto(customerRepository.save(genericMapper.toEntity(customerDTO)));
    }
}




