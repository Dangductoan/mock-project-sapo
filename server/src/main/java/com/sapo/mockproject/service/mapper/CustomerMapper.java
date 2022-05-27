package com.sapo.mockproject.service.mapper;

import com.sapo.mockproject.domain.Customer;
import com.sapo.mockproject.domain.User;
import com.sapo.mockproject.dto.CustomerDTO;
import com.sapo.mockproject.dto.UserDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerMapper extends GenericMapper<Integer, CustomerDTO, Customer>{
}