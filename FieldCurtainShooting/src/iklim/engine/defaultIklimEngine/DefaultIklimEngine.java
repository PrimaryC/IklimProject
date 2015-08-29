package iklim.engine.defaultIklimEngine;


import iklim.engine.defaultIklimEngine.viewer.IklimGameViewer;

import java.awt.event.KeyListener;
import java.util.Timer;

public class DefaultIklimEngine{
	private final Timer						timer;
	private final RepaintTask				repaint;
	private final IklimGameViewer			view;
	
	
	public DefaultIklimEngine() {
		timer = new Timer();
		view = new IklimGameViewer();
		repaint = new RepaintTask(view);
	}
	
	public boolean init() {
		view.init();
		return true;
	}
	
	public void addKeyListener(KeyListener l){
		view.addKeyListener(l);
	}
	
	public void addSceneListener(SceneListener l){
		repaint.addSceneListener(l);
	}
	
	public void run(String scene) {
		view.run(scene);
		timer.scheduleAtFixedRate(repaint, 0, 16);
	}

	public IklimGameViewer getViewerInterface() {
		return view;
	}

	public void switchScene(String sceneName) {
		view.showScene(sceneName);
		
	}

}
