package iklim.itmaru.view.scene.mainmenuscene.layer;

public class Location {
	private double x;
	private double y;
	
	public Location(){
		x = 0;
		y = 0;
	}
	
	public Location(double x, double y){
		this.x = x;
		this.y = y;
		
	}
	
	public double getX() {
		return x;
	}
	public void setX(double x) {
		this.x = x;
	}
	public double getY() {
		return y;
	}
	public void setY(double y) {
		this.y = y;
	}
	
	
}