package iklim.itmaru.view.scene.mainmenuscene.layer;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

import iklim.engine.asset.ImageMap;
import iklim.engine.configuration.Configuration;
import iklim.engine.gameInterface.LayoutedImage;
import iklim.engine.uidata.AbstractGameViewerModel;
import iklim.engine.uidata.IklimGameViewerDataManager;
import iklim.itmaru.utility.LayerContext;
import iklim.itmaru.utility.UtilityContext;
import iklim.itmaru.view.scene.mainmenuscene.viewmodel.MainMenuCentralLayerModel;

public class MainMenuCentralLayer extends AbstractRotateLayer{
	private MainMenuCentralLayerModel model;
	private double currentPosition;
	
	public static final String START_GAME = UtilityContext.graphicResourcePrefix + "startGame";
	public static final String LOAD_GAME = UtilityContext.graphicResourcePrefix + "loadGame";
	public static final String CONFIGURATE_GAME = UtilityContext.graphicResourcePrefix + "configuration";
	public static final String EXIT_GAME = UtilityContext.graphicResourcePrefix + "exitGame";
	
	public MainMenuCentralLayer(){
		this.setCentralX(200);
		this.setCentralY(500);
		this.setRadious(200);
	}
	

	
	
	public void init(){
		ImageMap map = ImageMap.getInstance();
		
		BufferedImage image;
		LayoutedImage lImage;
		currentPosition = 0;
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
	

	private double velocity;
	public void wheelChanged(int currentWheel) {
		this.velocity = 9*(currentWheel*30-currentPosition)/40;
		
	}

	@Override
	public void animate() {
		int selection = model.getCurrentWheel();
		
		selection *= 30;
		if(selection == currentPosition){
			
		}else if(Math.abs(selection - currentPosition)<1){
			currentPosition = selection;
		}else{
			if(velocity*(selection-currentPosition)<0){
				this.velocity = 9*(selection-currentPosition)/40;
			}
				
			currentPosition +=velocity;
		}
		
		Location a = this.calculateObjectLocation(Math.toRadians(currentPosition));
		LayoutedImage x = this.getImageMap().get(START_GAME);
		x.setRotateTheta(Math.toRadians(currentPosition));
		x.setPosX(a.getX());
		x.setPosY(a.getY());
		
		a = this.calculateObjectLocation(Math.toRadians(currentPosition  + 30));
		x = this.getImageMap().get(LOAD_GAME);
		x.setRotateTheta(Math.toRadians(currentPosition  + 30));
		x.setPosX(a.getX());
		x.setPosY(a.getY());
		
		a = this.calculateObjectLocation(Math.toRadians(currentPosition  + 60));
		x = this.getImageMap().get(CONFIGURATE_GAME);
		x.setRotateTheta(Math.toRadians(currentPosition  + 60));
		x.setPosX(a.getX());
		x.setPosY(a.getY());
		
		a = this.calculateObjectLocation(Math.toRadians(currentPosition + 90));
		x = this.getImageMap().get(EXIT_GAME);
		x.setRotateTheta(Math.toRadians(currentPosition +90));
		
		x.setPosX(a.getX());
		x.setPosY(a.getY());
		
	}


	public void setModel(AbstractGameViewerModel model) {
		this.model = (MainMenuCentralLayerModel)model;
	}








	



}
