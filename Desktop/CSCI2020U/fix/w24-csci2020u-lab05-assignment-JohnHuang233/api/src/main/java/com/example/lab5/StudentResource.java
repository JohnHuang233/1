package com.example.lab3;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;

@Path("/students")
public class StudentResource {


    @GET
    @Path("/json")
    @Produces("application/json")
    public String json() {
        return readFileContents("/students.json");
    }

    @GET
    @Path("/csv")
    @Produces("text/csv")
    public String csv() {
        return readFileContents("/students.csv");
    }

    @GET
    @Path("/xml")
    @Produces("application/xml")
    public String xml() {
        return readFileContents("/students.xml");
    }

    private String readFileContents(String filename) {
        try {
            java.net.URL url = StudentResource.class.getResource(filename);
            if (url == null) {
                return "Resource not found: " + filename;
            }

            java.nio.file.Path file = java.nio.file.Path.of(url.toURI());

            return Files.readString(file);
        } catch (IOException | URISyntaxException e)  {
            // something went wrong
            return "Did you forget to create the file?\n" +
                    "Is the file in the right location?\n" +
                    e.toString();
        }
    }


}
