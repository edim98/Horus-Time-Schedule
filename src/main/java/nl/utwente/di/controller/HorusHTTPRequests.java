package nl.utwente.di.controller;

import nl.utwente.di.model.Lecturer;
import nl.utwente.di.model.Request;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;
import java.util.List;

@Path("/requests")
public class HorusHTTPRequests {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Request> getRequests() {
        return DatabaseCommunication.getRequests();
    }

    @GET
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public boolean logIn(@QueryParam("user") String id,
                        @QueryParam("password") String password) {
        return DatabaseCommunication.getUSer(id, password);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addRequest(Request request) {
        request.setId(DatabaseCommunication.getId("request") + 1);
        DatabaseCommunication.addNewRequest(request);
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addUser(Lecturer lecturer) {
        DatabaseCommunication.addNewUser(lecturer);
    }
}
