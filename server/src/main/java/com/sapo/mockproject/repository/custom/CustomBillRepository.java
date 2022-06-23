package com.sapo.mockproject.repository.custom;

import com.sapo.mockproject.domain.Bill;

import java.util.List;
import java.util.Map;

public interface CustomBillRepository {

    List<Bill> filter(Map<String, String> requestParams, Integer page, Integer size);

    List<Bill> filter(Map<String, String> requestParams);

    Long countFilter(Map<String, String> requestParams);
}
