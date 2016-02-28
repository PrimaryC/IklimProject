package iklim.engine;

import java.util.LinkedList;
import java.util.TimerTask;

import iklim.engine.configuration.Configuration;
import iklim.engine.gameInterface.IklimGameViewer;

public class RepaintTask extends TimerTask{
	private IklimGameViewer 				viewer;
	
	public RepaintTask(IklimGameViewer viewer) {
		this.viewer = viewer;
	}
	
	public void run() {
		viewer.animate();
		viewer.repaint();
		if(viewer.isSceneOver()){
			SceneCloseEvent sce = new SceneCloseEvent(viewer.getCurrentScene());
			sce.setSceneContext(viewer.getCurrentScene().getSceneContext());
			for (SceneListener sceneListener : Configuration.getInstance().getSceneListener()) {
				sceneListener.sceneOvered(sce);
			}
		}
	}

}
