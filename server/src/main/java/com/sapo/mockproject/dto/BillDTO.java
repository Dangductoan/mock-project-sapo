package com.sapo.mockproject.dto;

import com.sapo.mockproject.domain.BillCategory;
import com.sapo.mockproject.domain.Customer;
import com.sapo.mockproject.utils.Regex;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

@Component
@Getter
@Setter
public class BillDTO extends BaseDTO<Long> {

    @NotNull(message = "Chưa nhập giá trị phiếu thu")
    @Positive(message = "Giá trị phiếu thu phải là số nguyên dương")
    private Long totalValue;

    @NotNull(message = "Chưa chọn hình thức thanh toán")
    private String payment;

    @NotNull(message = "Chưa nhập mã phiếu thu")
    @Pattern(regexp = Regex.CODE_REGEX, message = "Mã phiếu thu chỉ chứa chữ hoa hoặc số")
    private String code;

    private String description;

    @NotNull(message = "Có lỗi xảy ra, Yêu cầu xử lý nhập người tạo phiếu thu từ client")
    private String createdBy;

    private String modifiedBy;

    @NotNull(message = "Chưa chọn khách hàng")
    private Customer customer;

    @NotNull(message = "Chưa chọn loại phiếu thu")
    private BillCategory billCategory;

    @Override
    public String responseDataName() {
        return "bill";
    }

}
