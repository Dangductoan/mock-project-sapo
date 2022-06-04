package com.sapo.mockproject.service;

import com.sapo.mockproject.dto.BaseDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GenericService<ID extends Number, D extends BaseDTO<ID>> {

    D save(D dto);

    D update(D dto);

    void deleteById(ID id);

    D getById(ID id);

    List<D> fetchByQuery(String query, Pageable pageable);

    List<D> fetchByQuery(String query);

    Long count(String query);

}
