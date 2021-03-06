package iklim.itmaru.control;

import java.awt.Dimension;

import iklim.engine.IklimGameEngine;
import iklim.engine.SceneCloseEvent;
import iklim.engine.SceneListener;
import iklim.engine.configuration.Configuration;
import iklim.itmaru.charamakingscene.CharaMakingScene;
import iklim.itmaru.control.listener.EventListener;
import iklim.itmaru.data.IklimGameData;
import iklim.itmaru.gamePlayingScene.GamePlayingScene;
import iklim.itmaru.utility.UtilityContext;
import iklim.itmaru.view.scene.mainmenuscene.MainMenuScene;
import iklim.itmaru.view.scene.mainmenuscene.layer.Location;
import iklim.itmaru.view.scene.mainmenuscene.layer.MainMenuBackgroundLayer;
import iklim.itmaru.view.scene.mainmenuscene.layer.MainMenuCentralLayer;
import iklim.itmaru.view.scene.mainmenuscene.viewmodel.MainMenuCentralLayerModel;
import iklim.itmaru.viewModel.IklimGameViewDataManager;

public class IklimGameController implements SceneListener{
	private Tester test;
	private EventListener eventListener;
	private String currentSceneName;
	private IklimGameData dataManager;
	private IklimGameEngine engine;

	public static void main(String[] ar) {
		new IklimGameController();
	}

	public IklimGameController() {
		eventListener = new EventListener();
		dataManager = new IklimGameData();
		init();
	}

	public void init() {
		loadData();
		
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
		MainMenuScene mainScene = new MainMenuScene(UtilityContext.scenePrefix + "MainMenu",dataManager);
		CharaMakingScene charaScene = new CharaMakingScene(UtilityContext.scenePrefix + "CharaMaking");
		GamePlayingScene gamePlayingScene = new GamePlayingScene(UtilityContext.scenePrefix + "GamePlayingScene",dataManager);
		engine.addSceneListener(this);
		
		Configuration conf = Configuration.getInstance();
		conf.addScene(UtilityContext.scenePrefix + "MainMenu", mainScene);
		conf.addScene(UtilityContext.scenePrefix + "CharaMakingScene", charaScene);
		conf.addScene(UtilityContext.scenePrefix + "GamePlayingScene", gamePlayingScene);
		
	}

	@Override
	public void sceneOvered(SceneCloseEvent e) {

		engine.showScene(UtilityContext.scenePrefix + "GamePlayingScene");
	}
	
}
