package com.sapo.mockproject.repository;

import com.sapo.mockproject.domain.Customer;
import com.sapo.mockproject.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends GenericRepository<Customer, Integer>{
    Optional<Customer> findByCode(String code);
    @Override
    @Query("SELECT c FROM Customer c where name = ?1")
    Page<Customer> fetchByQuery(String query, Pageable pageable);

    @Override
    @Query("SELECT c FROM Customer c where name = ?1")
    List<Customer> fetchByQuery(String query);
}
