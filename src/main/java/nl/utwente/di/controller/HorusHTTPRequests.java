package nl.utwente.di.controller;

import nl.utwente.di.model.Request;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/requests")
public class HorusHTTPRequests {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Request> getRequests() {
        return DatabaseCommunication.getRequests();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public boolean logIn() {
        return DatabaseCommunication.getUSer("", "");
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addRequest(Request request) {
        request.setId(DatabaseCommunication.getId("request") + 1);
        DatabaseCommunication.addNewRequest(request);
    }

}
