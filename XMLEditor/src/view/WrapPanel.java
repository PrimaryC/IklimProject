package view;

import java.awt.Color;
import java.awt.GridBagLayout;

import javax.swing.BorderFactory;
import javax.swing.JComponent;
import javax.swing.JPanel;

public class WrapPanel extends JPanel{
	private int panelSize;
	private PanelMaker panelMaker;
	
	public WrapPanel(int size){
		this.panelSize = size;
		panelMaker = new PanelMaker();
		this.setLayout(new GridBagLayout());
	}
	
	public void drawBorder(){
		this.setBorder(BorderFactory.createLineBorder(Color.black));
	}
	public int getPanelSize() {
		return panelSize;
	}

	public void setPanelSize(int panelSize) {
		this.panelSize = panelSize;
	}
	
	public void addLabeledComponent(LabeledComponent component){
		panelMaker.addComponent(this, component);
	}
	
	public void addComponent(JComponent component){
		panelMaker.addComponent(component, this);
	}
	
	public void setGridBagFill(int fill){
		panelMaker.setGridBagFill(fill);
	}
}
