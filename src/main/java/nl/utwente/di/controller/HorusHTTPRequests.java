package nl.utwente.di.controller;

import nl.utwente.di.model.Lecturer;
import nl.utwente.di.model.Request;
import org.json.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.List;

@Path("/requests")
public class HorusHTTPRequests {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Request> getRequests() {
        return DatabaseCommunication.getRequests();
    }

    @POST
    @Path("/login")
    @Produces("application/json")
    public Response logIn(String loginString) {
        JSONObject loginJson = new JSONObject(loginString);
        String username = loginJson.getString("user");
        String password = loginJson.getString("password");
        if (DatabaseCommunication.getUSer(username, password) == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } else {
            return Response.status(Response.Status.OK).build();
        }
    }

    @POST
    @Consumes("application/json")
    public void addRequest(Request request) {
        request.setId(DatabaseCommunication.getId("request") + 1);
        DatabaseCommunication.addNewRequest(request);
    }
    
    @POST
    @Path("/register")
    @Consumes("application/json")
    public Response addUser(String lecturerString) {
        JSONObject lecturerJson = new JSONObject(lecturerString);
        String teacherid = lecturerJson.getString("teacherid");
        String name = lecturerJson.getString("name");
        String phone = lecturerJson.getString("phone");
        String password = lecturerJson.getString("password");
        String email = lecturerJson.getString("email");
        Lecturer lecturer = new Lecturer(teacherid, name, phone, email, password);
        if (DatabaseCommunication.checkExistingUser(lecturer.getTeacherId())) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        DatabaseCommunication.addNewUser(lecturer);
        return Response.status(Response.Status.OK).build();
    }
}
