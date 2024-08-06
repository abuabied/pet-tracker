package dev.group.pettracker_backend.services;

import dev.group.pettracker_backend.Helpers.HelperFunctions;
import dev.group.pettracker_backend.Repositories.UserRepository;
import dev.group.pettracker_backend.models.Pet;
import dev.group.pettracker_backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service("user")
@Scope(value = BeanDefinition.SCOPE_PROTOTYPE)
public class UserService {
    // let framework know to initialize the object for us
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<HttpStatus> authUser(User user) {
        try {
            Optional<User> checkUser = checkIfUserExists(user);
            if (checkUser.isPresent()) {
                if (HelperFunctions.comparePasswords(user.getPassword(), checkUser.get().getPassword()) == 0) {
                    return new ResponseEntity<>(HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.FORBIDDEN);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        } catch (Exception err) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<HttpStatus> registerUser(User user) {
        try {
            if (checkIfUserExists(user).isEmpty()) {
                String hashedPassword = HelperFunctions.hashPassword(user.getPassword());
                user.setPassword(hashedPassword);
                user.setClinics(new HashSet<>());
                user.setPets(new HashSet<>());
                user.setVisits(new HashSet<>());
                userRepository.save(user);
                return createGoodResponse(user.getUsername(), HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception err) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<HttpStatus> updateUser(User user) {
        try {
            userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception err) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<User> getUser(User user) {
        try {
            Optional<User> checkUser = userRepository.findByUsername(user.getUsername());
            if (checkUser.isPresent()) {
                checkUser.get().setPassword("");
                return new ResponseEntity<>(checkUser.get(), HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception err) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> addPet(Pet pet, String username) {
        try {
            Optional<User> userToUpdate = userRepository.findByUsername(username);
            if (!userToUpdate.isEmpty()) {
                if (userToUpdate.get().getPets() == null) {
                    userToUpdate.get().setPets(new HashSet<>());
                }
                userToUpdate.get().getPets().add(pet);
                if (userRepository.save(userToUpdate.get()) != null) {
                    return new ResponseEntity<>(HttpStatus.OK);
                }
                return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception err) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<HashSet<Pet>> getPets(String username) {
        try {
            Optional<User> userToUpdate = userRepository.findByUsername(username);
            if (!userToUpdate.isEmpty()) {
                if (userToUpdate.get().getPets() == null) {
                    userToUpdate.get().setPets(new HashSet<>());
                }
                HashSet<Pet> pets = userToUpdate.get().getPets();
                return new ResponseEntity<>(pets, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception err) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // public ResponseEntity<String> removeGameFromCollection(User user, Game game)
    // {
    // try {
    // Optional<User> userToUpdate =
    // userRepository.findByUsername(user.getUsername());
    // if (!userToUpdate.isEmpty()) {
    // if (userToUpdate.get().getGameCollection() != null) {
    // userToUpdate.get().getGameCollection().remove(game.getGameID());
    // if (userRepository.save(userToUpdate.get()) != null) {
    // String gameIDsString = HelperFunctions
    // .getGameCollectionItemsAsIDString(userToUpdate.get().getGameCollection());
    // return new ResponseEntity<>(gameIDsString, HttpStatus.OK);
    // } else {
    // return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    // }
    // } else {
    // return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    // }
    // } else {
    // return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // }
    // } catch (Exception err) {
    // return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    // }
    //
    // public ResponseEntity<Collection<Game>> getGamesCollection(User user) {
    // try {
    // Optional<User> checkUser = userRepository.findByUsername(user.getUsername());
    // if (!checkUser.isEmpty()) {
    // checkUser.get().setPassword("");
    // return new ResponseEntity<>(checkUser.get().getGameCollection().values(),
    // HttpStatus.OK);
    // }
    // return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // } catch (Exception err) {
    // return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    // }

    private Optional<User> checkIfUserExists(User user) {
        Optional<User> checkUser = Optional.empty();
        try {
            if (!user.getUsername().isEmpty()) {
                checkUser = userRepository.findByUsername(user.getUsername());
            } else if (!user.getEmail().isEmpty()) {
                checkUser = userRepository.findByEmail(user.getEmail());
            }
        } catch (Exception err) {
            return Optional.empty();
        }
        return checkUser;
    }

    private ResponseEntity<HttpStatus> createGoodResponse(String username, HttpStatus status) {
        // ResponseCookie cookie = HelperFunctions.createCookieForUser(username);
        ResponseEntity<HttpStatus> response = new ResponseEntity<>(status);
        return response;
    }
}
