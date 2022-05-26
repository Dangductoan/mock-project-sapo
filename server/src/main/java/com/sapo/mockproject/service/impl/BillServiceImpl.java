package com.sapo.mockproject.service.impl;

import com.sapo.mockproject.domain.Bill;
import com.sapo.mockproject.domain.BillCategory;
import com.sapo.mockproject.domain.Customer;
import com.sapo.mockproject.dto.BillDTO;
import com.sapo.mockproject.exception.InvalidResourceException;
import com.sapo.mockproject.repository.BillCategoryRepository;
import com.sapo.mockproject.repository.BillRepository;
import com.sapo.mockproject.repository.CustomerRepository;
import com.sapo.mockproject.service.mapper.GenericMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BillServiceImpl extends BaseServiceImpl<Long, BillDTO, Bill> {

    private final BillRepository billRepository;

    private final CustomerRepository customerRepository;

    private final BillCategoryRepository billCategoryRepository;

    public BillServiceImpl(BillRepository genericRepository, GenericMapper<Long, BillDTO, Bill> genericMapper,
                           BillRepository billRepository, CustomerRepository customerRepository,
                           BillCategoryRepository billCategoryRepository) {
        super(genericRepository, genericMapper);
        this.billRepository = billRepository;
        this.customerRepository = customerRepository;
        this.billCategoryRepository = billCategoryRepository;
    }

    @Override
    public boolean checkUniqueFields(BillDTO billDTO) {
        if (billRepository.findByCode(billDTO.getCode()).isPresent())
            throw new InvalidResourceException("Code already in use!");
        return false;
    }

    @Override
    public BillDTO save(BillDTO billDTO) {
        if (checkUniqueFields(billDTO)) return null;

        Optional<Customer> customer = customerRepository.findById(billDTO.getCustomer_id());
        if (customer.isEmpty()) {
            throw new InvalidResourceException("Customer doesn't exist!");
        } else {
            billDTO.setCustomer(customer.get());
        }

        Optional<BillCategory> billCategory = billCategoryRepository.findById(billDTO.getBill_category_id());
        if (billCategory.isEmpty()) {
            throw new InvalidResourceException("Bill Category doesn't exist!");
        } else {
            billDTO.setBillCategory(billCategory.get());
        }

        return genericMapper.toDto(billRepository.save(genericMapper.toEntity(billDTO)));
    }
}
