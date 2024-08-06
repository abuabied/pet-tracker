package dev.group.pettracker_backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "pets")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Pet {
    private String owner;

    private String name;

    private String species;

    private String breed;

    private int age;

    private int weight;

}
