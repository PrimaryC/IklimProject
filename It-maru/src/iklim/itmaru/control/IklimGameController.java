package iklim.itmaru.control;

import java.awt.Dimension;

import iklim.engine.IklimGameEngine;
import iklim.engine.configuration.Configuration;
import iklim.itmaru.control.listener.EventListener;
import iklim.itmaru.utility.UtilityContext;
import iklim.itmaru.view.layer.Location;
import iklim.itmaru.view.layer.MainMenuCentralLayer;
import iklim.itmaru.view.scene.MainMenuScene;
import iklim.itmaru.viewModel.IklimGameViewDataManager;
import iklim.itmaru.viewModel.MainMenuCentralLayerModel;

public class IklimGameController {
	private Tester test;
	private EventListener eventListener;
	private String currentSceneName;
	private IklimGameViewDataManager dataManager;
	private IklimGameEngine engine;

	public static void main(String[] ar) {
		new IklimGameController();
	}

	public IklimGameController() {
		eventListener = new EventListener();
		dataManager = new IklimGameViewDataManager();
		init();
	}

	public void init() {
		loadData();
		
		addViewModel();
		addScene();
		run();
	}

	public void run() {
		engine.showScene(UtilityContext.scenePrefix + "MainMenu");
		engine.run();
	}

	public void loadData() {

		Configuration conf = Configuration.getInstance();
		conf.addImage(MainMenuCentralLayer.START_GAME, "startGame.PNG");
		conf.addImage(MainMenuCentralLayer.LOAD_GAME, "loadGame.png");
		conf.addImage(MainMenuCentralLayer.CONFIGURATE_GAME,"configuration.png");
		conf.addImage(MainMenuCentralLayer.EXIT_GAME, "exitGame.png");
	
		conf.setViewerSize(new Dimension(1920,1080));
		
		engine = new IklimGameEngine(conf);
	}
	
	public void addScene(){
		MainMenuScene mainScene = new MainMenuScene(UtilityContext.scenePrefix + "MainMenu");
		
		mainScene.addLayer(new MainMenuCentralLayer());
		Configuration conf = Configuration.getInstance();
		conf.addScene(UtilityContext.scenePrefix + "MainMenu", mainScene);
		
	}
	
	public void addViewModel(){
		System.out.println(MainMenuCentralLayerModel.class.getName());
		dataManager.addViewModel(MainMenuCentralLayerModel.class.getName(), new MainMenuCentralLayerModel());
	}

}
