package com.sapo.mockproject.dto;

import java.time.Instant;

public abstract class BaseDTO<ID extends Number> {

    private ID id;

    private Instant createdAt = Instant.now();

    private Instant modifiedAt = Instant.now();

    public ID getId() {
        return id;
    }

    public void setId(ID id) {
        this.id = id;
    }

    public abstract String responseDataName();

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(Instant modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

}
