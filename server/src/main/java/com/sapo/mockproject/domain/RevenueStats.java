package com.sapo.mockproject.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "revenue_stats")
public class RevenueStats extends BaseDomain<Long> {

    @Column(nullable = false, unique = true)
    private Date date;

    @Column(name = "total_revenue", nullable = false)
    private Long totalRevenue;

    @Column(name = "bill_quantity", nullable = false)
    private Integer billQuantity;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Long totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Integer getBillQuantity() {
        return billQuantity;
    }

    public void setBillQuantity(Integer billQuantity) {
        this.billQuantity = billQuantity;
    }
}
