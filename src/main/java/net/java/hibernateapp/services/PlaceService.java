package net.java.hibernateapp.services;

import net.java.hibernateapp.entities.Place;

import java.util.List;
import java.util.Optional;

public interface PlaceService {
    Place save(Place place);

    void delete(Place place);

    List<Place> findAll();

    Optional<Place> findByCodePlace(Integer codePlace);

    Place update(Place place);
}
