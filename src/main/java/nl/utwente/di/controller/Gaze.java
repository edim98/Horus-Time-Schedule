package nl.utwente.di.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Gaze {

    public static void lookUpForRooms() {
        String query = "";
        String sql = "SELECT building FROM room GROUP BY building";
        try(Connection conn = DatabaseCommunication.connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            ResultSet resultSet = pstmt.executeQuery();
            while (resultSet.next()) {
                System.out.println(resultSet.getString(1));
                query += resultSet.getString(1);
                if (!resultSet.isLast()) {
                    query += " | ";
                }
            }
//            query = query.replace(query.substring(query.length() - 3), "");
            System.out.println(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        sql = "SELECT r.room_number FROM room r, request rq WHERE to_tsvector(rq.notes)@@to_tsquery(?) AND rq.id = ?";
        try (Connection connection = DatabaseCommunication.connect();
            PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, query);
            pstmt.setInt(2, 37);
            ResultSet resultSet = pstmt.executeQuery();
            while (resultSet.next()) {
                System.out.println(resultSet.getString(1));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        lookUpForRooms();
    }
}
