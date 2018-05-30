package nl.utwente.di.controller;

import nl.utwente.di.model.Gps;
import nl.utwente.di.model.Lecturer;
import nl.utwente.di.model.Request;
import nl.utwente.di.model.Room;

import javax.ws.rs.Consumes;
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

//    public static void generateTables() {
//        String sql = "CREATE TABLE IF NOT EXISTS Room(" +
//                    "room_number text, " +
//                    "building text, " +
//                    "room_nr text, " +
//                    "trivial_name text, " +
//                    "area real, " +
//                    "capacity_timetable integer," +
//                    "capacity_lecture integer," +
//                    "capacity_work integer, " +
//                    "capacity_exam integer, " +
//                    "capacity_real integer, " +
//                    "first_row_handicapped integer, " +
//                    "handicapped integer, " +
//                    "furniture text, " +
//                    "x_axis float, " +
//                    "y_axis float, " +
//                    "floor_nr integer" +
//                    ");";
//        executeSQL(sql);
//
//        sql = "CREATE TABLE IF NOT EXISTS Teacher(" +
//                    "teacherID text, " +
//                    "name text, " +
//                    "phone_number text, " +
//                    "email_address " +
//                    ");";
//        executeSQL(sql);
//
//        sql = "CREATE TABLE IF NOT EXISTS Course(" +
//                    "courseID integer, " +
//                    "name text, " +
//                    "module text, " +
//                    "type text" +
//                    ");";
//        executeSQL(sql);
//
//        sql = "CREATE TABLE IF NOT EXISTS Request(" +
//                    "id integer, " +
//                    "old_room text, " +
//                    "new_room text, " +
//                    "old_date text, " +
//                    "new_date text, " +
//                    "number_of_students integer, " +
//                    "teacher_id text, " +
//                    "type_of_request text " +
//                    ");";
//        executeSQL(sql);
//    }

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
                Gps coordinates = new Gps(result.getFloat(14), result.getFloat(15));
                int floornumber = result.getInt(16);
                Room room = new Room(roomNumber, building, shortRoomNumber, trivialName, area,
                        capacityTimetable, capacityLecture, capacityWork, capacityExam, capacityReal,
                        firstRowHandicapped, handicapped, furniture, coordinates, floornumber);
                rooms.put(shortRoomNumber, room);
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
                Room newRoom = rooms.get(result.getString(3));
                String oldDate = result.getString(4);
                String newDate = result.getString(5);
                String teacherID = result.getString(7);
                int numberOfStrudents = result.getInt(6);
                String type = result.getString(8);
                Request request = new Request(id, oldRoom, newRoom, oldDate, newDate, teacherID, numberOfStrudents, type);
                requests.add(request);
            }
            return requests;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return requests;
    }

    public static void addNewRequest(Request request) {
        String sql = "INSERT INTO request VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
        try(Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, request.getId());
            pstmt.setString(2, request.getOldRoom().getRoomNumber());
            pstmt.setString(3, request.getNewRoom().getRoomNumber());
            pstmt.setString(4, request.getOldDate());
            pstmt.setString(5, request.getNewDate());
            pstmt.setInt(6, request.getNumberOfStudents());
            pstmt.setString(7, request.getTeacherID());
            pstmt.setString(8, request.getType());
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

    public static boolean getUSer(String id, String password) {
        String sql = "SELECT * FROM lecturer WHERE (teacherID = ? OR email = ?) AND password = ?;";
        try(Connection conn = connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, id);
            pstmt.setString(2, id);
            pstmt.setString(3, password);
            ResultSet resultSet = pstmt.executeQuery();
            return resultSet.next();

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public static void main(String[] args) {
//        DatabaseCommunication.generateTables();
//        System.out.println(DatabaseCommunication.getRequests());
//        System.out.println(DatabaseCommunication.getId("request"));
    }

}
