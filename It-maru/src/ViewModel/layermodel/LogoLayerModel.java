package ViewModel.layermodel;

import java.awt.image.BufferedImage;

import ViewModel.AbstractViewModel;

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
