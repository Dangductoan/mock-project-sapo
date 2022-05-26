package com.sapo.mockproject.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "bills")
@Getter
@Setter
public class Bill extends BaseDomain<Long> {

    @Column(name = "total_value", nullable = false)
    private Long totalValue;

    @Column(length = 50, nullable = false)
    private String payment;

    @Column(length = 50, nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private boolean status;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private Instant createdAt;

    @Column(name = "modified_at")
    @LastModifiedDate
    private Instant modifiedAt;

    @Column(name = "created_by", length = 63, updatable = false)
    private String createdBy;

    @Column(name = "modified_by", length = 63)
    private String modifiedBy;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "bill_category_id", nullable = false)
    private BillCategory billCategory;

}
