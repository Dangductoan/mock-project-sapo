package com.sapo.mockproject.service.impl;

import com.sapo.mockproject.domain.BaseDomain;
import com.sapo.mockproject.dto.BaseDTO;
import com.sapo.mockproject.exception.InvalidResourceException;
import com.sapo.mockproject.exception.ResourceNotFoundException;
import com.sapo.mockproject.repository.GenericRepository;
import com.sapo.mockproject.service.GenericService;
import com.sapo.mockproject.service.mapper.GenericMapper;
import org.springframework.data.domain.Pageable;

import java.util.List;

public abstract class BaseServiceImpl<ID extends Number, D extends BaseDTO<ID>, E extends BaseDomain<ID>>
        implements GenericService<ID,D> {

    protected final GenericRepository<E, ID> genericRepository;

    protected final GenericMapper<ID, D, E> genericMapper;

    public BaseServiceImpl(GenericRepository<E, ID> genericRepository,
                           GenericMapper<ID, D, E> genericMapper) {
        this.genericRepository = genericRepository;
        this.genericMapper = genericMapper;
    }

    @Override
    public D save(D d) {
        if (checkUniqueFields(d)) return null;
        return genericMapper.toDto(genericRepository.save(genericMapper.toEntity(d)));
    }

    @Override
    public D update(D d) {
        if (genericRepository.findById(d.getId()).isEmpty())
            throw new ResourceNotFoundException("Item does not exist!");
        return genericMapper.toDto(genericRepository.save(genericMapper.toEntity(d)));
    }

    @Override
    public void deleteById(ID id) {
        if (genericRepository.findById(id).isEmpty())
            throw new ResourceNotFoundException("Item does not exist!");
        genericRepository.deleteById(id);
    }

    @Override
    public D getById(ID id) {
        return genericMapper.toDto(genericRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item does not exist!")));
    }

    @Override
    public List<D> fetchByQuery(String query, Pageable pageable) {
        if (query == null || query.equals("")) {
            return genericMapper.toDto(genericRepository.findAll(pageable).getContent());
        }
        return genericMapper.toDto(genericRepository.fetchByQuery(query, pageable).getContent());
    }

    @Override
    public List<D> fetchByQuery(String query) {
        if (query == null || query.equals("")) {
            return genericMapper.toDto(genericRepository.findAll());
        }
        return genericMapper.toDto(genericRepository.fetchByQuery(query));
    }

    @Override
    public Long count(String query) {
        if (query == null || query.equals(""))
            return genericRepository.count();
        return genericRepository.countSearch(query);
    }

    public abstract boolean checkUniqueFields(D d);
}
