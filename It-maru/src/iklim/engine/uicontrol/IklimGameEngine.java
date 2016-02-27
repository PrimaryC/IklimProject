package iklim.engine.uicontrol;

import iklim.engine.gameInterface.ViewManager;
import iklim.engine.uidata.ViewModelManager;
import iklim.itmaru.data.ModelManager;


public class IklimGameEngine {
	private ViewManager view;
	private ModelManager model;
	private ViewModelManager viewModel;
	private EventListener btnListener;
	private EventHandler handler;
	
	
	public IklimGameEngine(){
		
		model = new ModelManager();
		viewModel = new ViewModelManager();
		view = new ViewManager(viewModel);
		handler = new EventHandler(viewModel);
		btnListener = new EventListener(handler);
		init();
	}
	
	public void init(){
		viewModel.init();
		view.init(viewModel,btnListener);
		model.init();
	}
	
	public void run(){
		handler.loadFile();
		view.run();
		view.repaint();
	}
	
	
}
