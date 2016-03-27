package iklim.itmaru.view.scene.mainmenuscene.layer;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.HashMap;

import iklim.engine.gameInterface.AbstractGameLayer;
import iklim.engine.uidata.AbstractGameViewerModel;
import iklim.engine.uidata.IklimGameViewerDataManager;
import iklim.itmaru.view.scene.mainmenuscene.viewmodel.MainMenuBackgroundLayerModel;

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

		g.setColor(Color.white);
		g.fillRect(0, 0, 1920, 1080);
		
	}


	@Override
	public void animate() {
		// TODO Auto-generated method stub
		
	}

	public void setModel(AbstractGameViewerModel model) {
		this.model = (MainMenuBackgroundLayerModel)model;
		
	}
	
}
