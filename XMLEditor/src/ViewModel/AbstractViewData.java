package ViewModel;

import java.awt.Point;

public class AbstractViewData {
	private Point mainFrameSize;
	private Point panelSize;
	private Point panelLocation;
	
	public AbstractViewData(Point mainFrameSize){
		this.mainFrameSize = mainFrameSize;
		this.panelSize = new Point();
		this.panelLocation = new Point();
	}

	public Point getMainFrameSize() {
		return mainFrameSize;
	}

	public void setMainFrameSize(Point mainFrameSize) {
		this.mainFrameSize = mainFrameSize;
	}

	public Point getPanelSize() {
		return panelSize;
	}

	public void setPanelSize(Point panelSize) {
		this.panelSize = panelSize;
	}

	public Point getPanelLocation() {
		return panelLocation;
	}

	public void setPanelLocation(Point panelLocation) {
		this.panelLocation = panelLocation;
	}
	

	
}
