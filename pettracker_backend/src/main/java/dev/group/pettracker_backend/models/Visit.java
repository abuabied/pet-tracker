package dev.group.pettracker_backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "visits")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Visit {
    private String id;

    private String date;

    private String petName;

    private String clinic;

    private String description;

    private String nextVisit;
}
