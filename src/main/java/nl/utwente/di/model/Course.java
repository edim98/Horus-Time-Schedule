package nl.utwente.di.model;

public class Course {

    private String courseID;
    private String name;

    public Course(String courseID, String name) {
        this.courseID = courseID;
        this.name = name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public String getName() {
        return name;
    }

    public String getCourseID() {
        return courseID;
    }
}
