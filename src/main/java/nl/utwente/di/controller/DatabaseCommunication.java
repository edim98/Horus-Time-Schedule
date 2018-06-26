package nl.utwente.di.controller;

import nl.utwente.di.model.Lecturer;
import nl.utwente.di.model.Request;
import nl.utwente.di.model.Room;
import nl.utwente.di.model.Status;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



public class DatabaseCommunication {

    private static final String URL = "jdbc:postgresql://farm09.ewi.utwente.nl:7054/docker";

    private static Connection connect() {
        try {
            Class.forName("org.postgresql.Driver");
            Connection conn = DriverManager.getConnection(URL, "docker", "YCPP2vGfS");
            return conn;

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static Map<String, Room> getRooms() {
        Map<String, Room> rooms = new HashMap<>();
        String sql = "SELECT * FROM room";

        try {
            Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql);
            ResultSet result = pstmt.executeQuery();
            while(result.next()) {
                String roomNumber = result.getString(1);
                String building = result.getString(2);
                String shortRoomNumber = result.getString(3);
                String trivialName = result.getString(4);
                float area = result.getFloat(5);
                int capacityTimetable = result.getInt(6);
                int capacityLecture = result.getInt(7);
                int capacityWork = result.getInt(8);
                int capacityExam = result.getInt(9);
                int capacityReal = result.getInt(10);
                int firstRowHandicapped = result.getInt(11);
                int handicapped = result.getInt(12);
                String furniture = result.getString(13);
                String coordinates = result.getString(14);
                int floornumber = result.getInt(15);
                Room room = new Room(roomNumber, building, shortRoomNumber, trivialName, area,
                        capacityTimetable, capacityLecture, capacityWork, capacityExam, capacityReal,
                        firstRowHandicapped, handicapped, furniture, coordinates, floornumber);
                rooms.put(roomNumber, room);
            }
            return rooms;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rooms;
    }

    private static List<Request> createRequestList(ResultSet resultSet) throws SQLException {
        List<Request> requests = new ArrayList<>();
        Map<String, Room> rooms = getRooms();
        while (resultSet.next()) {
            int id = resultSet.getInt(1);
            Room oldRoom = rooms.get(resultSet.getString(2));
            String oldDate = resultSet.getString(3);
            String newDate = resultSet.getString(4);
            String teacherID = resultSet.getString(5);
            String name = resultSet.getString(6);
            int numberOfStrudents = resultSet.getInt(7);
            String type = resultSet.getString(8);
            String notes = resultSet.getString(9);
            String courseType = resultSet.getString(10);
            String faculty = resultSet.getString(11);
            String status = resultSet.getString(12);
            String newRoom = resultSet.getString(13);
            String comments = resultSet.getString(14);
            Request request = new Request(id, oldRoom, oldDate, newDate, teacherID, name,
                    numberOfStrudents, type, notes, courseType, faculty);
            request.setStatus(status);
            request.setNewRoom(newRoom);
            request.setComments(comments);
            requests.add(request);
        }
        return requests;
    }

    public static List<Request> getRequests() {
        String sql = "SELECT * FROM request ORDER BY id DESC;";
        try (Connection conn = connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)){
            ResultSet result = pstmt.executeQuery();
            return createRequestList(result);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void addNewRequest(Request request) {
        String sql = "INSERT INTO request(oldroom, olddate, newdate, teacherid, teachername, numberofstudents, requesttype, notes, coursetype, faculty, status, newroom, comms)" +
                " VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try(Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, request.getOldRoom().getRoomNumber());
            pstmt.setString(2, request.getOldDate());
            pstmt.setString(3, request.getNewDate());
            pstmt.setString(4, request.getTeacherID());
            pstmt.setString(5, request.getTeacherName());
            pstmt.setInt(6, request.getNumberOfStudents());
            pstmt.setString(7, request.getType());
            pstmt.setString(8, request.getNotes());
            pstmt.setString(9, request.getCourseType());
            pstmt.setString(10, request.getFaculty());
            pstmt.setString(11, request.getStatus().toString());
            pstmt.setString(12, request.getNewRoom());
            pstmt.setString(13, request.getComments());
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static int getInt(String sql) {
        try (Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            ResultSet resultSet = pstmt.executeQuery();
            if (resultSet.next()) {
                return resultSet.getInt(1);
            }
            return 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }

    public static int getId(String table) {
        String sql = "SELECT id FROM " + table + " t WHERE NOT EXISTS" +
                "(SELECT id FROM " + table + " WHERE id = t.id + 1) LIMIT 1;";
        return getInt(sql);
    }

    public static Lecturer getUSer(String id, String password) {
        String sql = "SELECT * FROM users  WHERE email = ? AND password = ?;";
        Lecturer l;
        try(Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id);
            pstmt.setString(2, password);
            ResultSet resultSet = pstmt.executeQuery();
            if (resultSet.next()) {
                l = new Lecturer(resultSet.getInt("user_id"), resultSet.getString("staff_name"), resultSet.getString("email"));
                l.setPassowrd(resultSet.getString("password"));
                l.setTimetabler(resultSet.getBoolean("is_timetabler"));
                return l;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static boolean check(String sql, String check) {
        try (Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, check);
            ResultSet resultSet = pstmt.executeQuery();
            return resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public static boolean checkExistingUser(String lecturerid) {
        String sql = "SELECT * FROM users WHERE email = ?;";
        return check(sql, lecturerid);
    }

    public static void addNewUser(Lecturer lecturer) {
        String sql = "INSERT INTO users VALUES(?, ?, ?, ?, ?)";
        try(Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, lecturer.getTeacherId());
            pstmt.setString(2, lecturer.getEmail());
            pstmt.setString(3, lecturer.getPassword());
            pstmt.setString(4, lecturer.getName());
            pstmt.setBoolean(5, lecturer.isTimetabler());
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        sql = "INSERT INTO favourites(id) VALUES (?);";
        try (Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, lecturer.getTeacherId());
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static boolean checkValidRoom(String roomNr) {
        String sql = "SELECT FROM room WHERE room_number = ?;";
        return check(sql, roomNr);
    }

    public static void change() {
        String sql = "UPDATE request SET status = 'pending'";
        try(Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static int getPendingRequests() {
        String sql = "SELECT count(*) FROM request WHERE status = 'pending';";
        return getInt(sql);
    }
    public static void changeRequestStatus(Status status, int id) {
        String sql = "UPDATE request SET status = ? WHERE id = ? AND status = 'pending'";
        try (Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, status.toString());
            pstmt.setInt(2, id);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static List<Request> getRequests(String user) {
        String sql = "SELECT * FROM request WHERE teachername = ?;";
        try (Connection connection = connect();
            PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, user);
            ResultSet result = pstmt.executeQuery();
            return createRequestList(result);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    private static void update(String sql, String change, int userID) {
        try (Connection conn = connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, change);
            pstmt.setInt(2, userID);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void sql(String sql, String string1, String string2) {
        try (Connection conn = connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, string1);
            pstmt.setString(2, string2);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void changeEmail(String newEmail, String name) {
        String sql = "UPDATE users SET email = ? WHERE staff_name = ?;";
        sql(sql, newEmail, name);
    }

    public static void changePassword(String password, String name, String oldPassword) {
        String sql = "UPDATE users SET password = ? WHERE staff_name = ? AND password = ?;";
        try (Connection conn = connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, password);
            pstmt.setString(2, name);
            pstmt.setString(3, oldPassword);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void setDefaultFaculty(String faculty, String staffName) {
        String sql = "UPDATE favourites SET default_faculty = ? WHERE id IN " +
                "(SELECT user_id FROM users WHERE staff_name = ?);";
        sql(sql, faculty, staffName);
    }

    public static void setNewRoom(String room, int id) {
        String sql = "UPDATE request SET newroom = ? WHERE id = ? AND requesttype = 'reschedule';";
        update(sql, room, id);
    }

    public static void setComments(String comments, int id) {
        String sql = "UPDATE request SET comms = ? WHERE id = ?;";
        update(sql, comments, id);
    }

    public static void addCookie(int user_id, String cookie) {
        String sql = "INSERT INTO cookies VALUES(?, ?);";
        try (Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, user_id);
            pstmt.setString(2, cookie);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static boolean checkAlreadyConnected(int userID) {
        String sql = "SELECT user_id FROM cookies WHERE user_id = ?;";
        try (Connection connection = connect();
            PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, userID);
            ResultSet resultSet = pstmt.executeQuery();
            return resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

//    public static String getPassword(int userID) {
//        String sql = "SELECT password FROM user WHERE user_id = ?";
//
//    }

    public static void main(String[] args) {
//        DatabaseCommunication.change();
//        DatabaseCommunication.changeRequestStatus(Status.accepted, 1);
//        DatabaseCommunication.favourites();
        Map<String, Room> rooms = DatabaseCommunication.getRooms();
        for (Map.Entry<String, Room> search: rooms.entrySet()) {
            System.out.println(search.getKey());
        }
    }

}
