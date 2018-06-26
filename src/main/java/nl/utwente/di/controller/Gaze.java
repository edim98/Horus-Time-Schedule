package nl.utwente.di.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Gaze {

    public static void lookUpForRooms(int requestID) {
        String sql = "SELECT comms FROM request WHERE id = ? AND requesttype = 'reschedule';";
        String comments = "";
        try(Connection conn = DatabaseCommunication.connect();
            PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, requestID);
            ResultSet resultSet = pstmt.executeQuery();
            if (resultSet.next()) {
                comments = resultSet.getString(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }



}
