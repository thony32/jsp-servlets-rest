package net.java.hibernateapp.services;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import net.java.hibernateapp.entities.Employee;
import net.java.hibernateapp.repositories.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public void delete(Employee employee) {
        employeeRepository.delete(employee);
    }

    @Override
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> findByCodeEmployee(Integer codeEmployee) {
        return employeeRepository.findById(codeEmployee);
    }

    @Override
    public List<Employee> findByCodeEmployeeOrLastNameOrFirstName(String search) {
        return employeeRepository.findByCodeEmployeeOrLastNameOrFirstName(search);
    }

    @Override
    public Employee update(Employee employee) {
        if (employee != null && employee.getCodeEmployee() != null) {

            Optional<Employee> existingEmployee = employeeRepository.findById(employee.getCodeEmployee());
            if (existingEmployee.isPresent()) {
                return employeeRepository.save(employee);
            }
        }
        return null;
    }
}
