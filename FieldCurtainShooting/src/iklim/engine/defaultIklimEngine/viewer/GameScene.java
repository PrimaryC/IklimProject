package iklim.engine.defaultIklimEngine.viewer;

import iklim.engine.defaultIklimEngine.Configuration;

import java.util.Comparator;
import java.util.PriorityQueue;

import javax.swing.JLayeredPane;

public abstract class GameScene extends JLayeredPane{
	private static final long serialVersionUID = -516015199434035987L;
	private String									sceneContext;
	private PriorityQueue<GameViewLayer>	  		layerQueue;
	
	public GameScene() {
		this(null);
	}
	public GameScene(String context){
		sceneContext = context;
		layerQueue = new PriorityQueue<GameViewLayer>(10, new LayerComparator());
		this.setBounds(0,0,Configuration.ViewConfig.FrameWidth, Configuration.ViewConfig.FrameHeight);
	}
	
	public void addLayer(GameViewLayer layer){
		layerQueue.add(layer);
		this.add(layer, layer.getZIndex());
	}
	
	public void animate() {
		for (GameViewLayer gameViewLayer : layerQueue) {
			gameViewLayer.animate();
		}
	}
	
	public boolean isClosed(){
		return false;
	}
	
	public String getSceneContext(){
		return sceneContext;
	}

	public class LayerComparator implements Comparator<GameViewLayer>{
		@Override
		public int compare(GameViewLayer o1, GameViewLayer o2) {
			if(o1.getZIndex() < o2.getZIndex()){
				return -1;
			}
			if(o1.getZIndex() > o2.getZIndex()){
				return 1;
			}
			return 0;
		}
	}

}
