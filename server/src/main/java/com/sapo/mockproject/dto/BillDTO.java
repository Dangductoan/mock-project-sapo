package com.sapo.mockproject.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sapo.mockproject.domain.BillCategory;
import com.sapo.mockproject.domain.Customer;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@Getter
@Setter
public class BillDTO extends BaseDTO<Long> {

    private Long totalValue;

    private String payment;

    private String code;

    private boolean status;

    private String description;

    private Instant createdAt;

    private Instant modifiedAt;

    private String createdBy;

    private String modifiedBy;

    private Customer customer;

    private BillCategory billCategory;

    private Integer customer_id;

    private Short bill_category_id;

    @Override
    public String responseDataName() {
        return "bill";
    }

    @JsonIgnore
    @JsonProperty(value = "customer_id")
    public Integer getCustomer_id() {
        return customer_id;
    }

    @JsonIgnore
    @JsonProperty(value = "category_id")
    public Short getBill_category_id() {
        return bill_category_id;
    }

}
