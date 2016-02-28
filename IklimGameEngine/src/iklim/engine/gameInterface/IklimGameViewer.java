package iklim.engine.gameInterface;

import java.awt.Color;
import java.util.HashMap;
import java.util.LinkedList;

import javax.swing.JFrame;
import javax.swing.border.LineBorder;

import iklim.engine.configuration.Configuration;
import iklim.engine.configuration.SceneMap;
import iklim.engine.configuration.ViewerProperty;
import iklim.engine.uidata.IklimGameViewerDataManager;

public class IklimGameViewer {
	private JFrame 				mainFrame;
	private IklimGameScene 		currentScene;
	private ViewerProperty		viewerProperty;

	public IklimGameViewer() {
		mainFrame = new JFrame();
	}

	public void init() {
		this.viewerProperty = Configuration.getInstance().getViewerProperty();
		System.out.println(viewerProperty.getSize().getWidth());
		mainFrame.setSize(viewerProperty.getSize());
	}

	public void run() {
		mainFrame.setVisible(true);
	}

	public void animate() {
		currentScene.animate();
	}

	public void repaint() {
		mainFrame.repaint();
	}
	
	public void showScene(String context){
		SceneMap sceneMap = Configuration.getInstance().getSceneMap();
		if(sceneMap.containsKey(context)){
			this.currentScene = sceneMap.get(context);
			this.currentScene.init();
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
