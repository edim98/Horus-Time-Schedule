package nl.utwente.di.model;

public class Request {

    private int id;
    private Room oldRoom;
    private Room newRoom;
    private String oldDate;
    private String newDate;
    private String teacherID;
    private int studentsNumber;

    public Request(int id, Room oldRoom, Room newRoom, String oldDate, String newDate,
                   String teacherID, int studentsNumber) {
        this.oldDate = oldDate;
        this.newDate = newDate;
        this.id = id;
        this.newRoom = newRoom;
        this.oldRoom = oldRoom;
        this.teacherID = teacherID;
        this.studentsNumber = studentsNumber;
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

    public void setStudentsNumber(int studentsNumber) {
        this.studentsNumber = studentsNumber;
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

    public int getStudentsNumber() {
        return studentsNumber;
    }

    public String getTeacherID() {
        return teacherID;
    }
}
