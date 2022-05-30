package com.sapo.mockproject.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "revenue_stats")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RevenueStats extends BaseDomain<Long> {

    @Column(nullable = false, unique = true)
    private Date date;

    @Column(name = "total_revenue", nullable = false)
    private Long totalRevenue;

    @Column(name = "bill_quantity", nullable = false)
    private Integer billQuantity;

}
