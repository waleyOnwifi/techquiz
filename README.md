package com.fanhub;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @POST
    @Path("/register")
    public String register(RegisterRequest request) {

        return """
        
                {
                    "message": "Registration successful!",
                    "username": "%s",
                    "email": "%s"
                }
                """.formatted(request.username, request.email);
    }

    public static class RegisterRequest {

        public String username;
        public String email;
        public String password;
    }
}
