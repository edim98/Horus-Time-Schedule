package nl.utwente.di.model;

public class Request {

    private int id;
    private Room oldRoom;
    private Room newRoom;
    private String oldDate;
    private String newDate;
    private String teacherID;
    private int numberOfStudents;
    private requestType type;
    private String notes;
    private enum requestType {
        reschedule, cancel;
    }

    public Request(int id, Room oldRoom, Room newRoom, String oldDate, String newDate,
                   String teacherID, int studentsNumber, String type, String notes) {
        this.oldDate = oldDate;
        this.newDate = newDate;
        this.id = id;
        this.newRoom = newRoom;
        this.oldRoom = oldRoom;
        this.teacherID = teacherID;
        this.numberOfStudents = studentsNumber;
        this.type = requestType.valueOf(type);
        this.notes = notes;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNewRoom(Room newRoom) {
        this.newRoom = newRoom;
    }

    public void setOldRoom(Room oldRoom) {
        this.oldRoom = oldRoom;
    }

    public void setOldDate(String oldDate) {
        this.oldDate = oldDate;
    }

    public void setNewDate(String newDate) {
        this.newDate = newDate;
    }

    public void setTeacherID(String teacherID) {
        this.teacherID = teacherID;
    }

    public void setNumberOfStudents(int numberOfStudents) {
        this.numberOfStudents = numberOfStudents;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getNotes() {
        return notes;
    }

    public void setType(String type) {
        this.type = requestType.valueOf(type);
    }

    public int getId() {
        return id;
    }

    public Room getOldRoom() {
        return oldRoom;
    }

    public Room getNewRoom() {
        return newRoom;
    }

    public String getOldDate() {
        return oldDate;
    }

    public String getNewDate() {
        return newDate;
    }

    public int getNumberOfStudents() {
        return numberOfStudents;
    }

    public String getTeacherID() {
        return teacherID;
    }

    public String getType() {
        return type.toString();
    }
}
