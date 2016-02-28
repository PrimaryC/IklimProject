package iklim.engine.configuration;

import java.awt.Dimension;
import java.awt.geom.Dimension2D;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Set;

import iklim.engine.SceneListener;

public class Configuration {
	private ImageIDMap					imgMap;
	private SoundIDMap					sndMap;
	private ViewerProperty				viewPro;
	private LinkedList<SceneListener>	sceneListeners;
		
	private Configuration() {
		imgMap = new ImageIDMap();
		sndMap = new SoundIDMap();
		viewPro = new ViewerProperty();
		sceneListeners = new LinkedList<SceneListener>();
	}
	
	private static Configuration instance;
	
	public static Configuration getInstance(){
		synchronized(instance){
			if(instance == null){
				instance = new Configuration();
			}
		}
		return instance;
	}
	
	public void addImage(String id, String filename){
		imgMap.put(filename, id);
	}
	
	public ImageIDMap getImageIDMap(){
		return imgMap;
	}
	public void setViewerSize(Dimension d){
		viewPro.setSize(d);
	}

	public LinkedList<SceneListener> getSceneListener() {
		return sceneListeners;
	}

	public ViewerProperty getViewerProperty() {
		return viewPro;
		
	}
}
