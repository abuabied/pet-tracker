package dev.group.pettracker_backend.Helpers;
import com.google.common.hash.Hashing;


import java.nio.charset.StandardCharsets;

public abstract class HelperFunctions {
    public static int comparePasswords(String unhashedPassword, String hashedPassword) {
        String newHashedPassword = hashPassword(unhashedPassword);
        return newHashedPassword.compareTo(hashedPassword);
    }

    public static String hashPassword(String password) {
        return Hashing.sha256()
                .hashString(password, StandardCharsets.UTF_8)
                .toString();
    }
}