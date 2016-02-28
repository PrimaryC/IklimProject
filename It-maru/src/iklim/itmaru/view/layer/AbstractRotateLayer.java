package iklim.itmaru.view.layer;

import java.awt.Graphics;
import java.awt.Point;

import iklim.engine.gameInterface.AbstractGameLayer;


public abstract class AbstractRotateLayer extends AbstractGameLayer{
	private double centralX;
	private double centralY;

	private double radious;
	
	public AbstractRotateLayer(){
		this.centralX = 0;
		this.centralY = 0;
		radious = 0;
	}
	
	
	public double getRadious() {
		return radious;
	}
	public void setRadious(double radious) {
		this.radious = radious;
	}
	public double getCentralX() {
		return centralX;
	}
	public void setCentralX(double centralX) {
		this.centralX = centralX;
	}
	public double getCentralY() {
		return centralY;
	}
	public void setCentralY(double centralY) {
		this.centralY = centralY;
	}
	
	public Location calculateObjectLocation(double degree){
		Location point = new Location();
		point.setX(centralX + Math.cos(degree));
		point.setY(centralY + Math.sin(degree));
		return point;
	}
	
	
	
}
