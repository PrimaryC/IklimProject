package iklim.engine.gameInterface;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.geom.AffineTransform;
import java.util.HashMap;

import javax.swing.JPanel;

import iklim.engine.uidata.ViewModelManager;

public abstract class AbstractLayer extends JPanel{
	private HashMap<String,LayoutedImage>	images;
	public abstract void setModel(ViewModelManager model);
	
	public void paint(Graphics g) {
		Graphics2D g2d = (Graphics2D) g;
		for (LayoutedImage img : images.values()) {
			AffineTransform trans = new AffineTransform();
			trans.translate(img.getPosX(), img.getPosY());
			trans.rotate(img.getRotateTheta());
			trans.scale(img.getZoomX(), img.getZoomY());
			g2d.drawImage(img.getImage(), trans, null);
		}
		drawElements(g);
	}

	public abstract void drawElements(Graphics g);
	
}
