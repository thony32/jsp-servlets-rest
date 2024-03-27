package net.java.hibernateapp.repositories;

import net.java.hibernateapp.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    @Query("SELECT e FROM Employee e WHERE " +
           "CAST(e.codeEmployee AS string) LIKE CONCAT('%',:search,'%') OR " +
           "e.lastName LIKE CONCAT('%',:search,'%') OR " +
           "e.firstName LIKE CONCAT('%',:search,'%')")
    List<Employee> findByCodeEmployeeOrLastNameOrFirstName(String search);
}
