package iklim.itmaru.view.layer;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.HashMap;

import iklim.engine.gameInterface.AbstractGameLayer;
import iklim.engine.uidata.IklimGameViewerDataManager;
import iklim.itmaru.viewModel.MainMenuBackgroundLayerModel;

public class MainMenuBackgroundLayer extends AbstractGameLayer {
	private MainMenuBackgroundLayerModel model;
	private ArrayList<String> keyList;
	
	public MainMenuBackgroundLayer(){
		model = new MainMenuBackgroundLayerModel();
		keyList = new ArrayList<String>();
	}
	
	public void init(){
		
	}
	

	

	@Override
	public void drawElements(Graphics g) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setModel(IklimGameViewerDataManager model) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void animate() {
		// TODO Auto-generated method stub
		
	}
	
}
