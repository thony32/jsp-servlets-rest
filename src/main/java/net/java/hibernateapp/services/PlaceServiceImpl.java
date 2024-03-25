package net.java.hibernateapp.services;

import org.springframework.beans.factory.annotation.Autowired;

import net.java.hibernateapp.entities.Place;
import net.java.hibernateapp.repositories.PlaceRepository;

import java.util.List;
import java.util.Optional;

public class PlaceServiceImpl implements PlaceService {
    private final PlaceRepository placeRepository;

    @Autowired
    public PlaceServiceImpl(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    @Override
    public Place save(Place place) {
        return placeRepository.save(place);
    }

    @Override
    public void delete(Place place) {
        placeRepository.delete(place);
    }

    @Override
    public List<Place> findAll() {
        return placeRepository.findAll();
    }

    @Override
    public Optional<Place> findByCodePlace(Integer codePlace) {
        return placeRepository.findById(codePlace);
    }

    @Override
    public Place update(Place place) {
        if (place != null && place.getCodePlace() != null) {
            Optional<Place> existingPlace = placeRepository.findById(place.getCodePlace());
            if (existingPlace.isPresent()) {
                return placeRepository.save(place);
            }
        }
        return null; // Or throw an exception if you prefer
    }
}
