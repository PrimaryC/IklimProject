package iklim.engine.defaultIklimEngine;

import iklim.engine.defaultIklimEngine.viewer.IklimGameViewer;

import java.util.LinkedList;
import java.util.TimerTask;

public class RepaintTask extends TimerTask{
	private IklimGameViewer 				viewer;
	private LinkedList<SceneListener>		listenerList;
	public RepaintTask(IklimGameViewer viewer) {
		this.viewer = viewer;
		listenerList = new LinkedList<SceneListener>();
	}
	
	public void addSceneListener(SceneListener l){
		listenerList.add(l);
	}
	
	@Override
	public void run() {
		viewer.animate();
		viewer.repaint();
		if(viewer.isSceneOver()){
			SceneCloseEvent sce = new SceneCloseEvent(viewer.getCurrentScene());
			sce.setSceneContext(viewer.getCurrentScene().getSceneContext());
			for (SceneListener sceneListener : listenerList) {
				sceneListener.sceneOvered(sce);
			}
		}
	}

}
