package net.java.hibernateapp.services;

import net.java.hibernateapp.entities.Affect;
import net.java.hibernateapp.repositories.AffectRepository;
import net.java.hibernateapp.services.AffectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AffectServiceImpl implements AffectService {

    private final AffectRepository affectRepository;

    @Autowired
    public AffectServiceImpl(AffectRepository affectRepository) {
        this.affectRepository = affectRepository;
    }

    @Override
    public Affect save(Affect affect) {
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
