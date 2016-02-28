package iklim.itmaru.view.layer;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

import iklim.engine.asset.ImageMap;
import iklim.engine.configuration.Configuration;
import iklim.engine.gameInterface.LayoutedImage;
import iklim.engine.uidata.IklimGameViewerDataManager;
import iklim.itmaru.utility.LayerContext;
import iklim.itmaru.utility.UtilityContext;
import iklim.itmaru.viewModel.MainMenuCentralLayerModel;

public class MainMenuCentralLayer extends AbstractRotateLayer{
	private MainMenuCentralLayerModel model;

	public static final String START_GAME = "startGame";
	public static final String LOAD_GAME = "loadGame";
	public static final String CONFIGURATE_GAME = "configuration";
	public static final String EXIT_GAME = "exitGame";
	
	
	public void init(){
		ImageMap map = ImageMap.getInstance();
		
		BufferedImage image;
		LayoutedImage lImage;
		
		image = map.get(UtilityContext.graphicResourcePrefix + START_GAME);
		lImage = new LayoutedImage(image);
		this.getImageMap().put(UtilityContext.graphicResourcePrefix + START_GAME, lImage);
		
		image = map.get(UtilityContext.graphicResourcePrefix + LOAD_GAME);
		lImage = new LayoutedImage(image);
		this.getImageMap().put(UtilityContext.graphicResourcePrefix + LOAD_GAME, lImage);
		
		image = map.get(UtilityContext.graphicResourcePrefix + CONFIGURATE_GAME);
		lImage = new LayoutedImage(image);
		this.getImageMap().put(UtilityContext.graphicResourcePrefix + CONFIGURATE_GAME, lImage);
		
		image = map.get(UtilityContext.graphicResourcePrefix + EXIT_GAME);
		lImage = new LayoutedImage(image);
		this.getImageMap().put(UtilityContext.graphicResourcePrefix + EXIT_GAME, lImage);
		
	}
	
	@Override
	public void drawElements(Graphics g) {
		
	}
	

	@Override
	public void setModel(IklimGameViewerDataManager model) {
		model.getLayerModel("MainMenuCentralLayer");
		
	}

	@Override
	public void animate() {
		Location a = this.calculateObjectLocation(30);
		LayoutedImage x = this.getImageMap().get(UtilityContext.graphicResourcePrefix + START_GAME);
		x.setPosX(a.getX());
		x.setPosY(a.getY());
	}

}
