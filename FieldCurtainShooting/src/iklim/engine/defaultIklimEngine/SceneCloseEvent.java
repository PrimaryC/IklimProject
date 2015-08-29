package iklim.engine.defaultIklimEngine;

import iklim.engine.defaultIklimEngine.viewer.GameScene;

public class SceneCloseEvent {
	private GameScene				previousScene;
	private String					sceneContext;
	public SceneCloseEvent(GameScene scene) {
		this.previousScene = scene;
	}
	public void setSceneContext(String context){
		this.sceneContext = context;
	}
	public GameScene getPreviousScene(){
		return previousScene;
	}
	public String getSceneContext(){
		return sceneContext;
	}
}
