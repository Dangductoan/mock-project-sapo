package com.sapo.mockproject.controller;

import com.sapo.mockproject.dto.BillDTO;
import com.sapo.mockproject.service.BillService;
import com.sapo.mockproject.service.GenericService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
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


    @GetMapping("filter")
    public Map<String, List<BillDTO>> filter(@RequestParam Map<String, String> requestParams,
                                             @Positive @RequestParam(required = false) Integer page,
                                             @Positive @RequestParam(required = false) Integer size) {
        Map<String, String> reduceRequestParams = new HashMap<>();
        for (String key : requestParams.keySet()) {
            if (!requestParams.get(key).equals(""))
                reduceRequestParams.put(key, requestParams.get(key));
        }
        reduceRequestParams.remove("page");
        reduceRequestParams.remove("size");
        Map<String, List<BillDTO>> data = new HashMap<>();
        if (page == null || size == null)
            data.put("bills", billService.filter(reduceRequestParams));
        else
            data.put("bills", billService.filter(reduceRequestParams, page, size));
        return data;


    @GetMapping("count-filter")
    public Map<String, Long> countFilter(@RequestParam Map<String, String> requestParams) {
        Map<String, String> reduceRequestParams = new HashMap<>();
        for (String key : requestParams.keySet()) {
            if (!requestParams.get(key).equals(""))
                reduceRequestParams.put(key, requestParams.get(key));
        }
        reduceRequestParams.remove("page");
        reduceRequestParams.remove("size");
        Map<String, Long> data = new HashMap<>();
        data.put("count", billService.countFilter(reduceRequestParams));
        return data;
    }

    @GetMapping("/{start}/{end}")
    public Map<String, List<BillDTO>> searchBetweenDate(@PathVariable(value = "start") @DateTimeFormat(pattern = "yyyy-MM-dd") String start,
                                                        @PathVariable(value = "end") @DateTimeFormat(pattern = "yyyy-MM-dd") String end) {
        Map<String, List<BillDTO>> data = new HashMap<>();
        data.put("bills", billService.fetchBetweenDate(start, end));
        return data;
    }
}
