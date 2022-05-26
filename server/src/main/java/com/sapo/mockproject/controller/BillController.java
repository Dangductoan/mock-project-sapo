package com.sapo.mockproject.controller;

import com.sapo.mockproject.dto.BillDTO;
import com.sapo.mockproject.service.GenericService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/accountant/bills")
public class BillController extends BaseController<Long, BillDTO>{

    public BillController(GenericService<Long, BillDTO> genericService) {
        super(genericService);
    }
}
