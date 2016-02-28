package iklim.engine.gameInterface;

import java.awt.Color;
import java.util.HashMap;
import java.util.LinkedList;

import javax.swing.JFrame;
import javax.swing.border.LineBorder;

import iklim.engine.configuration.Configuration;
import iklim.engine.configuration.ViewerProperty;
import iklim.engine.uidata.IklimGameViewerDataManager;

public class IklimGameViewer {
	private HashMap<String, IklimGameScene> sceneMap;
	private JFrame mainFrame;
	private IklimGameScene currentScene;
	private ViewerProperty		viewerProperty;

	public IklimGameViewer(IklimGameViewerDataManager viewModel) {
		mainFrame = new JFrame();
		sceneMap = new HashMap<String, IklimGameScene>();
	}

	public void init() {
		this.viewerProperty = Configuration.getInstance().getViewerProperty();
		mainFrame.setSize(viewerProperty.getSize());
	}

	public void run() {
		mainFrame.setVisible(true);
	}

	public void addScene(String sceneName, IklimGameScene scene) {
		sceneMap.put(sceneName, scene);
	}

	public void animate() {
		currentScene.animate();
	}

	public void repaint() {
		mainFrame.repaint();
	}
	
	public void showScene(String context){
		if(sceneMap.containsKey(context)){
			this.currentScene = sceneMap.get(context);
			mainFrame.setContentPane(currentScene);
		}
	}

	public boolean isSceneOver() {
		return currentScene.isOver();
	}

	public IklimGameScene getCurrentScene() {
		return currentScene;
	}
}
