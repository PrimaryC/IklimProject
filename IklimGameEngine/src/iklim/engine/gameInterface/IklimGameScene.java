package iklim.engine.gameInterface;

import java.awt.Graphics;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.image.BufferedImage;
import java.nio.file.attribute.AclEntry.Builder;
import java.util.HashMap;
import java.util.LinkedList;

import javax.swing.JPanel;

import iklim.engine.configuration.Configuration;
import iklim.engine.configuration.ViewerProperty;
import iklim.engine.uidata.IklimGameViewerDataManager;


public abstract class IklimGameScene extends JPanel implements KeyListener{
	private static final long serialVersionUID = -6340898452471020840L;
	private LinkedList<AbstractGameLayer> layerList;
	
	private String						context;
	private boolean 					over;

	public IklimGameScene(String name){
		this.context = name;
		layerList = new LinkedList<AbstractGameLayer>();
		this.setLayout(null);
		ViewerProperty view = Configuration.getInstance().getViewerProperty();
		this.setBounds(0,0,view.getSize().width, view.getSize().height);
		
	}
	
	public abstract void setViewModel(IklimGameViewerDataManager viewModel);
	
	
	public AbstractGameLayer getLayer(int i){
		return layerList.get(i);
	}
	
	public LinkedList<AbstractGameLayer> getLayerList() {
		
		return layerList;
	}

	public void addLayer(AbstractGameLayer layer){
		this.add(layer);
		layerList.add(layer);
	}
	
	@Override
	public void paint(Graphics g) {
		BufferedImage i = new BufferedImage(this.getWidth(), this.getHeight(), BufferedImage.TYPE_4BYTE_ABGR);
		Graphics nextFrame = i.getGraphics();
		for (AbstractGameLayer abstractGameLayer : layerList) {
			abstractGameLayer.paint(nextFrame);
		}
		g.drawImage(i, 0, 0, null);
	}

	public void animate() {
		for (AbstractGameLayer abstractGameLayer : layerList) {
			abstractGameLayer.animate();
		}
	}

	public boolean isOver() {
		return over;
	}
	public void setOver(boolean state){
		this.over = state;
	}

	public String getSceneContext() {
		return this.context;
	}

	public void init() {
		for (AbstractGameLayer abstractGameLayer : layerList) {
			abstractGameLayer.init();
		}
	}

	@Override
	public void keyPressed(KeyEvent e) {
		String key = KeyConfiguration.getPressedKeyByValue(e.getKeyCode());
		if(key != null)
			keyPressed(key);
	}

	public abstract void keyPressed(String key);

	@Override
	public void keyReleased(KeyEvent e) {}

	@Override
	public void keyTyped(KeyEvent e) {}
	
	
}
