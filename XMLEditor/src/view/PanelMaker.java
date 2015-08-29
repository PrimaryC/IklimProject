package view;

import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.Insets;

import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class PanelMaker {
	private GridBagConstraints cs;

	
	
	public PanelMaker(){
		cs = new GridBagConstraints();
		init();
	}
	
	private void init() {
		cs.gridheight = 1;
		cs.gridwidth = 1;
		cs.gridx = 1;
		cs.gridy = 0;
		cs.weightx = 1;
		cs.weighty = 1;
	}

	public void addComponent(JPanel panel, LabeledComponent comp){
		cs.gridx = 0;
		cs.weightx = 0.3;
		panel.add(new JLabel("    "),cs);
		cs.weightx = 1;
		cs.gridx = 1;
		
		cs.anchor = GridBagConstraints.WEST;

	
		
		panel.add(comp.getLabel(), cs);
		
		cs.gridx = 2;
		cs.weightx = 5;
		cs.anchor = GridBagConstraints.EAST;
		comp.getComponent().setPreferredSize(new Dimension(170,30));
	
		panel.add(comp.getComponent(),cs);
		cs.gridx = 3;
		cs.weightx = 0.7;
		panel.add(new JLabel("    "),cs);
		cs.gridy++;
	}
	
	public void addComponent(JComponent component,JPanel wrapPanel){
		cs.gridx = 0;
		component.add(wrapPanel, cs);
		cs.gridy++;
	}
	
	public void addComponent(JComponent component,JPanel wrapPanel, int weightY){
		cs.gridx = 0;
		cs.weighty = weightY;
		component.add(wrapPanel, cs);
		cs.weighty = 1;
		cs.gridy++;
	}
	
	
	public void setGridBagFill(int fill){
		cs.fill = fill;
	}
	
	public void setGridBagAnchor(int anchor){
		cs.anchor = anchor;
	}

}
