package iklim.itmaru.view.layer;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.HashMap;

import iklim.itmaru.viewModel.MainMenuBackgroundLayerModel;

public class MainMenuBackgroundLayer extends AbstractRotateLayer {
	private MainMenuBackgroundLayerModel model;
	private HashMap<String, ImageData> imageDataMap;
	private ArrayList<String> keyList;
	
	public MainMenuBackgroundLayer(){
		model = new MainMenuBackgroundLayerModel();
		imageDataMap = new HashMap<String,ImageData>();
		keyList = new ArrayList<String>();
	}
	
	public void init(){
		this.setCentralX(50);
		this.setCentralY(200);
	}
	
	public void paint(Graphics g){
		BufferedImage image;
		ImageData imageData;
		for(int i = 0; i < keyList.size();i++){
			image = model.getImageMap().get(keyList.get(i));
			imageData = imageDataMap.get(keyList.get(i));
		}
	}
	
}
