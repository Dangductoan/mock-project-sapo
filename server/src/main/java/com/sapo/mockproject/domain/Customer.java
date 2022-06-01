package com.sapo.mockproject.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Table(name = "customers")
@Getter
@Setter
public class Customer extends BaseDomain<Integer> {

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 50, nullable = false, unique = true)
    private String code;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(nullable = false)
    private String address;

    @Column(unique = true)
    @Email
    private String email;

    @Column(length = 50, nullable = false)
    private String groupCustomer;

    @Column(name = "created_by", nullable = false, length = 50)
    private String createdBy;

}
