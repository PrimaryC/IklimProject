package iklim.engine.configuration;

import java.awt.Dimension;

public class ViewerProperty {
	private Dimension 				viewerSize;

	public void setSize(Dimension d) {
		this.viewerSize = d;
		
	}
	
	public Dimension getSize(){
		return viewerSize;
	}
	
}
