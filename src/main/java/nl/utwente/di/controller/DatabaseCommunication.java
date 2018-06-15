package nl.utwente.di.controller;

import nl.utwente.di.model.Lecturer;
import nl.utwente.di.model.Request;
import nl.utwente.di.model.Room;

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

    private static void executeSQL(String sql) {
        try (Connection conn = connect();
             Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public static Map<String, Room> getRooms() {
        Map<String, Room> rooms = new HashMap<>();
        String sql = "SELECT * FROM Room";

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

    public static List<Request> getRequests() {
        List<Request> requests = new ArrayList<>();
        String sql = "SELECT * FROM request ORDER BY id DESC;";
        try (Connection conn = connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)){
            ResultSet result = pstmt.executeQuery();
            Map<String, Room> rooms = getRooms();
            while (result.next()) {
                int id = result.getInt(1);
                Room oldRoom = rooms.get(result.getString(2));
                String oldDate = result.getString(3);
                String newDate = result.getString(4);
                String teacherID = result.getString(5);
                String name = result.getString(6);
                int numberOfStrudents = result.getInt(7);
                String type = result.getString(8);
                String notes = result.getString(9);
                String courseType = result.getString(10);
                String faculty = result.getString(11);
                Request request = new Request(id, oldRoom, oldDate, newDate, teacherID, name,
                        numberOfStrudents, type, notes, courseType, faculty);
                requests.add(request);
            }
            return requests;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return requests;
    }

    public static void addNewRequest(Request request) {
        String sql = "INSERT INTO request(old_room, old_date, new_date, teacher_id, teacher_name, number_of_students, type, notes, course_type, faculty)" +
                " VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try(Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, request.getOldRoom().getRoomNumber());
            pstmt.setString(2, request.getOldDate());
            pstmt.setString(3, request.getNewDate());
            pstmt.setInt(4, request.getNumberOfStudents());
            pstmt.setString(5, request.getTeacherID());
            pstmt.setString(6, request.getTeacherName());
            pstmt.setString(7, request.getType());
            pstmt.setString(8, request.getNotes());
            pstmt.setString(9, request.getCourseType());
            pstmt.setString(10, request.getFaculty());
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static int getId(String table) {
        String sql = "SELECT id FROM " + table + " t WHERE NOT EXISTS" +
                "(SELECT id FROM " + table + " WHERE id = t.id + 1) LIMIT 1;";
        try(Connection conn = connect();
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

    public static Lecturer getUSer(String id, String password) {
        String sql = "SELECT * FROM users  WHERE email = ? AND password = ?;";
        Lecturer l;
        try(Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id);
            pstmt.setString(2, password);
            ResultSet resultSet = pstmt.executeQuery();
            if (resultSet.next()) {
                l = new Lecturer(resultSet.getString("user_id"), resultSet.getString("staff_name"), resultSet.getString("email"));
                l.setPassowrd(resultSet.getString("password"));
                l.setTimetabler(resultSet.getBoolean("is_timetabler"));
                return l;
            }
            return null;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static boolean checkExistingUser(String lecturerid) {
        String sql = "SELECT * FROM lecturer WHERE teacherid = ?;";
        try(Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, lecturerid);
            ResultSet resultSet = pstmt.executeQuery();
            return resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
    
    public static void addNewUser(Lecturer lecturer) {
        String sql = "INSERT INTO users VALUES(?, ?, ?, ?, ?)";
        try(Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, lecturer.getTeacherId());
            pstmt.setString(2, lecturer.getName());
            pstmt.setString(3, lecturer.getEmail());
            pstmt.setString(4, lecturer.getPassword());
            pstmt.setBoolean(5, lecturer.isTimetabler());
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static boolean checkValidRoom(String roomNr) {
        String sql = "SELECT FROM room WHERE room_number = ?;";
        try (Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, roomNr);
            ResultSet resultSet = pstmt.executeQuery();
            return resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public static ResultSet getLecturer() {
        String sql = "SELECT email FROM lecturer;";
        try(Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            ResultSet resultSet = pstmt.executeQuery();
            return resultSet;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void main(String[] args) {
//        DatabaseCommunication.generateTables();
//        System.out.println(DatabaseCommunication.getRequests());
//        Lecturer l = new Lecturer("m2008491", "Eduard Modreanu", "29763754892984", "email", "hashedpass_bitch!");
//        DatabaseCommunication.addNewUser(l);
//        System.out.println(DatabaseCommunication.getId("request"));
//        System.out.println(DatabaseCommunication.getUSer("m2008491", "hashedpass_bitch!"));
//        System.out.println(DatabaseCommunication.getLecturer());
    }

}
