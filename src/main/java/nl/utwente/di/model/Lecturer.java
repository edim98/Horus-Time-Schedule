package nl.utwente.di.model;

public class Lecturer {
    private String teacherId;
    private String name;
    private String phone;
    private String email;

    public Lecturer(String teacherId, String name, String phone, String email) {
        this.teacherId = teacherId;
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }
}
