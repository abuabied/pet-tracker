package dev.group.pettracker_backend.models;

import lombok.AllArgsConstructor;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pets")
public class Pet {
    @Id
    private String id;

    private String owner;

    private String name;

    private String species;

    private String breed;

    private int age;

    private int weight;

}
