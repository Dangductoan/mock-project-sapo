package com.sapo.mockproject.service;

import com.sapo.mockproject.dto.BaseDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GenericService<ID extends Number, D extends BaseDTO<ID>> {

    D save(D dto);

    D update(D dto);

    void deleteById(ID id);

    D getById(ID id);

    List<D> search(String query, Pageable pageable);

    List<D> search(String query);

    Long count(String query);

}
