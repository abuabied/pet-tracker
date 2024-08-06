package dev.group.pettracker_backend.models;



import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;

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

    private HashSet<Pet> pets;

    private HashSet<String> visits;

    private HashSet<String> clinics;

}
