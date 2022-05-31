package com.sapo.mockproject.service.impl;

import com.sapo.mockproject.domain.Bill;
import com.sapo.mockproject.domain.BillCategory;
import com.sapo.mockproject.domain.Customer;
import com.sapo.mockproject.domain.RevenueStats;
import com.sapo.mockproject.dto.BillDTO;
import com.sapo.mockproject.exception.InvalidResourceException;
import com.sapo.mockproject.repository.*;
import com.sapo.mockproject.security.UserDetailsImpl;
import com.sapo.mockproject.service.mapper.GenericMapper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Optional;

@Service
public class BillServiceImpl extends BaseServiceImpl<Long, BillDTO, Bill> {

    private final BillRepository billRepository;

    private final CustomerRepository customerRepository;

    private final BillCategoryRepository billCategoryRepository;

    private final RevenueStatsRepository revenueStatsRepository;

    public BillServiceImpl(GenericRepository<Bill, Long> genericRepository, GenericMapper<Long, BillDTO, Bill> genericMapper,
                           CustomerRepository customerRepository, BillCategoryRepository billCategoryRepository,
                           RevenueStatsRepository revenueStatsRepository) {
        super(genericRepository, genericMapper);
        this.billRepository = (BillRepository) genericRepository;
        this.customerRepository = customerRepository;
        this.billCategoryRepository = billCategoryRepository;
        this.revenueStatsRepository = revenueStatsRepository;
    }

    @Override
    public boolean checkUniqueFields(BillDTO billDTO) {
        if (billRepository.findByCode(billDTO.getCode()).isPresent())
            throw new InvalidResourceException("Code already in use!");
        return false;
    }

    @Override
    @Transactional
    public BillDTO save(BillDTO billDTO) {
        if (checkUniqueFields(billDTO)) return null;

        if (billDTO.getCustomer_id() != null) {
            Optional<Customer> customer = customerRepository.findById(billDTO.getCustomer_id());
            if (customer.isEmpty()) {
                throw new InvalidResourceException("Customer doesn't exist!");
            } else {
                billDTO.setCustomer(customer.get());
            }
        }
        if (billDTO.getBill_category_id() != null) {
            Optional<BillCategory> billCategory = billCategoryRepository.findById(billDTO.getBill_category_id());
            if (billCategory.isEmpty()) {
                throw new InvalidResourceException("Bill Category doesn't exist!");
            } else {
                billDTO.setBillCategory(billCategory.get());
            }
        }

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) usernamePasswordAuthenticationToken.getPrincipal();
        billDTO.setCreatedBy(userDetails.getUsername());
        billDTO.setModifiedBy(userDetails.getUsername());

        billDTO = genericMapper.toDto(billRepository.save(genericMapper.toEntity(billDTO)));

        /** create Revenue Stats */
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Optional<RevenueStats> revenueStats = revenueStatsRepository.findByStringDate(LocalDate.now().format(formatter));
        if (revenueStats.isEmpty()) {
            revenueStatsRepository.save(new RevenueStats(new Date(), billDTO.getTotalValue(), 1));
        } else {
            revenueStats.get().setTotalRevenue(revenueStats.get().getTotalRevenue() + billDTO.getTotalValue());
            revenueStats.get().setBillQuantity(revenueStats.get().getBillQuantity() + 1);
            revenueStatsRepository.save(revenueStats.get());
        }
        /** end created Revenue Stats */

        return billDTO;
    }
}
