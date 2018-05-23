package nl.utwente.di.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseCommunication {

    private static final String FILENAME = "horusdb.db";
    private static final String URL = "jdbc:sqlite:" + FILENAME;

    private static Connection connect() {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(URL);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }

    private static void executeSQL(String sql) {
        try (Connection conn = connect();
             Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public static void generateTables() {
        String sql = "CREATE TABLE IF NOT EXISTS Room(" +
                    "room_number text, " +
                    "building text, " +
                    "room_nr text, " +
                    "trivial_name text, " +
                    "area real, " +
                    "capacity_timetable integer," +
                    "capacity_lecture integer," +
                    "capacity_work integer, " +
                    "capacity_exam integer, " +
                    "first_row handicapped integer, " +
                    "handicapped integer, " +
                    "furniture text, " +
                    "gps_coordinates text, " +
                    "floor_nr integer" +
                    ");";
        executeSQL(sql);

        sql = "CREATE TABLE IF NOT EXISTS Teacher(" +
                    "teacherID text, " +
                    "name text, " +
                    "phone_number text, " +
                    "email_address " +
                    ");";
        executeSQL(sql);

        sql = "CREATE TABLE IF NOT EXISTS Course(" +
                    "courseID integer, " +
                    "name text, " +
                    "module text, " +
                    "type text" +
                    ");";
        executeSQL(sql);

        sql = "CREATE TABLE IF NOT EXISTS Request(" +
                    "id integer, " +
                    "old_room text, " +
                    "new_room text, " +
                    "old_date text, " +
                    "new_date text, " +
                    "number_of_students integer, " +
                    "teacher_id text, " +
                    "type_of_request text " +
                    ");";
        executeSQL(sql);
    }

    public static void main(String[] args) {
        DatabaseCommunication.generateTables();
    }

}
