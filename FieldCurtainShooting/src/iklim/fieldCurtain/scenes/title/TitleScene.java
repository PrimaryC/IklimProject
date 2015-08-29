package iklim.fieldCurtain.scenes.title;

import iklim.engine.defaultIklimEngine.viewer.GameScene;

public class TitleScene extends GameScene {
	private static final long serialVersionUID = -6319653404756387969L;
	
	public TitleScene() {
		super("Title");
		TitleBackGroundLayer layer = new TitleBackGroundLayer();
		this.addLayer(layer);
		this.addLayer(new TitleMenuLayer());
	}


}
