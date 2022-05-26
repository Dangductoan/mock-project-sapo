package com.sapo.mockproject.service.mapper;

import com.sapo.mockproject.domain.Bill;
import com.sapo.mockproject.dto.BillDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BillMapper extends GenericMapper<Long, BillDTO, Bill> {
}
