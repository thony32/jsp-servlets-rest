package net.java.hibernateapp.api;

import net.java.hibernateapp.entities.Affect;
import net.java.hibernateapp.services.AffectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/affects")
public class AffectApi {

    private final AffectService affectService;

    public AffectApi(AffectService affectService) {
        this.affectService = affectService;
    }

    @PostMapping
    public ResponseEntity<Affect> createAffect(@RequestBody Affect affect) {
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
