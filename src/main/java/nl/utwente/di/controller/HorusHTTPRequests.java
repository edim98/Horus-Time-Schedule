package nl.utwente.di.controller;

import nl.utwente.di.model.Request;
import nl.utwente.di.model.Room;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.Map;

@Path("/requests")
public class HorusHTTPRequests {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Room> getRequests() {
        return DatabaseCommunication.getRooms();
    }

}
