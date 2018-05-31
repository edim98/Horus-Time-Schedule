package nl.utwente.di.model;

public class Gps {

    private double xAxis;
    private double yAxis;

    public Gps(double x, double y) {
        this.xAxis = x;
        this.yAxis = y;
    }

    public void setxAxis(float xAxis) {
        this.xAxis = xAxis;
    }

    public void setyAxis(float yAxis) {
        this.yAxis = yAxis;
    }

    public double getxAxis() {
        return xAxis;
    }

    public double getyAxis() {
        return yAxis;
    }
}
