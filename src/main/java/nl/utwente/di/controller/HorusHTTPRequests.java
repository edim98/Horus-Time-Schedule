package nl.utwente.di.controller;

import nl.utwente.di.exceptions.InvalidInputException;
import nl.utwente.di.model.Lecturer;
import nl.utwente.di.model.Request;
import nl.utwente.di.model.Room;
import nl.utwente.di.model.Status;
import org.json.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

@Path("/horus/requests")
public class HorusHTTPRequests {

    @GET
    @Produces("application/json")
    public List<Request> getRequests() {
        return DatabaseCommunication.getRequests();
    }

    @GET
    @Path("/user")
    @Produces("application/json")
    public List<Request> getRequest(@HeaderParam("user") String user) {
        return DatabaseCommunication.getRequests(user);
    }

    @POST
    @Path("/login")
    @Consumes("application/json")
    @Produces("application/json")
    public Response logIn(@HeaderParam("username") String username,
                          @HeaderParam("password") String password,
                          @HeaderParam("timestamp") long timestamp) {
        //System.out.println(username + " " + password + " " + timestamp);
        Lecturer lecturer = DatabaseCommunication.getUSer(username, password);
        String sessionID = lecturer.getTeacherId() + String.valueOf(timestamp);
        if (lecturer != null) {
            JSONObject jsonObject = new JSONObject().put("teacherID", lecturer.getTeacherId())
                                                    .put("name", lecturer.getName())
                                                    .put("email", lecturer.getEmail())
                                                    .put("isAdmin", lecturer.isTimetabler())
                                                    .put("sessionID", sessionID);
            return Response.ok(jsonObject.toString(), "application/json").build();
        }  else {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    private boolean checkValidRequestJSON(JSONObject jsonObject) {
        System.out.println(jsonObject);
        return jsonObject.has("oldRoom") && jsonObject.has("oldDate") && jsonObject.has("newDate") &&
                jsonObject.has("teacherID") && jsonObject.has("numberOfStudents") && jsonObject.has("type") &&
                jsonObject.has("name") && jsonObject.has("notes") && jsonObject.has("courseType") && jsonObject.has("faculty");
    }

    @POST
    @Consumes("application/json")
    public void addRequest(String requestString) throws InvalidInputException {
        JSONObject jsonObject = new JSONObject(requestString);
        if (!checkValidRequestJSON(jsonObject)) {
            throw new InvalidInputException();
        }
        Map<String, Room> rooms = DatabaseCommunication.getRooms();
        int id = DatabaseCommunication.getId("request") + 1;
        Room oldRoom = rooms.get(jsonObject.getString("oldRoom"));
        if (!DatabaseCommunication.checkValidRoom(oldRoom.getRoomNumber())) {
            throw new InvalidInputException();
        }
        String oldDate = jsonObject.getString("oldDate");
        String newDate = jsonObject.getString("newDate");
        String teacherID = jsonObject.getString("teacherID");
        int numberOfStudents = jsonObject.getInt("numberOfStudents");
        String requestType = jsonObject.getString("type");
        String name = jsonObject.getString("name");
        String notes = jsonObject.getString("notes");
        String courseType = jsonObject.getString("courseType");
        //TODO: courseType must be derived from old date, old room and faculty
        String faculty = jsonObject.getString("faculty");
        Request request = new Request(id, oldRoom, oldDate, newDate, teacherID, name, numberOfStudents, requestType,
                notes, courseType, faculty);
        DatabaseCommunication.addNewRequest(request);
    }

    @POST
    @Path("/register")
    @Consumes("application/json")
    public Response addUser(String lecturerString) {
        JSONObject lecturerJson = new JSONObject(lecturerString);
        int teacherid = lecturerJson.getInt("teacherid");
        String name = lecturerJson.getString("name");
        String password = lecturerJson.getString("password");
        String email = lecturerJson.getString("email");
        Lecturer lecturer = new Lecturer(teacherid, name, email);
        lecturer.setPassowrd(password);
        if (DatabaseCommunication.checkExistingUser(lecturer.getEmail())) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        DatabaseCommunication.addNewUser(lecturer);
        return Response.status(Response.Status.OK).build();
    }

    @GET
    @Path("/pending")
    @Produces("application/json")
    public String getPendingRequests() {
        JSONObject jsonObject = new JSONObject().put("requests", DatabaseCommunication.getPendingRequests());
        return jsonObject.toString();
    }

    @PUT
    @Path("/statusChange")
    @Consumes("application/json")
    public Response changeStatus(String jsonBody) {
        JSONObject jsonObject = new JSONObject(jsonBody);
        String status = jsonObject.getString("status");
        int id = jsonObject.getInt("id");
        String comments = jsonObject.getString("comments");
        String newRoom = jsonObject.getString("newRoom");
        DatabaseCommunication.changeRequestStatus(Status.valueOf(status), id);
        DatabaseCommunication.setComments(comments, id);
        DatabaseCommunication.setNewRoom(newRoom, id);
        return Response.status(Response.Status.OK).build();
    }

    @PUT
    @Path("/changeEmail")
    @Consumes("application/json")
    public Response changeEmail(@HeaderParam("newEmail") String newEmail,
                                @HeaderParam("user") String userName) {
        DatabaseCommunication.changeEmail(newEmail, userName);
        return Response.status(Response.Status.OK).build();
    }

    @PUT
    @Path("/changePassword")
    @Consumes("application/json")
    public Response changePassword(@HeaderParam("newPass") String newPass,
                                   @HeaderParam("user") String userName,
                                   @HeaderParam("oldPass") String oldPass) {
        DatabaseCommunication.changePassword(newPass, userName, oldPass);
        return Response.status(Response.Status.OK).build();
    }

    @PUT
    @Path("/changeName")
    @Consumes("application/json")
    public Response setDefaultFaculty(@HeaderParam("faculty") String faculty,
                                      @HeaderParam("user") String name) {
        DatabaseCommunication.setDefaultFaculty(faculty, name);
        return Response.status(Response.Status.OK).build();
    }
}
