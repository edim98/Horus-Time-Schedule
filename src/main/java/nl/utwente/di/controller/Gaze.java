package nl.utwente.di.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Gaze {

    public static void lookUpForRooms() {
        String[] query = new String[15];
        String sql = "SELECT building FROM room GROUP BY building";
        try(Connection conn = DatabaseCommunication.connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            ResultSet resultSet = pstmt.executeQuery();
            int index = 0;
            while (resultSet.next()) {
                query[index] += resultSet.getString(1);
                index++;
            }
//            query = query.replace(query.substring(query.length() - 3), "");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        for (int i = 0; i < query.length; i++) {
            sql = "SELECT r.room_number FROM room r, request rq WHERE to_tsvector(rq.notes)@@to_tsquery(Carre) AND rq.id = ?";
            try (Connection connection = DatabaseCommunication.connect();
                 PreparedStatement pstmt = connection.prepareStatement(sql)) {
//                pstmt.setString(1, query[i]);
                pstmt.setInt(1, 37);
                ResultSet resultSet = pstmt.executeQuery();
                while (resultSet.next()) {
                    System.out.println(resultSet.getString(1));
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        lookUpForRooms();
    }
}
