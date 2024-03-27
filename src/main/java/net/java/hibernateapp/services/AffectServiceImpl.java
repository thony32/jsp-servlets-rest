package net.java.hibernateapp.services;

import net.java.hibernateapp.entities.Affect;
import net.java.hibernateapp.repositories.AffectRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class AffectServiceImpl implements AffectService {

    private final AffectRepository affectRepository;

    public AffectServiceImpl(AffectRepository affectRepository) {
        this.affectRepository = affectRepository;
    }

    @Override
    public Affect save(Affect affect) {
        return affectRepository.save(affect);
    }

    @Override
    public Affect update(Integer id, Affect affectDetails) {
        Affect affect = affectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Affect not found with id " + id));

        affect.setEmployee(affectDetails.getEmployee());
        affect.setPlace(affectDetails.getPlace());
        affect.setDate(affectDetails.getDate());

        return affectRepository.save(affect);
    }

    @Override
    public void delete(Affect affect) {
        affectRepository.delete(affect);
    }

    @Override
    public List<Affect> findAll() {
        return affectRepository.findAll();
    }

    @Override
    public Optional<Affect> findById(Integer id) {
        return affectRepository.findById(id);
    }

    @Override
    public List<Affect> findByEmployeeCode(Integer codeEmployee) {
        return affectRepository.findByEmployeeCode(codeEmployee);
    }
}
