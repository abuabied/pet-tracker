package dev.group.pettracker_backend.models;



import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document(collection = "users")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class User {
    @Id
    private String username;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private Set<String> pets;

    private Set<String> visits;

    private Set<String> clinics;
    
    public User(User user) {
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.pets = Set.copyOf(user.pets);
        this.visits = Set.copyOf(user.visits);
        this.clinics = Set.copyOf(user.clinics);
    }

}
