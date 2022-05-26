package com.sapo.mockproject.controller;

import com.sapo.mockproject.dto.BaseDTO;
import com.sapo.mockproject.service.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class BaseController<ID extends Number, D extends BaseDTO<ID>> {

    protected final GenericService<ID, D> genericService;

    @Autowired
    private D dto;

    public BaseController(GenericService<ID, D> genericService) {
        this.genericService = genericService;
    }

    @PostMapping
    public Map<String, D> create(@Valid @RequestBody D d) {
        Map<String, D> data = new HashMap<>();
        data.put(d.responseDataName(), genericService.save(d));
        return data;
    }

    @PutMapping("{id}")
    public Map<String, D> update(@Valid @RequestBody D d, @PathVariable ID id) {
        d.setId(id);
        Map<String, D> data = new HashMap<>();
        data.put(d.responseDataName(), genericService.update(d));
        return data;
    }

    @GetMapping("{id}")
    public Map<String, D> getById(@PathVariable ID id) {
        Map<String, D> data = new HashMap<>();
        data.put(dto.responseDataName(), genericService.getById(id));
        return data;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable ID id) {
        genericService.deleteById(id);
    }

    @GetMapping
    public Map<String, List<D>> searchByQuery(@RequestParam(required = false) String query,
                                              @RequestParam(required = false) Integer page,
                                              @RequestParam(required = false) Integer size) {
        Map<String, List<D>> data = new HashMap<>();
        String dataName = dto.responseDataName().endsWith("y")
                ? dto.responseDataName().substring(0, dto.responseDataName().length() - 1) + "ies"
                : dto.responseDataName() + "s";
        if (page != null && size != null) {
            data.put(dataName, genericService.fetchByQuery(query, PageRequest.of(page, size)));
        } else {
            data.put(dataName, genericService.fetchByQuery(query));
        }

        return data;
    }

    @GetMapping("count")
    public Long count() {
        return genericService.count();
    }
}
