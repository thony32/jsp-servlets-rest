package net.java.hibernateapp.api;

import net.java.hibernateapp.entities.Employee;
import net.java.hibernateapp.services.EmployeeService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeApi {
    private final EmployeeService employeeService;

    public EmployeeApi(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        Employee savedEmployee = employeeService.save(employee);
        return ResponseEntity.ok(savedEmployee);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Integer codeEmployee) {
        return employeeService.findByCodeEmployee(codeEmployee)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.findAll();
        return ResponseEntity.ok(employees);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable("id") Integer codeEmployee,
            @RequestBody Employee employee) {
        if (!employeeService.findByCodeEmployee(codeEmployee).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        employee.setCodeEmployee(codeEmployee);
        Employee updatedEmployee = employeeService.update(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable("id") Integer codeEmployee) {
        Optional<Employee> employee = employeeService.findByCodeEmployee(codeEmployee);
        if (employee.isPresent()) {
            employeeService.delete(employee.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Employee>> searchEmployees(
            @RequestParam(value = "code", required = false) Integer codeEmployee,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "firstName", required = false) String firstName) {
        List<Employee> employees = employeeService.findByCodeEmployeeOrLastNameOrFirstName(codeEmployee, lastName,
                firstName);
        return ResponseEntity.ok(employees);
    }
}
