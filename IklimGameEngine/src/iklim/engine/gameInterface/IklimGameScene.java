package iklim.engine.gameInterface;

import java.awt.Graphics;
import java.util.HashMap;
import java.util.LinkedList;

import javax.swing.JPanel;

import iklim.engine.uidata.IklimGameViewerDataManager;


public abstract class IklimGameScene extends JPanel {
	private static final long serialVersionUID = -6340898452471020840L;
	private HashMap<String,AbstractGameLayer> layerTable;
	private LinkedList<AbstractGameLayer> layerList;
	
	private String						context;
	private boolean 					over;

	public IklimGameScene(String name){
		this.context = name;
		layerTable = new HashMap<String,AbstractGameLayer>();
		layerList = new LinkedList<AbstractGameLayer>();
	}
	
	public abstract void setViewModel(IklimGameViewerDataManager viewModel);
	
	public AbstractGameLayer getLayer(String key){
		return layerTable.get(key);
	}
	
	public AbstractGameLayer getLayer(int i){
		return layerList.get(i);
	}
	
	public LinkedList<AbstractGameLayer> getLayerList() {
		return layerList;
	}

	public void addLayer(String key,AbstractGameLayer layer){
		layerTable.put(key, layer);
		layerList.add(layer);
	}
	
	@Override
	public void paint(Graphics g) {
		for (AbstractGameLayer abstractGameLayer : layerList) {
			abstractGameLayer.repaint();
		}
	}

	public void animate() {
		for (AbstractGameLayer abstractGameLayer : layerList) {
			abstractGameLayer.animate();
		}
		
	}

	public boolean isOver() {
		return over;
	}
	public void setOver(boolean state){
		this.over = state;
	}

	public String getSceneContext() {
		
		return this.context;
	}
}
