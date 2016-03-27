package iklim.itmaru.view.scene.mainmenuscene.viewmodel;

import java.awt.image.BufferedImage;
import java.util.HashMap;

import iklim.engine.uidata.AbstractGameViewerModel;
import iklim.itmaru.viewModel.AbstractViewDataModel;

public class MainMenuBackgroundLayerModel implements AbstractGameViewerModel {
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
