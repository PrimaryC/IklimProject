package iklim.itmaru.view.layer;

import iklim.engine.gameInterface.layer.AbstractLayer;
import iklim.engine.uidata.ViewModelManager;

public class AbstractRotateLayer extends AbstractLayer{
	private int centralX;
	private int centralY;
	private int rotation;
	
	public int getCentralX() {
		return centralX;
	}
	public void setCentralX(int centralX) {
		this.centralX = centralX;
	}
	public int getCentralY() {
		return centralY;
	}
	public void setCentralY(int centralY) {
		this.centralY = centralY;
	}
	public int getRotation() {
		return rotation;
	}
	public void setRotation(int rotation) {
		this.rotation = rotation;
	}
	
	@Override
	public void setModel(ViewModelManager model) {
		
	}
	
}
