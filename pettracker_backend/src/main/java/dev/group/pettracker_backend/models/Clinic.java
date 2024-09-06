package dev.group.pettracker_backend.models;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "clinics")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Clinic {
    private String name;
    private String address;
    private String number;
}
