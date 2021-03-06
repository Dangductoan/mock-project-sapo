package com.sapo.mockproject.service.impl;

import com.sapo.mockproject.domain.Bill;
import com.sapo.mockproject.domain.RevenueStats;
import com.sapo.mockproject.domain.User;
import com.sapo.mockproject.dto.BillDTO;
import com.sapo.mockproject.exception.InvalidResourceException;
import com.sapo.mockproject.repository.BillRepository;
import com.sapo.mockproject.repository.GenericRepository;
import com.sapo.mockproject.repository.RevenueStatsRepository;
import com.sapo.mockproject.repository.UserRepository;
import com.sapo.mockproject.repository.custom.CustomBillRepository;
import com.sapo.mockproject.security.UserDetailsImpl;
import com.sapo.mockproject.service.BillService;
import com.sapo.mockproject.service.mapper.GenericMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BillServiceImpl extends BaseServiceImpl<Long, BillDTO, Bill> implements BillService {

    private final BillRepository billRepository;

    private final CustomBillRepository customBillRepository;

    private final RevenueStatsRepository revenueStatsRepository;

    private final UserRepository userRepository;

    public BillServiceImpl(GenericRepository<Bill, Long> genericRepository, GenericMapper<Long, BillDTO, Bill> genericMapper,
                           CustomBillRepository customBillRepository, RevenueStatsRepository revenueStatsRepository,
                           UserRepository userRepository) {
        super(genericRepository, genericMapper);
        this.billRepository = (BillRepository) genericRepository;
        this.customBillRepository = customBillRepository;
        this.revenueStatsRepository = revenueStatsRepository;
        this.userRepository = userRepository;
    }

    @Override
    public boolean checkUniqueFields(BillDTO billDTO) {
        if (billRepository.findByCode(billDTO.getCode()).isPresent())
            throw new InvalidResourceException("M?? phi???u thu ???? t???n t???i!");
        return false;
    }

    @Override
    @Transactional
    public BillDTO save(BillDTO billDTO) {
        if (checkUniqueFields(billDTO)) return null;

        // check createdBy t??? client truy???n xu???ng
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> user = userRepository.findByName(billDTO.getCreatedBy());
        if (user.isEmpty() || !userDetails.getUsername().equals(user.get().getUsername())) {
            throw new InvalidResourceException("Y??u c???u truy???n ????ng tr?????ng createdBy t??? user.name, v???i user ???????c tr??? v??? khi ????ng nh???p!");
        }

        billDTO.setCode(billDTO.getCode().toUpperCase());
        billDTO = genericMapper.toDto(billRepository.save(genericMapper.toEntity(billDTO)));

        // create Revenue Stats
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Optional<RevenueStats> revenueStats = revenueStatsRepository.findByStringDate(LocalDate.now().format(formatter));
        if (revenueStats.isEmpty()) {
            revenueStatsRepository.save(new RevenueStats(new Date(), billDTO.getTotalValue(), 1));
        } else {
            revenueStats.get().setTotalRevenue(revenueStats.get().getTotalRevenue() + billDTO.getTotalValue());
            revenueStats.get().setBillQuantity(revenueStats.get().getBillQuantity() + 1);
            revenueStatsRepository.save(revenueStats.get());
        }
        // end created Revenue Stats

        return billDTO;
    }

    @Override
    @Transactional
    public BillDTO update(BillDTO billDTO) {
        // check modifiedBy t??? client truy???n xu???ng
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> user = userRepository.findByName(billDTO.getModifiedBy());
        if (user.isEmpty() || !userDetails.getUsername().equals(user.get().getUsername())) {
            throw new InvalidResourceException("Y??u c???u truy???n ????ng tr?????ng modifiedBy t??? user.name, v???i user ???????c tr??? v??? khi ????ng nh???p!");
        }

        Bill bill = billRepository.getById(billDTO.getId());

        // modify Revenue Stats
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd").withZone(ZoneId.systemDefault());
        Optional<RevenueStats> revenueStats = revenueStatsRepository.findByStringDate(formatter.format(billDTO.getCreatedAt()));
        if (revenueStats.isPresent()) {
            revenueStats.get().setTotalRevenue(revenueStats.get().getTotalRevenue() - bill.getTotalValue() + billDTO.getTotalValue());
            revenueStatsRepository.save(revenueStats.get());
        }
        // end modify Revenue Stats

        billDTO = genericMapper.toDto(billRepository.save(genericMapper.toEntity(billDTO)));

        return billDTO;
    }

    @Override
    public List<BillDTO> fetchBetweenDate(String start, String end) {
        return genericMapper.toDto(billRepository.fetchBetweenDate(start, end));
    }

    @Override
    public List<BillDTO> filter(Map<String, String> requestParams, Integer page, Integer size) {
        return genericMapper.toDto(customBillRepository.filter(requestParams, page, size));
    }

    @Override
    public List<BillDTO> filter(Map<String, String> requestParams) {
        return genericMapper.toDto(customBillRepository.filter(requestParams));
    }

    @Override
    public Long countFilter(Map<String, String> requestParams) {
        return customBillRepository.countFilter(requestParams);
    }
}
