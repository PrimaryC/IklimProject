package iklim.fieldCurtain.scenes.title;

import java.awt.BorderLayout;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;

import javax.sound.sampled.Clip;

import static iklim.engine.defaultIklimEngine.Configuration.ViewConfig.*;
import iklim.engine.defaultIklimEngine.resource.IklimResourceManager;
import iklim.engine.defaultIklimEngine.resource.ResourceNotFoundException;
import iklim.engine.defaultIklimEngine.viewer.GameViewLayer;
import iklim.engine.defaultIklimEngine.viewer.LayoutUtility;

public class TitleMenuLayer extends GameViewLayer{
	private String							currentMenu;
	private Clip							cursorMove;
	private Image							startMenu;
	private Image							readyMenu;
	private Image							exitMenu;
	public TitleMenuLayer() {
		try {
			cursorMove = IklimResourceManager.getAudio("cursorMove");
			startMenu = IklimResourceManager.getImage("start");
			readyMenu = IklimResourceManager.getImage("ready");
			exitMenu = IklimResourceManager.getImage("exit");
			
		} catch (ResourceNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		makePosition();
	}
	
	@Override
	public void paint(Graphics g) {
//		g.drawImage(startMenu, LayoutUtility.getRelativePosition(10, LayoutUtility.RelativeFrom.Right, LayoutUtility.RelationBy.Percentage), y, this);
		g.drawImage(startMenu, 1000, 400, this);
		g.drawImage(readyMenu, 1000, 500, this);
		g.drawImage(exitMenu, 1000, 600, this);
		int menuPos = 0;
		if(currentMenu=="start"){
			menuPos = 395;
		}
		if(currentMenu=="ready"){
			menuPos = 495;
		}
		if(currentMenu=="exit"){
			menuPos = 595;
		}
		g.fillOval(965,menuPos,10,10);
	}
	
	public void makePosition(){
		
	}
	
	@Override
	public void animate() {
	}
	
}
