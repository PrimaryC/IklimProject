package iklim.engine.gameInterface;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.util.HashMap;
import java.util.Map;

import javax.swing.JPanel;

import iklim.engine.configuration.Configuration;
import iklim.engine.configuration.ViewerProperty;
import iklim.engine.uidata.AbstractGameViewerModel;
import iklim.engine.uidata.IklimGameViewerDataManager;

public abstract class AbstractGameLayer extends JPanel {
	private static final long serialVersionUID = -6669890346906001682L;
	private HashMap<String, LayoutedImage> images;

	public AbstractGameLayer() {
		images = new HashMap<String, LayoutedImage>();
		this.setLayout(null);
		ViewerProperty view = Configuration.getInstance().getViewerProperty();
		this.setBounds(0,0,view.getSize().width, view.getSize().height);

	}

	public void paint(Graphics g) {
		Graphics2D g2d = (Graphics2D) g;
		RenderingHints rh = new RenderingHints(
	             RenderingHints.KEY_INTERPOLATION,
	             RenderingHints.VALUE_INTERPOLATION_BILINEAR);
	    g2d.setRenderingHints(rh);
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

	public Map<String, LayoutedImage> getImageMap() {
		return images;
	}
	

	public abstract void animate();

	public abstract void init() ;
}
