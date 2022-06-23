package com.sapo.mockproject.service;

import com.sapo.mockproject.dto.BillDTO;

import java.util.List;
import java.util.Map;

public interface BillService extends GenericService<Long, BillDTO> {

    List<BillDTO> fetchBetweenDate(String start, String end);

    List<BillDTO> filter(Map<String, String> requestParams, Integer page, Integer size);

    List<BillDTO> filter(Map<String, String> requestParams);

    Long countFilter(Map<String, String> requestParams);
}
