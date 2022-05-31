package com.sapo.mockproject.repository;

import com.sapo.mockproject.domain.BillCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillCategoryRepository extends JpaRepository<BillCategory, Short> {
    List<BillCategory> findByName(String categoryName);
}
