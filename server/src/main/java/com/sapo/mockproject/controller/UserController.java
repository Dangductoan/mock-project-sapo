package com.sapo.mockproject.controller;


import com.sapo.mockproject.dto.UserDTO;
import com.sapo.mockproject.service.GenericService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/chief-accountant/users")

public class UserController extends BaseController<Integer, UserDTO> {

    public UserController(GenericService<Integer, UserDTO> genericService) {
        super(genericService);
    }

}
