package iklim.engine;

import iklim.engine.asset.AssetManager;
import iklim.engine.configuration.Configuration;

import java.util.HashMap;
import java.util.Timer;

import iklim.engine.gameInterface.IklimGameViewer;
import iklim.engine.uidata.IklimGameViewerDataManager;

public class IklimGameEngine {
	private AssetManager asset;
	private IklimGameViewer view;
	private Configuration config;

	public IklimGameEngine(Configuration cfg) {
		this.config = cfg;
		asset = new AssetManager();
		view = new IklimGameViewer();
		
		init();
	}

	public void init() {
		asset.load();
		view.init();
	}

	public void run(){
		Timer t = new Timer();
		t.schedule(new RepaintTask(view), 100);
		view.run();
	}
	
	public void showScene(String sceneName){
		view.showScene(sceneName);
	}
	
}
