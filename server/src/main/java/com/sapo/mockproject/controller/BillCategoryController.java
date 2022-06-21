package com.sapo.mockproject.controller;

import com.sapo.mockproject.domain.BillCategory;
import com.sapo.mockproject.exception.InvalidResourceException;
import com.sapo.mockproject.exception.ResourceNotFoundException;
import com.sapo.mockproject.model.ResponseObject;
import com.sapo.mockproject.repository.BillCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path="api/v1/chief-accountant/bill-categories")
public class BillCategoryController {
    @Autowired
    private BillCategoryRepository repository;
    @GetMapping("")
    List<BillCategory> getAllBillCategory () {
        return repository.findAll();
    }

    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertBillCategory(@RequestBody BillCategory newBillCategory) {
        List<BillCategory> foundBillCategory = repository.findByName(newBillCategory.getName().trim());
        if(foundBillCategory.size() > 0) {
           throw new InvalidResourceException("Bill Category has existed ");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok","Insert BillCategory successfully",repository.save(newBillCategory))
        );
    }

    @PutMapping("/{id}")
    ResponseEntity<ResponseObject> updateBillCategory(@RequestBody BillCategory newBillCategory, @PathVariable Short id) {
        Optional<BillCategory> foundBillCategory = repository.findById(id);
        Optional<BillCategory> updateBillCategory = repository.findById(id)
                                         .map(BillCategory -> {
                                             BillCategory.setId(newBillCategory.getId());
                                             BillCategory.setName(newBillCategory.getName());
                                             BillCategory.setCode(newBillCategory.getCode());
                                             BillCategory.setDescription(newBillCategory.getName());
                                             BillCategory.setName(newBillCategory.getDescription());
                                             BillCategory.setCreatedAt(newBillCategory.getCreatedAt());
                                             BillCategory.setModifiedAt(newBillCategory.getModifiedAt());
                                             return repository.save(BillCategory);
                                         });
        if (!foundBillCategory.isPresent())
            throw new ResourceNotFoundException("Bill Category doesn't exist in db!");
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok","update successfully",repository.save(newBillCategory))
        );
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> getById(@PathVariable Short id) {
        Optional<BillCategory> foundBillCategory = repository.findById(id);
        if (foundBillCategory.isEmpty())
            throw new ResourceNotFoundException("Bill Category doesn't exist in db!");
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok","update successfully", foundBillCategory.get())
        );
    }
}
