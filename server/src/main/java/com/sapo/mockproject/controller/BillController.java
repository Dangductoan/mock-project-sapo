package com.sapo.mockproject.controller;

import com.sapo.mockproject.dto.BillDTO;
import com.sapo.mockproject.service.BillService;
import com.sapo.mockproject.service.GenericService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/accountant/bills")
public class BillController extends BaseController<Long, BillDTO> {

    private final BillService billService;

    public BillController(GenericService<Long, BillDTO> genericService, BillService billService) {
        super(genericService);
        this.billService = (BillService) genericService;
    }

    @GetMapping("/{start}/{end}")
    public Map<String, List<BillDTO>> searchBetweenDate(@PathVariable(value = "start") @DateTimeFormat(pattern = "yyyy-MM-dd") String start,
                                                        @PathVariable(value = "end") @DateTimeFormat(pattern = "yyyy-MM-dd") String end) {
        Map<String, List<BillDTO>> data = new HashMap<>();
        data.put("bills", billService.fetchBetweenDate(start, end));
        return data;
    }
}
