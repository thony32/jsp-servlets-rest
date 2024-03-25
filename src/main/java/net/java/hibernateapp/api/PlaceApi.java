package net.java.hibernateapp.api;

import net.java.hibernateapp.entities.Place;
import net.java.hibernateapp.services.PlaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/places")
public class PlaceApi {
    
    private final PlaceService placeService;

    public PlaceApi(PlaceService placeService) {
        this.placeService = placeService;
    }

    @PostMapping
    public ResponseEntity<Place> createPlace(@RequestBody Place place) {
        Place savedPlace = placeService.save(place);
        return ResponseEntity.ok(savedPlace);
    }

    @GetMapping("/{codePlace}")
    public ResponseEntity<Place> getPlaceByCode(@PathVariable("codePlace") Integer codePlace) {
        return placeService.findByCodePlace(codePlace)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Place>> getAllPlaces() {
        List<Place> places = placeService.findAll();
        return ResponseEntity.ok(places);
    }

    @PutMapping("/{codePlace}")
    public ResponseEntity<Place> updatePlace(@PathVariable("codePlace") Integer codePlace, @RequestBody Place place) {
        if (!placeService.findByCodePlace(codePlace).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        place.setCodePlace(codePlace);
        Place updatedPlace = placeService.update(place);
        return ResponseEntity.ok(updatedPlace);
    }

    @DeleteMapping("/{codePlace}")
    public ResponseEntity<Void> deletePlace(@PathVariable("codePlace") Integer codePlace) {
        Optional<Place> existingPlace = placeService.findByCodePlace(codePlace);
        if (existingPlace.isPresent()) {
            placeService.delete(existingPlace.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
