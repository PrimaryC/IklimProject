package iklim.engine;

import iklim.engine.asset.AssetManager;

import java.util.HashMap;

import iklim.engine.gameInterface.ViewManager;
import iklim.engine.uicontrol.EventHandler;
import iklim.engine.uicontrol.EventListener;
import iklim.engine.uidata.ViewModelManager;
import iklim.itmaru.data.ModelManager;


public class IklimGameEngine {
	private AssetManager	asset;
	private ViewManager view;
	private ViewModelManager viewModel;
	private EventListener btnListener;
	private EventHandler handler;
	private Configuration config;
	
	public IklimGameEngine(HashMap<String, String> cfgMap){
		config = new Configuration(cfgMap);
		asset = new AssetManager();
		viewModel = new ViewModelManager();
		view = new ViewManager(viewModel);
		handler = new EventHandler(viewModel);
		btnListener = new EventListener(handler);
		
		init();
	}
	
	public void init(){
		asset.load(config.getAssetIDMap());
		viewModel.init();
		view.init(viewModel,btnListener);
	}
	
	public void run(){
		handler.loadFile();
		view.run();
		view.repaint();
	}
	
	
}
