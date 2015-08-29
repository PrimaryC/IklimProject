package iklim.fieldCurtain;

import iklim.engine.defaultIklimEngine.SceneCloseEvent;
import iklim.engine.defaultIklimEngine.SceneListener;

public class SceneCloseListener implements SceneListener{
	private FieldCurtainCore					core; 

	public SceneCloseListener(FieldCurtainCore core) {
		this.core = core;
	}
	@Override
	public void sceneOvered(SceneCloseEvent e) {
		if(e.getSceneContext().equals("Logo")){
			core.logoOver();
		}
		
	}

}
