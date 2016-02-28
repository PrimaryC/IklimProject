package iklim.itmaru.viewModel;

import java.awt.image.BufferedImage;
import java.util.HashMap;

public class MainMenuSecondWheelLayerModel {
private HashMap<String,BufferedImage> imageMap;
	
	public MainMenuSecondWheelLayerModel(){
		imageMap = new HashMap<String,BufferedImage>();
	}
	
	public HashMap<String, BufferedImage> getImageMap() {
		return imageMap;
	}

	public void addImage(String key, BufferedImage image) {
		this.imageMap.put(key, image);
	}
}
