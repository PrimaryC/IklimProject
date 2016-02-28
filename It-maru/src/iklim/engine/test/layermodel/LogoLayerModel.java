package iklim.engine.test.layermodel;

import java.awt.image.BufferedImage;

import iklim.engine.uidata.AbstractViewModel;

public class LogoLayerModel implements AbstractViewModel{
	private BufferedImage image;
	
	public BufferedImage getImage() {
		return image;
	}
	
	public void setImage(BufferedImage image) {
		System.out.println("imageSet");
		
		this.image = image;
		
		System.out.println(this.image);
	}
}
