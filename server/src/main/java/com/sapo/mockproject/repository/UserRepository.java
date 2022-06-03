package com.sapo.mockproject.repository;

import com.sapo.mockproject.domain.Bill;
import com.sapo.mockproject.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends GenericRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    Optional<User> findByPhoneNumber(String phoneNumber);

    Optional<User> findByName(String name);

    Boolean existsByUsername(String username);

    @Override
    @Query("SELECT u FROM User u where name = ?1")
    Page<User> fetchByQuery(String query, Pageable pageable);

    @Override
    @Query("SELECT u FROM User u where name = ?1")
    List<User> fetchByQuery(String query);


}
