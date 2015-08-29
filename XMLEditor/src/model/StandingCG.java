package model;

import staticContext.*;

import modelAbstract.AbstractData;
import modelAbstract.AbstractDataKey;

public class StandingCG extends AbstractData{
	private AbstractDataKey graphicSourceKey;
	private int x;
	private int y;
	private boolean isLayout;
	private float blur;
	private float size;
	private int index;
	
	public StandingCG(int id, AbstractDataKey sentenceKey, AbstractDataKey source){
		super(new AbstractDataKey(UtilityContext.StandingCGID,id));
		graphicSourceKey = source;
		x = 0;
		y = 0;
		isLayout = true;
		blur = 0;
		size = 0;
		index = 0;
		this.parent = sentenceKey;
	}
	
	

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public float getSize() {
		return size;
	}

	public void setSize(float size) {
		this.size = size;
	}

	public float getBlur() {
		return blur;
	}
	public void setBlur(float blur) {
		this.blur = blur;
	}
	
	public AbstractDataKey getGraphicSourceKey() {
		return graphicSourceKey;
	}

	public void setGraphicSourceKey(AbstractDataKey graphicSourceKey) {
		this.graphicSourceKey = graphicSourceKey;
	}

	public int getX() {
		return x;
	}
	public void setX(int x) {
		this.x = x;
	}
	public int getY() {
		return y;
	}
	public void setY(int y) {
		this.y = y;
	}
	public boolean isLayout() {
		return isLayout;
	}
	public void setLayout(boolean isLayout) {
		this.isLayout = isLayout;
	}
	
	
}
