package com.sapo.mockproject.controller;

import com.sapo.mockproject.domain.RevenueStats;
import com.sapo.mockproject.repository.RevenueStatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/chief-accountant/revenue-stats")
public class RevenueStatsController {
    @Autowired
    private RevenueStatsRepository repository;

    @GetMapping("/{start}/{end}")
    public Optional<RevenueStats> getData_between(@PathVariable(value = "start") @DateTimeFormat(pattern = "yyyy-MM-dd") String start, @PathVariable(value = "end") @DateTimeFormat(pattern = "yyyy-MM-dd") String end) {
        return repository.getData_between(start, end);
    }
}
