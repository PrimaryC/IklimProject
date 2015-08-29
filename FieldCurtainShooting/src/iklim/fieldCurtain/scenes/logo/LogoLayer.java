package iklim.fieldCurtain.scenes.logo;

import static iklim.engine.defaultIklimEngine.Configuration.ViewConfig.*;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;

import iklim.engine.defaultIklimEngine.Configuration;
import iklim.engine.defaultIklimEngine.resource.IklimResourceManager;
import iklim.engine.defaultIklimEngine.resource.ResourceNotFoundException;
import iklim.engine.defaultIklimEngine.viewer.GameViewLayer;

public class LogoLayer extends GameViewLayer {
	private Image 				image;
	private float				brightness;
	private boolean				bright;
	private int					waitTime;
	private boolean				over;
	public LogoLayer() {
		over = false;
		waitTime = 180;
		bright = false;
		this.setZIndex(1);
		try {
			image = IklimResourceManager.getImage("logo");
		} catch (ResourceNotFoundException e) {
			System.exit(-1);
			e.printStackTrace();
		}
		brightness = 0;
	}
	@Override
	public void paint(Graphics g) {
		
		Graphics2D g2d = (Graphics2D) g;
		g2d.setComposite(AlphaComposite.SrcOver.derive(1f));
		g.setColor(Color.BLACK);
		g.fillRect(0, 0, FrameWidth, FrameHeight);
		g2d.setComposite(AlphaComposite.SrcOver.derive(brightness));
		g.drawImage(image, FrameWidth/2 - image.getWidth(this)/2, FrameHeight/2 - image.getHeight(this)/2, this);
		
	}
	@Override
	public void animate() {
		if(over) return;
		if(!bright)
			brightness += 0.01f;
		else{
			brightness -= 0.01f;
		}
		if(brightness>=1f){
			brightness = 1f;
			waitTime--;
		}
		if(waitTime<0){
			bright = true;
		}
		if(bright&&brightness<=0){
			brightness = 0f;
			over = true;
		}
		
	}
	public boolean isOver() {
		
		return over;
	}
	public void skip() {
		if(!bright&&waitTime==180){
			brightness = 1f;
		}else if(!bright&&waitTime!=180){
			bright = true;
			waitTime = 0;
		}else if(bright){
			over = true;
		}
		
		
	}
	
}
