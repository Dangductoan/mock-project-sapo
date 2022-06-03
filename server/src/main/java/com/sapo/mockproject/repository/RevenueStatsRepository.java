package com.sapo.mockproject.repository;

import com.sapo.mockproject.domain.RevenueStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RevenueStatsRepository extends JpaRepository<RevenueStats, Long> {

    @Query(value = "SELECT * FROM revenue_stats rs WHERE DATE(rs.date) = :stringDate", nativeQuery = true)
    Optional<RevenueStats> findByStringDate(@Param("stringDate") String stringDate);

    @Query(value = "SELECT * FROM revenue_stats rs WHERE DATE(rs.date)  BETWEEN :start AND :end", nativeQuery = true)
    List<RevenueStats> getData_between(@Param("start") String start, @Param("end") String end);
}
