package iklim.itmaru.viewModel;

import java.awt.image.BufferedImage;
import java.util.HashMap;

import iklim.engine.uidata.AbstractViewModel;

public class MainMenuBackgroundLayerModel implements AbstractViewModel{
	private HashMap<String, BufferedImage> imageMap;
	
	public MainMenuBackgroundLayerModel(){
		imageMap = new HashMap<String,BufferedImage>();
	}

	public HashMap<String, BufferedImage> getImageMap() {
		return imageMap;
	}

	public void addImage(String key, BufferedImage image) {
		this.imageMap.put(key, image);
	}
}