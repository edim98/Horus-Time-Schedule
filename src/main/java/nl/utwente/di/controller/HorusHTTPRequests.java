package nl.utwente.di.controller;

import nl.utwente.di.exceptions.AlreadyConnectedException;
import nl.utwente.di.exceptions.InvalidInputException;
import nl.utwente.di.exceptions.InvalidPasswordException;
import nl.utwente.di.model.Lecturer;
import nl.utwente.di.model.Request;
import nl.utwente.di.model.Room;
import nl.utwente.di.model.Status;
import nl.utwente.di.security.Encryption;
import nl.utwente.di.security.PasswordStorage;
import org.json.JSONObject;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.InvalidParameterSpecException;
import java.util.List;
import java.util.Map;

import static nl.utwente.di.security.PasswordStorage.createHash;

@Path("/requests")
public class HorusHTTPRequests {

    PasswordStorage hashMaster = new PasswordStorage();

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
                          @HeaderParam("timestamp") long timestamp) throws AlreadyConnectedException, InvalidPasswordException {

        //System.out.println(username + " " + password + " " + timestamp);
        Lecturer lecturer = DatabaseCommunication.getUSer(username);

        boolean isPasswordOk = false;
        try {
            isPasswordOk = hashMaster.verifyPassword(password, lecturer.getPassword());
        } catch (PasswordStorage.CannotPerformOperationException e) {
            e.printStackTrace();
        } catch (PasswordStorage.InvalidHashException e) {
            e.printStackTrace();
        }

        if (!isPasswordOk){
            throw new InvalidPasswordException();
        }

        String sessionID = lecturer.getTeacherId() + String.valueOf(timestamp);
        Encryption e = new Encryption();
        try {
            sessionID = e.encrypt(sessionID);
        } catch (NoSuchPaddingException e1) {
            e1.printStackTrace();
        } catch (NoSuchAlgorithmException e1) {
            e1.printStackTrace();
        } catch (InvalidParameterSpecException e1) {
            e1.printStackTrace();
        } catch (UnsupportedEncodingException e1) {
            e1.printStackTrace();
        } catch (BadPaddingException e1) {
            e1.printStackTrace();
        } catch (IllegalBlockSizeException e1) {
            e1.printStackTrace();
        } catch (InvalidKeySpecException e1) {
            e1.printStackTrace();
        } catch (InvalidKeyException e1) {
            e1.printStackTrace();
        }
        if (DatabaseCommunication.checkAlreadyConnected(lecturer.getTeacherId())) {
            throw new AlreadyConnectedException();
        }
        DatabaseCommunication.addCookie(lecturer.getTeacherId(), sessionID);
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
        String teacherID = "" + jsonObject.getInt("teacherID");
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
        int teacherid = DatabaseCommunication.getLasTeacherID() + 1;
        String name = lecturerJson.getString("name");
        String password = lecturerJson.getString("password");
        String email = lecturerJson.getString("email");
        Lecturer lecturer = new Lecturer(teacherid, name, email);
        try {
            lecturer.setPassowrd(hashMaster.createHash(password));
        } catch (PasswordStorage.CannotPerformOperationException e) {
            e.printStackTrace();
            System.out.println("ERROR in password hashing");
        }
        if (DatabaseCommunication.checkExistingUser(lecturer.getEmail())) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        DatabaseCommunication.addNewUser(lecturer);
        return Response.status(Response.Status.OK).build();
    }

    @GET
    @Path("/pending/admin")
    @Produces("application/json")
    public int getPendingRequests() {
        return DatabaseCommunication.getPendingRequests();
    }

    @POST
    @Path("/pending/user")
    @Consumes("application/json")
    public int getPendingRequests(String jsonString) {
        JSONObject idJson = new JSONObject(jsonString);
        int teacherID = idJson.getInt("teacherID");
        return DatabaseCommunication.getPendingRequests(teacherID);
    }

    @POST
    @Path("/handled")
    @Consumes("application/json")
    public int getHandledRequests(String jsonString) {
        JSONObject idJson = new JSONObject(jsonString);
        int teacherID = idJson.getInt("teacherID");
        return DatabaseCommunication.getWeeklyHandledRequests(teacherID);
    }

    @POST
    @Path("/total")
    @Consumes("application/json")
    public int getTotalRequests() {
        return DatabaseCommunication.getTotalRequests();
    }

    @POST
    @Path("/accepted")
    @Consumes("application/json")
    public int getAcceptedRequests(String jsonString) {
        JSONObject idJson = new JSONObject(jsonString);
        int teacherID = idJson.getInt("teacherID");
        return DatabaseCommunication.getAcceptedRequests(teacherID);
    }

    @POST
    @Path("/cancelled")
    @Consumes("application/json")
    public int getCancelledRequests(String jsonString) {
        JSONObject idJson = new JSONObject(jsonString);
        int teacherID = idJson.getInt("teacherID");
        return DatabaseCommunication.getCancelledRequests(teacherID);
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
        int userID = jsonObject.getInt("userID");
        DatabaseCommunication.changeRequestStatus(Status.valueOf(status), id);
        DatabaseCommunication.setComments(comments, id);
        DatabaseCommunication.setNewRoom(newRoom, id);
        DatabaseCommunication.addRequestHandling(id, userID);
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

    @DELETE
    @Path("/logout")
    public Response logOut(@HeaderParam("user") int userID) {
        DatabaseCommunication.deletCookie(userID);
        return Response.status(Response.Status.ACCEPTED).build();
    }
}
