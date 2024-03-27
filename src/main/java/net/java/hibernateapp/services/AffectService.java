package net.java.hibernateapp.services;

import net.java.hibernateapp.entities.Affect;
import java.util.List;
import java.util.Optional;

public interface AffectService {
    Affect save(Affect affect);

    void delete(Affect affect);

    List<Affect> findAll();

    Affect update(Integer id, Affect affects);

    Optional<Affect> findById(Integer id);

    List<Affect> findByEmployeeCode(Integer codeEmployee);
}