package dev.group.pettracker_backend.models.DTOs;

import dev.group.pettracker_backend.models.Visit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserVisitDTO {
    private String username;
    private Visit visit;
}