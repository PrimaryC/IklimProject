package iklim.engine.defaultIklimEngine.viewer;

import iklim.engine.defaultIklimEngine.Configuration;

import javax.swing.JPanel;

public abstract class GameViewLayer extends JPanel{
	private static final long serialVersionUID = 7617988368024717936L;
	
	private int						zIndex;
	
	public GameViewLayer() {
		this.setBounds(0,0,Configuration.ViewConfig.FrameWidth, Configuration.ViewConfig.FrameHeight);
	}

	public void animate(){
		return;
	}
	
	public void setZIndex(int z){
		this.zIndex = z;
	}

	public int getZIndex() {
		return zIndex;
	}
	
}
