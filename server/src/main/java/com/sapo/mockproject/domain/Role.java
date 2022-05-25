package com.sapo.mockproject.domain;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role extends BaseDomain<Short> {

    @Column(length = 30, nullable = false, unique = true)
    @Enumerated(EnumType.STRING)
    private ERole name;

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }
}
