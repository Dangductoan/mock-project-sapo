package com.sapo.mockproject.repository;

import com.sapo.mockproject.domain.BillCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillCategoryRepository extends JpaRepository<BillCategory, Short> {
}
