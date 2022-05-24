package com.sapo.mockproject.service.mapper;

import com.sapo.mockproject.domain.BaseDomain;
import com.sapo.mockproject.dto.BaseDTO;

import java.util.List;

public interface GenericMapper<ID extends Number, D extends BaseDTO<ID>, E extends BaseDomain<ID>> {
    D toDto(E entity);

    E toEntity(D dto);

    List<D> toDto(List<E> entityList);

    List<E> toEntity(List<D> dtoList);
}
