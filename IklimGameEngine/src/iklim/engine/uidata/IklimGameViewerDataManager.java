package iklim.engine.uidata;

import java.util.Hashtable;

import javax.swing.JFrame;

import iklim.engine.gameInterface.AbstractGameLayer;

public class IklimGameViewerDataManager {
	
	private Hashtable<String,AbstractGameViewerModel> layerModelList;
	
	
	public IklimGameViewerDataManager(){
		layerModelList = new Hashtable<String,AbstractGameViewerModel>();
	}
	
	public void init() {
	}
	
	public AbstractGameViewerModel getLayerModel(String key){
		return layerModelList.get(key);
	}
	
	
}
