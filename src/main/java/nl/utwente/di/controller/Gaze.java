package nl.utwente.di.controller;

import nl.utwente.di.model.Gps;
import nl.utwente.di.model.Room;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

public class Gaze {

    public static List<String> lookUpForRooms(int requestID) {
        Map<String, Double> map = new HashMap<>();
        String date = null;
        String sql = "SELECT newdate FROM request WHERE id = ?;";
        try (Connection conn = DatabaseCommunication.connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, requestID);
            ResultSet resultSet = pstmt.executeQuery();
            if (resultSet.next()) {
                date = resultSet.getString(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        long timestamp = Date.parse(date);
//        System.out.println(timestamp);
            sql = "SELECT r.room_number, r.gps_coordinates, rq.oldroom FROM room r, request rq WHERE " +
                    "(to_tsvector(rq.notes)@@to_tsquery(r.features) OR to_tsvector(rq.notes)@@to_tsquery(r.building))" +
                    "AND rq.id = ? AND r.capacity_real >= rq.numberofstudents AND NOT EXISTS " +
                    "(SELECT activity_id FROM activities WHERE location LIKE r.room_number AND startdate = ?)";
            Map<String, Room> roomMap = DatabaseCommunication.getRooms();
            Gps oldRoomCoordinates = null;
            try (Connection connection = DatabaseCommunication.connect();
                 PreparedStatement pstmt = connection.prepareStatement(sql)) {
                pstmt.setInt(1, requestID);
                pstmt.setLong(2, timestamp);
                ResultSet resultSet = pstmt.executeQuery();
                if (resultSet.next()) {
                    oldRoomCoordinates = roomMap.get(resultSet.getString(3)).getCoordinates();
                }
                while (resultSet.next()) {
//                    System.out.println(resultSet.getString(1));
                    String coordinates = resultSet.getString(2);
                    Gps gps = new Gps(Float.parseFloat(coordinates.split(",")[0]), Float.parseFloat(coordinates.split(",")[1]));
                    Double distance = Math.sqrt(Math.pow((oldRoomCoordinates.getxAxis() - gps.getxAxis()), 2) + Math.pow((oldRoomCoordinates.getyAxis() - gps.getyAxis()), 2));
                    map.put(resultSet.getString(1), distance);
                }
                List<String> roomsList = new ArrayList<>();
                List<Map.Entry<String, Double>> list = new ArrayList<>(map.entrySet());
                list.sort(Map.Entry.comparingByValue());
                for (Map.Entry<String, Double> search : list) {
                    roomsList.add(search.getKey());
                    System.out.println(search.getKey());
                }
                return roomsList;
            } catch (SQLException e) {
                e.printStackTrace();
            }
        return null;
    }

    public static void main(String[] args) {
        lookUpForRooms(63);
    }
}
