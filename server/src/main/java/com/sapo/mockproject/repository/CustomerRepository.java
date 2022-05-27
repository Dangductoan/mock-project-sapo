package com.sapo.mockproject.repository;

import com.sapo.mockproject.domain.Customer;
import com.sapo.mockproject.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends GenericRepository<Customer, Integer>{
    Optional<Customer> findByCode(String code);

}
