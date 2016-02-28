package iklim.itmaru.control;

import java.awt.Dimension;

import iklim.engine.configuration.Configuration;
import iklim.itmaru.control.listener.EventListener;
import iklim.itmaru.utility.UtilityContext;
import iklim.itmaru.view.layer.MainMenuCentralLayer;
import iklim.itmaru.view.scene.MainMenuScene;

public class IklimGameController {
	private Tester test;
	private EventListener eventListener;
	private String currentSceneName;

	public static void main(String[] ar) {
		new IklimGameController();
	}

	public IklimGameController() {
		test = new Tester();
		eventListener = new EventListener();

		init();
	}

	public void init() {
		test.addListener(eventListener);
		loadData();
		
		addViewModel();
		addScene();
		run();
	}

	public void run() {

	}

	public void loadData() {

		Configuration conf = Configuration.getInstance();
		conf.addImage(UtilityContext.graphicResourcePrefix + MainMenuCentralLayer.START_GAME, "startGame.jpg");
		conf.addImage(UtilityContext.graphicResourcePrefix + MainMenuCentralLayer.LOAD_GAME, "loadGame.jpg");
		conf.addImage(UtilityContext.graphicResourcePrefix + MainMenuCentralLayer.CONFIGURATE_GAME,
				"configurationMenu.jpg");
		conf.addImage(UtilityContext.graphicResourcePrefix + MainMenuCentralLayer.EXIT_GAME, "exitGame.jpg");
		
		conf.setViewerSize(new Dimension(500,500));
	}
	
	public void addScene(){
		MainMenuScene mainScene = new MainMenuScene("MainMenu");
		mainScene.addLayer("MainMenuCentralLayer", new MainMenuCentralLayer());
		
	}
	
	public void addViewModel(){
		
		
	}

}
