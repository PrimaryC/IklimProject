package iklim.itmaru.view.layer;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.HashMap;

import iklim.engine.gameInterface.AbstractLayer;
import iklim.engine.uidata.ViewModelManager;
import iklim.itmaru.viewModel.MainMenuBackgroundLayerModel;

public class MainMenuBackgroundLayer extends AbstractLayer {
	private MainMenuBackgroundLayerModel model;
	private HashMap<String, ImageData> imageDataMap;
	private ArrayList<String> keyList;
	
	public MainMenuBackgroundLayer(){
		model = new MainMenuBackgroundLayerModel();
		imageDataMap = new HashMap<String,ImageData>();
		keyList = new ArrayList<String>();
	}
	
	public void init(){

	}
	

	@Override
	public void setModel(ViewModelManager model) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void drawElements(Graphics g) {
		// TODO Auto-generated method stub
		
	}
	
}
