package userinterface.scene;

import java.util.Hashtable;
import java.util.Iterator;
import java.util.LinkedList;

import javax.swing.JPanel;

import userinterface.layer.AbstractLayer;
import control.EventListener;
import ViewModel.AbstractViewModel;
import ViewModel.ViewModelManager;


public abstract class Scene extends JPanel {
	private Hashtable<String,AbstractLayer> layerTable;
	private LinkedList<AbstractLayer> layerList;
	private AbstractViewModel viewModel;
	private EventListener listener;
	

	public Scene(EventListener listener){
		layerTable = new Hashtable<String,AbstractLayer>();
		layerList = new LinkedList<AbstractLayer>();
		
		this.listener = listener;
	}
	
	public abstract void setViewModel(ViewModelManager viewModel);
	
	public AbstractLayer getLayer(String key){
		return layerTable.get(key);
	}
	
	public AbstractLayer getLayer(int i){
		return layerList.get(i);
	}
	
	public LinkedList<AbstractLayer> getLayerList() {
		return layerList;
	}

	public void addLayer(String key,AbstractLayer layer){
		layerTable.put(key, layer);
		layerList.add(layer);
	}
	
	public void repaintAll(){
		for(int i = 0; i < layerList.size();i++){
			layerList.get(i).repaint();
		}
	}

}
