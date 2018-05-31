package nl.utwente.di.controller;

import nl.utwente.di.model.Lecturer;
import nl.utwente.di.model.Request;
import nl.utwente.di.model.Room;
import org.json.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public void addRequest(String requestString) {
        JSONObject jsonObject = new JSONObject(requestString);
        Map<String, Room> rooms = DatabaseCommunication.getRooms();
        int id = DatabaseCommunication.getId("request") + 1;
        Room oldRoom = rooms.get(jsonObject.getString("oldRoom"));
        Room newRoom = rooms.get(jsonObject.getString("newRoom"));
        for (Map.Entry<String, Room> search : rooms.entrySet()) {
            System.out.println(search.getKey());
        }
        String oldDate = jsonObject.getString("oldDate");
        String newDate = jsonObject.getString("newDate");
        String teacherID = jsonObject.getString("teacherID");
        int numberOfStudents = jsonObject.getInt("numberOfStudents");
        String requestType = jsonObject.getString("type");
        Request request = new Request(id, oldRoom, newRoom, oldDate, newDate, teacherID, numberOfStudents, requestType);
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
