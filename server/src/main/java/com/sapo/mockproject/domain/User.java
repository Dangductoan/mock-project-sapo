package com.sapo.mockproject.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User extends BaseDomain<Integer> {

    @Column(length = 50, nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(length = 63)
    private String name;

    @Column(name = "phone_number", length = 20, unique = true)
    private String phoneNumber;

    @Column
    private String address;

    @OneToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private Instant createdAt;

    @Column(name = "modified_at")
    @LastModifiedDate
    private Instant modifiedAt;



}
