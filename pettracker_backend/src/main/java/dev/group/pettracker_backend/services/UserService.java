package dev.group.pettracker_backend.services;

import dev.group.pettracker_backend.Helpers.HelperFunctions;
import dev.group.pettracker_backend.Repositories.UserRepository;
import dev.group.pettracker_backend.models.Clinic;
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
                boolean flag = true;
                for (Pet pet2 : userToUpdate.get().getPets()) {
                    if (pet2.getName().compareTo(pet.getName()) == 0) {
                        flag = false;
                    }
                }
                if (flag) {
                    userToUpdate.get().getPets().add(pet);
                } else {
                    return new ResponseEntity<>(HttpStatus.CONFLICT);
                }

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

    public ResponseEntity<String> removePet(Pet pet, String username) {
        try {
            Optional<User> userToUpdate = userRepository.findByUsername(username);
            Pet tmp = null;
            for (Pet pet2 : userToUpdate.get().getPets()) {
                if (pet2.getName().compareTo(pet.getName()) == 0) {
                    tmp = pet2;
                }
            }

            if (tmp != null) {
                userToUpdate.get().getPets().remove(tmp);
            }

            if (userRepository.save(userToUpdate.get()) != null) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception err) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<String> updatePet(String oldName, Pet pet, String username) {
        try {
            Optional<User> userToUpdate = userRepository.findByUsername(username);
            if (!userToUpdate.isEmpty()) {
                if (userToUpdate.get().getPets() == null) {
                    userToUpdate.get().setPets(new HashSet<>());
                }
                Pet tmpPet = null;
                for (Pet pet2 : userToUpdate.get().getPets()) {

                    if (pet2.getName().compareTo(pet.getName()) == 0) {
                        if (pet.getName().compareTo(oldName) != 0) {
                            return new ResponseEntity<>(HttpStatus.CONFLICT);
                        }
                    }
                    if (pet2.getName().compareTo(oldName) == 0) {
                        tmpPet = pet2;
                    }
                }
                userToUpdate.get().getPets().remove(tmpPet);
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

    public ResponseEntity<String> addClinic(Clinic clinic, String username) {
        try {
            Optional<User> userToUpdate = userRepository.findByUsername(username);
            if (!userToUpdate.isEmpty()) {
                if (userToUpdate.get().getClinics() == null) {
                    userToUpdate.get().setClinics(new HashSet<>());
                }
                boolean flag = true;
                for (Clinic clinic2 : userToUpdate.get().getClinics()) {
                    if (clinic2.getName().compareTo(clinic.getName()) == 0) {
                        flag = false;
                    }
                }
                if (flag) {
                    userToUpdate.get().getClinics().add(clinic);
                } else {
                    return new ResponseEntity<>(HttpStatus.CONFLICT);
                }

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

    public ResponseEntity<HashSet<Clinic>> getClinics(String username) {
        try {
            Optional<User> userToUpdate = userRepository.findByUsername(username);
            if (!userToUpdate.isEmpty()) {
                if (userToUpdate.get().getClinics() == null) {
                    userToUpdate.get().setClinics(new HashSet<>());
                }
                HashSet<Clinic> clinics = userToUpdate.get().getClinics();
                return new ResponseEntity<>(clinics, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception err) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<String> removeClinic(Clinic clinic, String username) {
        try {
            Optional<User> userToUpdate = userRepository.findByUsername(username);
            Clinic tmp = null;
            for (Clinic clinic2 : userToUpdate.get().getClinics()) {
                if (clinic2.getName().compareTo(clinic.getName()) == 0) {
                    tmp = clinic2;
                }
            }

            if (tmp != null) {
                userToUpdate.get().getClinics().remove(tmp);
            }

            if (userRepository.save(userToUpdate.get()) != null) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception err) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

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
