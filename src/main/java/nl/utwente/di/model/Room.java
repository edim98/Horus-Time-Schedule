package nl.utwente.di.model;

public class Room {
    private String roomNumber;
    private String building;
    private String shortRoomNumber;
    private String trivialName;
    private float area;
    private int capacityTimetable;
    private int capacityLecture;
    private int capacityWork;
    private int capacityExam;
    private int capacityReal;
    private int firstRowHandicapped;
    private int handicapped;
    private String furniture;
    private Gps coordinates;
    private int floorNumber;

    public Room(String roomNumber, String building, String shortRoomNumber, String trivialName, float area,
                int capacityTimetable, int capacityLecture, int capacityWork, int capacityExam, int capacityReal,
                int firstRowHandicapped, int handicapped, String furniture, Gps coordinates, int floorNumber) {

        this.roomNumber = roomNumber;
        this.building = building;
        this.shortRoomNumber = shortRoomNumber;
        this.trivialName = trivialName;
        this.area = area;
        this.capacityTimetable = capacityTimetable;
        this.capacityLecture = capacityLecture;
        this.capacityWork = capacityWork;
        this.capacityExam = capacityExam;
        this.capacityReal = capacityReal;
        this.firstRowHandicapped = firstRowHandicapped;
        this.handicapped = handicapped;
        this.furniture = furniture;
        this.coordinates = coordinates;
        this.floorNumber = floorNumber;

    }
}
