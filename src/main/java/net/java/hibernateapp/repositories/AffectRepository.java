package net.java.hibernateapp.repositories;

import net.java.hibernateapp.entities.Affect;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AffectRepository extends JpaRepository<Affect, Long> {
    @Query("SELECT a FROM Affect a WHERE a.employee.codeEmployee = :codeEmployee")
    List<Affect> findByEmployeeCode(@Param("codeEmployee") Integer codeEmployee);
}