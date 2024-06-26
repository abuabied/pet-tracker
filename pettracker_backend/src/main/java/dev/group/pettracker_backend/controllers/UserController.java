package dev.group.pettracker_backend.controllers;

import dev.group.pettracker_backend.models.User;
import dev.group.pettracker_backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



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

//    @PostMapping("/addGame")
//    public ResponseEntity<String> addGameToUserCollection(@RequestBody UserGameDto userGameDto) {
//        if (userGameDto == null) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//        User user = userGameDto.getUser();
//        Game game = userGameDto.getGame();
//
//        if (user == null || game == null) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//        return userService.addGameToCollection(user, game);
//    }
//
//    @PostMapping("/removeGame")
//    public ResponseEntity<String> removeGameFromUserCollection(@RequestBody UserGameDto userGameDto) {
//        if (userGameDto == null) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//        User user = userGameDto.getUser();
//        Game game = userGameDto.getGame();
//
//        if (user == null || game == null) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//        return userService.removeGameFromCollection(user, game);
//    }
//
//    @PostMapping("/getGamesCollection")
//    public ResponseEntity<Collection<Game>> getUserGamesCollection(@RequestBody User user) {
//        if (user == null) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//        return userService.getGamesCollection(user);
//    }
}
