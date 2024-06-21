package dev.group.pettracker_backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "visits")
@AllArgsConstructor
@NoArgsConstructor
public class Visit {
    private String id;

    private Data date;

    private String userId;

    private String petName;

    private String clinic;

    private String description;

    private String status;


}
