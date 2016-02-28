package iklim.itmaru.view.layer;

import java.awt.Graphics;
import java.awt.Point;

import iklim.engine.gameInterface.AbstractLayer;
import iklim.engine.uidata.ViewModelManager;

public abstract class AbstractRotateLayer extends AbstractLayer{
	private double centralX;
	private double centralY;

	private double radious;
	
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
		
		return null;
	}
	
	
	
}
