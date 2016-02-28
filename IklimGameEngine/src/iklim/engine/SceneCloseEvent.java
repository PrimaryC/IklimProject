package iklim.engine;

import iklim.engine.gameInterface.IklimGameScene;

public class SceneCloseEvent {
	private IklimGameScene				previousScene;
	private String						sceneContext;
	public SceneCloseEvent(IklimGameScene scene) {
		this.previousScene = scene;
	}
	public void setSceneContext(String context){
		this.sceneContext = context;
	}
	public IklimGameScene getPreviousScene(){
		return previousScene;
	}
	public String getSceneContext(){
		return sceneContext;
	}
}
