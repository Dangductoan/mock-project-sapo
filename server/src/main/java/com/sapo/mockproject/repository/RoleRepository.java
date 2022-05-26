package com.sapo.mockproject.repository;

import com.sapo.mockproject.domain.ERole;
import com.sapo.mockproject.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Short> {

    Optional<Role> findByName(ERole eRole);
}
