package com.sapo.mockproject.controller;

import com.sapo.mockproject.domain.Bill;
import com.sapo.mockproject.dto.BillDTO;
import com.sapo.mockproject.repository.BillRepository;
import com.sapo.mockproject.service.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/accountant/bills")
public class BillController extends BaseController<Long, BillDTO>{

    public BillController(GenericService<Long, BillDTO> genericService) {
        super(genericService);


    }





}
