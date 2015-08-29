package iklim.fieldCurtain;

import iklim.engine.defaultIklimEngine.DefaultIklimEngine;
import iklim.engine.defaultIklimEngine.viewer.IklimGameViewer;
import iklim.fieldCurtain.scenes.logo.LogoScene;
import iklim.fieldCurtain.scenes.title.TitleScene;

public class FieldCurtainCore {
	private final DefaultIklimEngine				engine;
	private LogoScene								logoScene;
	
	public FieldCurtainCore() {
		engine = new DefaultIklimEngine();
		engine.init();
		
		logoScene = new LogoScene();
		
		IklimGameViewer view = engine.getViewerInterface();
		engine.getViewerInterface().addKeyListener(new KeyboardInputListener(this));
		view.addScene("Logo", logoScene);
		view.addScene("Title", new TitleScene());
		
		SceneCloseListener listener = new SceneCloseListener(this);
		engine.addSceneListener(listener);
		
		engine.run("Title");
	}
	public static void main(String[] args) {
		new FieldCurtainCore();
	}
	public void logoOver() {
		engine.switchScene("Title");
	}
	public void aKeyPressed() {
		if(engine.getViewerInterface().getCurrentScene() instanceof LogoScene){
			logoScene.skip();
		}
		
	}
}
