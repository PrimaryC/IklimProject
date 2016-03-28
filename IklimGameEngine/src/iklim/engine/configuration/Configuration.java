package iklim.engine.configuration;

import java.awt.Dimension;
import java.util.LinkedList;

import iklim.engine.SceneListener;
import iklim.engine.gameInterface.IklimGameScene;

public class Configuration {
	private ImageIDMap					imgMap;
	private SoundIDMap					sndMap;
	private ViewerProperty				viewPro;
	private SceneMap					sceneMap;
	private LinkedList<SceneListener>	sceneListeners;
		
	private Configuration() {
		imgMap = new ImageIDMap();
		sndMap = new SoundIDMap();
		sceneMap = new SceneMap();
		viewPro = new ViewerProperty();
		sceneListeners = new LinkedList<SceneListener>();
	}
	
	private static Configuration instance;
	
	public synchronized static Configuration getInstance(){
		if(instance == null){
			instance = new Configuration();
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
	public void addSceneListener(SceneListener l){
		sceneListeners.add(l);
	}
	
	public LinkedList<SceneListener> getSceneListener() {
		return sceneListeners;
	}

	public ViewerProperty getViewerProperty() {
		return viewPro;
	}

	public SceneMap getSceneMap() {
		return sceneMap;
	}
	
	public void addScene(String name, IklimGameScene scene){
		sceneMap.put(name, scene);
	}
}
