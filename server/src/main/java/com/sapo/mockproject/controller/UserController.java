package com.sapo.mockproject.controller;


import com.sapo.mockproject.dto.UserDTO;
import com.sapo.mockproject.service.GenericService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/v1/chief")
//@RequestMapping("/api/v1/chief-accountant/user")

public class UserController extends BaseController<Integer, UserDTO> {

    public UserController(GenericService<Integer, UserDTO> genericService) {
        super(genericService);
    }

}
