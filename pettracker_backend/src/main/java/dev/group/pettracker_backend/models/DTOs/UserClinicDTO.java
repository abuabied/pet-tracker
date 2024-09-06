package dev.group.pettracker_backend.models.DTOs;

import dev.group.pettracker_backend.models.Clinic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserClinicDTO {
    private String username;
    private Clinic clinic;
}
