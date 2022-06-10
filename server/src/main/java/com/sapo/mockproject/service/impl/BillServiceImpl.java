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
import com.sapo.mockproject.security.UserDetailsImpl;
import com.sapo.mockproject.service.BillService;
import com.sapo.mockproject.service.mapper.GenericMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BillServiceImpl extends BaseServiceImpl<Long, BillDTO, Bill> implements BillService {

    private final BillRepository billRepository;

    private final RevenueStatsRepository revenueStatsRepository;

    private final UserRepository userRepository;

    public BillServiceImpl(GenericRepository<Bill, Long> genericRepository, GenericMapper<Long, BillDTO, Bill> genericMapper,
                           RevenueStatsRepository revenueStatsRepository, UserRepository userRepository) {
        super(genericRepository, genericMapper);
        this.billRepository = (BillRepository) genericRepository;
        this.revenueStatsRepository = revenueStatsRepository;
        this.userRepository = userRepository;
    }

    @Override
    public boolean checkUniqueFields(BillDTO billDTO) {
        if (billRepository.findByCode(billDTO.getCode()).isPresent())
            throw new InvalidResourceException("Mã phiếu thu đã tồn tại!");
        return false;
    }

    @Override
    @Transactional
    public BillDTO save(BillDTO billDTO) {
        if (checkUniqueFields(billDTO)) return null;

        // check createdBy từ client truyền xuống
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> user = userRepository.findByName(billDTO.getCreatedBy());
        if (user.isEmpty() || !userDetails.getUsername().equals(user.get().getUsername())) {
            throw new InvalidResourceException("Yêu cầu truyền đúng trường createdBy từ user.name, với user được trả về khi đăng nhập!");
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
    public List<BillDTO> fetchBetweenDate(String start, String end) {
        return genericMapper.toDto(billRepository.fetchBetweenDate(start, end));
    }
}
