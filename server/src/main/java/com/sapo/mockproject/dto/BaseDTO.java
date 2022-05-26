package com.sapo.mockproject.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public abstract class BaseDTO<ID extends Number> {

    private ID id;

    private Instant createdAt = Instant.now();

    private Instant modifiedAt = Instant.now();

    public abstract String responseDataName();

}
