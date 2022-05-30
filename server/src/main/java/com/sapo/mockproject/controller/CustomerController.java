package com.sapo.mockproject.controller;

import com.sapo.mockproject.dto.CustomerDTO;
import com.sapo.mockproject.dto.UserDTO;
import com.sapo.mockproject.service.GenericService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/customers")
//@RequestMapping("/api/v1/chief-accountant/customer/")

public class CustomerController  extends BaseController<Integer, CustomerDTO>  {
    public CustomerController(GenericService<Integer, CustomerDTO> genericService) {
        super(genericService);
    }
}
