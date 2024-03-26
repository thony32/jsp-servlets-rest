package net.java.hibernateapp.api;

import net.java.hibernateapp.dto.AffectDTO;
import net.java.hibernateapp.entities.Affect;
import net.java.hibernateapp.entities.Employee;
import net.java.hibernateapp.entities.Place;
import net.java.hibernateapp.services.AffectService;
import net.java.hibernateapp.services.EmployeeService;
import net.java.hibernateapp.services.PlaceService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/affects")
public class AffectApi {

    private final AffectService affectService;
    private final EmployeeService employeeService;
    private final PlaceService placeService;

    public AffectApi(AffectService affectService, EmployeeService employeeService, PlaceService placeService) {
        this.affectService = affectService;
        this.employeeService = employeeService;
        this.placeService = placeService;
    }

    @PostMapping
    public ResponseEntity<?> createAffect(@RequestBody AffectDTO affectDTO) {

        Optional<Employee> employee = employeeService.findByCodeEmployee(affectDTO.getEmployeeId());
        Optional<Place> place = placeService.findByCodePlace(affectDTO.getPlaceId());

        if (!employee.isPresent() || !place.isPresent()) {
            return ResponseEntity.badRequest().body("Employee ou Place introuvable");
        }

        Affect affect = new Affect();
        affect.setEmployee(employee.get());
        affect.setPlace(place.get());
        affect.setDate(affectDTO.getDate());

        Affect savedAffect = affectService.save(affect);
        return ResponseEntity.ok(savedAffect);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Affect> getAffectById(@PathVariable("id") Integer id) {
        return affectService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Affect>> getAllAffects() {
        List<Affect> affects = affectService.findAll();
        return ResponseEntity.ok(affects);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAffect(@PathVariable("id") Integer id) {
        Optional<Affect> existingAffect = affectService.findById(id);
        if (existingAffect.isPresent()) {
            affectService.delete(existingAffect.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/employee/{codeEmployee}")
    public ResponseEntity<List<Affect>> getAffectsByEmployeeCode(@PathVariable("codeEmployee") Integer codeEmployee) {
        List<Affect> affects = affectService.findByEmployeeCode(codeEmployee);
        return ResponseEntity.ok(affects);
    }
}
