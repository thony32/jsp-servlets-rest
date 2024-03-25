package net.java.hibernateapp.repositories;

import net.java.hibernateapp.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    List<Employee> findByCodeEmployeeOrLastNameOrFirstName(Integer codeEmployee, String lastName, String firstName);
}
