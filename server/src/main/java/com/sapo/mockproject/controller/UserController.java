package com.sapo.mockproject.controller;

import com.sapo.mockproject.domain.ERole;
import com.sapo.mockproject.domain.Role;
import com.sapo.mockproject.domain.User;
import com.sapo.mockproject.dto.UserDTO;
import com.sapo.mockproject.repository.RoleRepository;
import com.sapo.mockproject.service.GenericService;
import com.sapo.mockproject.service.UserService;
import com.sapo.mockproject.service.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/chief-accountant/")
public class UserController extends BaseController<Integer, UserDTO> {

    public UserController(GenericService<Integer, UserDTO> genericService) {
        super(genericService);
    }

}
