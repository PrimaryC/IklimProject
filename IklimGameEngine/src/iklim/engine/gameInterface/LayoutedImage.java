package iklim.engine.gameInterface;

import java.awt.Image;
import java.awt.image.BufferedImage;

public class LayoutedImage {
	private final BufferedImage img;
	private double posX;
	private double posY;
	private double rotateTheta;
	private float zoomX;
	private float zoomY;

	public LayoutedImage(BufferedImage img) {
		this(img, 0, 0);
	}

	public LayoutedImage(BufferedImage img, double x, double y) {
		this.img = img;
		this.posX = x;
		this.posY = y;
		this.rotateTheta = 0;
		this.zoomX = 1;
		this.zoomY = 1;
	}

	public Image getImage() {
		return img;
	}

	public double getPosX() {
		return posX;
	}

	public void setPosX(double posX) {
		this.posX = posX;
	}

	public double getPosY() {
		return posY;
	}

	public void setPosY(double posY) {
		this.posY = posY;
	}

	public double getRotateTheta() {
		return rotateTheta;
	}

	public void setRotateTheta(double rotateTheta) {
		this.rotateTheta = rotateTheta;
	}

	public float getZoomX() {
		return zoomX;
	}

	public void setZoomX(float zoomX) {
		this.zoomX = zoomX;
	}

	public float getZoomY() {
		return zoomY;
	}

	public void setZoomY(float zoomY) {
		this.zoomY = zoomY;
	}

	public BufferedImage getImg() {
		return img;
	}

}
