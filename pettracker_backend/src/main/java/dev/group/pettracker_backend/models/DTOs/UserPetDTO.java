package dev.group.pettracker_backend.models.DTOs;

import dev.group.pettracker_backend.models.Pet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPetDTO {
    private String username;
    private Pet pet;
}