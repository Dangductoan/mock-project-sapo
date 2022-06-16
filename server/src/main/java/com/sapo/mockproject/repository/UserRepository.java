package com.sapo.mockproject.repository;

import com.sapo.mockproject.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends GenericRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    Optional<User> findByPhoneNumber(String phoneNumber);

    Optional<User> findByName(String name);

    Boolean existsByUsername(String username);

    String SEARCH_CONDITION = " FROM User u " +
            " WHERE name LIKE %?1% OR phone_number LIKE %?1% OR address LIKE %?1% OR username LIKE %?1%";

    @Override
    @Query("SELECT u " + SEARCH_CONDITION)
    Page<User> fetchByQuery(String query, Pageable pageable);

    @Override
    @Query("SELECT u " + SEARCH_CONDITION)
    List<User> fetchByQuery(String query);

    @Override
    @Query("SELECT u FROM User u where name = ?1")
    Long countSearch(String query);

}
