package ViewModel;

import java.util.Hashtable;

import javax.swing.JFrame;

import ViewModel.layermodel.LogoLayerModel;
import control.SceneContext;
import userinterface.layer.AbstractLayer;

public class ViewModelManager {
	
	private Hashtable<String,AbstractViewModel> layerModelList;
	
	
	public ViewModelManager(){
		layerModelList = new Hashtable<String,AbstractViewModel>();
	}
	
	public void init() {
		layerModelList.put(SceneContext.TitleLayer, new LogoLayerModel());
	}
	
	public AbstractViewModel getLayerModel(String key){
		return layerModelList.get(key);
	}
	
	
}
