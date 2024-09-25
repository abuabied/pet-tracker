package dev.group.pettracker_backend.controllers;

import dev.group.pettracker_backend.models.Clinic;
import dev.group.pettracker_backend.models.Pet;
import dev.group.pettracker_backend.models.User;
import dev.group.pettracker_backend.models.Visit;
import dev.group.pettracker_backend.models.DTOs.UserClinicDTO;
import dev.group.pettracker_backend.models.DTOs.UserPetDTO;
import dev.group.pettracker_backend.models.DTOs.UserVisitDTO;
import dev.group.pettracker_backend.services.UserService;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = { "http://localhost:3000/" }, exposedHeaders = "*", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return new ResponseEntity<>("hi\n", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<HttpStatus> loginUser(@RequestBody User user) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return userService.authUser(user);
    }

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> registerUser(@RequestBody User user) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return userService.registerUser(user);
    }

    @PostMapping("/update")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody User user) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return userService.updateUser(user);
    }

    @PostMapping("/getUser")
    public ResponseEntity<User> getUser(@RequestBody User user) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return userService.getUser(user);
    }

    @PostMapping("/addPet")
    public ResponseEntity<String> addPet(@RequestBody UserPetDTO userPet) {
        if (userPet == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String username = userPet.getUsername();
        Pet pet = userPet.getPet();
        pet.setOwner(username);
        if (pet == null || username.equals("")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return userService.addPet(pet, username);
    }

    @PostMapping("/getPets")
    public ResponseEntity<HashSet<Pet>> getPets(@RequestBody User user) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (user.getUsername().equals("")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return userService.getPets(user.getUsername());
    }

    @PostMapping("/removePet")
    public ResponseEntity<String> removePet(@RequestBody UserPetDTO userPet) {
        if (userPet == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String username = userPet.getUsername();
        Pet pet = userPet.getPet();
        pet.setOwner(username);
        if (pet == null || username.equals("")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return userService.removePet(pet, username);
    }

    @PostMapping("/updatePet")
    public ResponseEntity<String> updatePet(@RequestBody UserPetDTO userPet) {
        if (userPet == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String username = userPet.getUsername();
        Pet pet = userPet.getPet();
        String oldName = userPet.getOldName();
        pet.setOwner(username);
        if (pet == null || username.equals("")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return userService.updatePet(oldName, pet, username);
    }

    @PostMapping("/addClinic")
    public ResponseEntity<String> addClinic(@RequestBody UserClinicDTO userClinic) {
        if (userClinic == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String username = userClinic.getUsername();
        Clinic clinic = userClinic.getClinic();

        if (clinic == null || username.equals("")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return userService.addClinic(clinic, username);
    }

    @PostMapping("/getClinics")
    public ResponseEntity<HashSet<Clinic>> getClinics(@RequestBody User user) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (user.getUsername().equals("")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return userService.getClinics(user.getUsername());
    }

    @PostMapping("/removeClinic")
    public ResponseEntity<String> removeClinic(@RequestBody UserClinicDTO userClinic) {
        if (userClinic == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String username = userClinic.getUsername();
        Clinic clinic = userClinic.getClinic();

        if (clinic == null || username.equals("")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return userService.removeClinic(clinic, username);
    }

    @PostMapping("/updateClinic")
    public ResponseEntity<String> updateClinic(@RequestBody UserClinicDTO userClinic) {
        if (userClinic == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String username = userClinic.getUsername();
        Clinic clinic = userClinic.getClinic();
        String oldName = userClinic.getOldName();

        if (clinic == null || username.equals("")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return userService.updateClinic(oldName, clinic, username);
    }

    @PostMapping("/addVisit")
    public ResponseEntity<String> addVisit(@RequestBody UserVisitDTO userVisit) {
        if (userVisit == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String username = userVisit.getUsername();
        Visit visit = userVisit.getVisit();

        if (visit == null || username.equals("")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return userService.addVisit(visit, username);
    }

    @PostMapping("/getVisits")
    public ResponseEntity<HashSet<Visit>> getVisits(@RequestBody User user) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (user.getUsername().equals("")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return userService.getVisits(user.getUsername());
    }

    @PostMapping("/getVisitsForPet")
    public ResponseEntity<HashSet<Visit>> getVisitsForPet(@RequestBody UserPetDTO userPet) {
        if (userPet == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String username = userPet.getUsername();
        Pet pet = userPet.getPet();
        if (pet == null || username.equals("")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return userService.getVisitsForPet(username, pet.getName());
    }
}
