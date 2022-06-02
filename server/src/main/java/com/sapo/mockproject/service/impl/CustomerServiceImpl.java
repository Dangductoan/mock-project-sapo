package com.sapo.mockproject.service.impl;

import com.sapo.mockproject.domain.Customer;
import com.sapo.mockproject.domain.User;
import com.sapo.mockproject.dto.CustomerDTO;
import com.sapo.mockproject.exception.InvalidResourceException;
import com.sapo.mockproject.repository.CustomerRepository;
import com.sapo.mockproject.repository.GenericRepository;
import com.sapo.mockproject.repository.UserRepository;
import com.sapo.mockproject.service.mapper.CustomerMapper;
import com.sapo.mockproject.service.mapper.GenericMapper;
import com.sapo.mockproject.service.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
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
//        if (userRepository.findByName(customerDTO.getCreatedBy()).isPresent())
//            throw new InvalidResourceException("Name accountant isn't exist");
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
        if(!(customerDTO.getName()== null))
            customer.setName(customerDTO.getName());
        if(!(customerDTO.getCode()== null))
            customer.setCode(customerDTO.getCode().toUpperCase());
        if(!(customerDTO.getGroupCustomer()== null))
            customer.setGroupCustomer(customerDTO.getGroupCustomer());
        if(!(customerDTO.getPhoneNumber()== null))
            customer.setPhoneNumber(customerDTO.getPhoneNumber());
        if(!(customerDTO.getEmail()== null))
            customer.setEmail(customerDTO.getEmail());
        if(!(customerDTO.getCreatedBy()== null))
            customer.setCreatedBy(customerDTO.getCreatedBy());
        if(!(customerDTO.getAddress()== null))
            customer.setAddress(customerDTO.getAddress());
        customerDTO = customerMapper.toDto(customer);
        return genericMapper.toDto(customerRepository.save(genericMapper.toEntity(customerDTO)));
    }
}




