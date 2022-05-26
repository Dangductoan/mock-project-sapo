package com.sapo.mockproject.service.mapper;

import com.sapo.mockproject.domain.User;
import com.sapo.mockproject.dto.UserDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper extends GenericMapper<Integer, UserDTO, User>{
}
