package com.sapo.mockproject.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "roles")
@Getter
@Setter
public class Role extends BaseDomain<Short> {

    @Column(length = 30, nullable = false, unique = true)
    @Enumerated(EnumType.STRING)
    private ERole name;

}
