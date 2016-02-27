package control;

import ViewModel.ViewModelManager;
import model.ModelManager;
import userinterface.ViewManager;


public class ControlManager {
	private ViewManager view;
	private ModelManager model;
	private ViewModelManager viewModel;
	private EventListener btnListener;
	private EventHandler handler;
	
	
	public static void main(String ar[]){
		ControlManager controlmanager = new ControlManager();
	}
	
	
	public ControlManager(){
		
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
	

		run();
	}
	
	public void run(){
	
		handler.loadFile();
		
		
		
		view.run();
		view.repaint();
	}
	
	
}
