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

	public static final String START_GAME = UtilityContext.graphicResourcePrefix + "startGame";
	public static final String LOAD_GAME = UtilityContext.graphicResourcePrefix + "loadGame";
	public static final String CONFIGURATE_GAME = UtilityContext.graphicResourcePrefix + "configuration";
	public static final String EXIT_GAME = UtilityContext.graphicResourcePrefix + "exitGame";
	
	public MainMenuCentralLayer(){
		this.setCentralX(100);
		this.setCentralY(500);
		this.setRadious(200);
	}
	
	public void init(){
		ImageMap map = ImageMap.getInstance();
		
		BufferedImage image;
		LayoutedImage lImage;
		
		image = map.get(START_GAME);
		lImage = new LayoutedImage(image);
		this.getImageMap().put(START_GAME, lImage);
		
		image = map.get(LOAD_GAME);
		lImage = new LayoutedImage(image);
		this.getImageMap().put(LOAD_GAME, lImage);
		
		image = map.get(CONFIGURATE_GAME);
		lImage = new LayoutedImage(image);
		this.getImageMap().put(CONFIGURATE_GAME, lImage);
		
		image = map.get(EXIT_GAME);
		lImage = new LayoutedImage(image);
		this.getImageMap().put(EXIT_GAME, lImage);
		
	}
	
	@Override
	public void drawElements(Graphics g) {
		
	}
	

	@Override
	public void setModel(IklimGameViewerDataManager model) {
		model.getLayerModel(MainMenuCentralLayerModel.class.getName());
		
	}

	@Override
	public void animate() {
		Location a = this.calculateObjectLocation(Math.toRadians(30));
		LayoutedImage x = this.getImageMap().get(START_GAME);
		x.setRotateTheta(30);
		x.setPosX(a.getX());
		x.setPosY(a.getY());
		
		a = this.calculateObjectLocation(Math.toRadians(60));
		x = this.getImageMap().get(LOAD_GAME);
		x.setRotateTheta(60);
		x.setPosX(a.getX());
		x.setPosY(a.getY());
		
		a = this.calculateObjectLocation(Math.toRadians(90));
		x = this.getImageMap().get(CONFIGURATE_GAME);
		x.setRotateTheta(90);
		x.setPosX(a.getX());
		x.setPosY(a.getY());
		
		a = this.calculateObjectLocation(Math.toRadians(120));
		x = this.getImageMap().get(EXIT_GAME);
		x.setRotateTheta(120);
		x.setPosX(a.getX());
		x.setPosY(a.getY());
		
	}

}
