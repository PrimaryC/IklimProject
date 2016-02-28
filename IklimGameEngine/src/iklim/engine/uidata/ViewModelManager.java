package iklim.engine.uidata;

import java.util.Hashtable;

import javax.swing.JFrame;

import iklim.engine.gameInterface.AbstractLayer;
import iklim.engine.uicontrol.SceneContext;

public class ViewModelManager {
	
	private Hashtable<String,AbstractViewModel> layerModelList;
	
	
	public ViewModelManager(){
		layerModelList = new Hashtable<String,AbstractViewModel>();
	}
	
	public void init() {
	}
	
	public AbstractViewModel getLayerModel(String key){
		return layerModelList.get(key);
	}
	
	
}