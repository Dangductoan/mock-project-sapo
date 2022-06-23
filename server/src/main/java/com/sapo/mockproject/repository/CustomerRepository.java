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

    Optional<Customer> findByEmail(String email);
    String SEARCH_CONDITION = " FROM Customer c " +
            " WHERE name LIKE %?1% OR phone_number LIKE %?1% OR address LIKE %?1% OR email LIKE %?1% OR group_customer LIKE %?1%";

    @Override
    @Query("SELECT c " + SEARCH_CONDITION)
    Page<Customer> fetchByQuery(String query, Pageable pageable);

    @Override
    @Query("SELECT c " + SEARCH_CONDITION)
    List<Customer> fetchByQuery(String query);

    @Override
    @Query("SELECT COUNT(c) FROM Customer c where name = ?1")
    Long countSearch(String query);
}
