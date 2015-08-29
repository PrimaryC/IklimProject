package iklim.fieldCurtain.scenes.title;

import java.awt.Graphics;
import java.awt.Image;

import iklim.engine.defaultIklimEngine.resource.IklimResourceManager;
import iklim.engine.defaultIklimEngine.resource.ResourceNotFoundException;
import iklim.engine.defaultIklimEngine.viewer.GameViewLayer;

public class TitleBackGroundLayer extends GameViewLayer {
	private Image					titleBack;
	
	public TitleBackGroundLayer() {
		this.setZIndex(9);
		try {
			titleBack = IklimResourceManager.getImage("titleBack");
		} catch (ResourceNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Override
	public void paint(Graphics g) {
		g.drawImage(titleBack, 0, 0, this);
	}
	


}
