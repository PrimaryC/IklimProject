package iklim.fieldCurtain.scenes.logo;

import iklim.engine.defaultIklimEngine.viewer.GameScene;

public class LogoScene extends GameScene {
	private LogoLayer				layer;
	public LogoScene() {
		super("Logo");
		layer = new LogoLayer();
		this.addLayer(layer);
	}

	@Override
	public boolean isClosed() {
		return layer.isOver();
	}

	public void skip() {
		layer.skip();
		
	}

}
