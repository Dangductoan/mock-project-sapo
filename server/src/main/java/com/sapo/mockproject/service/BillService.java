package com.sapo.mockproject.service;

import com.sapo.mockproject.dto.BillDTO;

import java.util.List;

public interface BillService extends GenericService<Long, BillDTO> {

    List<BillDTO> fetchBetweenDate(String start, String end);
}
