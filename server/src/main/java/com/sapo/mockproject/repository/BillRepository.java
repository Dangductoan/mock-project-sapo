package com.sapo.mockproject.repository;

import com.sapo.mockproject.domain.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BillRepository extends GenericRepository<Bill, Long> {

    String SEARCH_CONDITION = " FROM Bill b INNER JOIN b.billCategory bc INNER JOIN b.customer c " +
            " WHERE b.payment LIKE %?1% OR b.code LIKE %?1% OR b.description LIKE %?1% OR b.createdBy LIKE %?1%" +
            " OR bc.name LIKE %?1% OR c.name LIKE %?1%";

    @Override
    @Query("SELECT b " + SEARCH_CONDITION)
    Page<Bill> fetchByQuery(String query, Pageable pageable);

    @Override
    @Query("SELECT b " + SEARCH_CONDITION)
    List<Bill> fetchByQuery(String query);

    @Override
    @Query("SELECT COUNT(b) " + SEARCH_CONDITION)
    Long countSearch(String query);

    Optional<Bill> findByCode(String code);

    @Query(value = "SELECT * FROM bills b WHERE DATE(b.created_at) BETWEEN ?1 AND ?2", nativeQuery = true)
    List<Bill> fetchBetweenDate(String start, String end);
}
