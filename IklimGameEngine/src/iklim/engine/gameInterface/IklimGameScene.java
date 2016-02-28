package iklim.engine.gameInterface;

import java.awt.Graphics;
import java.util.HashMap;
import java.util.LinkedList;

import javax.swing.JPanel;

import iklim.engine.configuration.Configuration;
import iklim.engine.configuration.ViewerProperty;
import iklim.engine.uidata.IklimGameViewerDataManager;


public abstract class IklimGameScene extends JPanel {
	private static final long serialVersionUID = -6340898452471020840L;
	private LinkedList<AbstractGameLayer> layerList;
	
	private String						context;
	private boolean 					over;

	public IklimGameScene(String name){
		this.context = name;
		layerList = new LinkedList<AbstractGameLayer>();
		this.setLayout(null);
		ViewerProperty view = Configuration.getInstance().getViewerProperty();
		this.setBounds(0,0,view.getSize().width, view.getSize().height);
		
	}
	
	public abstract void setViewModel(IklimGameViewerDataManager viewModel);
	
	
	public AbstractGameLayer getLayer(int i){
		return layerList.get(i);
	}
	
	public LinkedList<AbstractGameLayer> getLayerList() {
		
		return layerList;
	}

	public void addLayer(AbstractGameLayer layer){
		this.add(layer);
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

	public void init() {
		for (AbstractGameLayer abstractGameLayer : layerList) {
			abstractGameLayer.init();
		}
		
	}
}
