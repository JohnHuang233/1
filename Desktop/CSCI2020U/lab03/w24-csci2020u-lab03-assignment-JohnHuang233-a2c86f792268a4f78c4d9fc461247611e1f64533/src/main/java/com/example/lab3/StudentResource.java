package com.example.lab3;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

import java.io.IOException;
import java.nio.file.Files;

@Path("/students")
public class StudentResource {

    /**
     * This function retrieves a file using Java's built-in reflection functions.
     * This is because Java doesn't look in the directory you think it does on start up, this
     * is a way of guaranteeing it will return the absolute path of the file you're trying to read from.
     * @param filename the name of the file
     * @return the file's contents
     */
    private String readFileContents(String filename) {
        /**
         * if there is no '/' at the beginning, the following function call will return `null`
         */
        String f;
        if (filename.charAt(0) != '/') {
            f = '/' + filename;
        } else {
            f = filename;
        }

        /**
         * trying to open and read the file
         */
        try {
            java.nio.file.Path file = java.nio.file.Path.of(
                    StudentResource.class.getResource(f)
                            .toString()
                            .substring(6));
            return Files.readString(file);
        } catch (IOException e) {
            // something went wrong
            return "Did you forget to create the file?\n" +
                    "Is the file in the right location?\n" +
                    e.toString();
        }
    }

    // TO DO ...

}
