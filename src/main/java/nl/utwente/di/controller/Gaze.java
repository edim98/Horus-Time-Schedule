package nl.utwente.di.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Gaze {

    public static void lookUpForRooms(int requestID) {
//        List<String> queries = new ArrayList<>();
        String sql = "SELECT r.room_number, r.gps_coordinates FROM room r, request rq WHERE " +
                "(to_tsvector(rq.notes)@@to_tsquery(r.building)) " +
                "AND rq.id = ?";
        try (Connection connection = DatabaseCommunication.connect();
             PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, requestID);
            ResultSet resultSet = pstmt.executeQuery();
            while (resultSet.next()) {
                System.out.println(resultSet.getString(1));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        lookUpForRooms(42);
    }
}
