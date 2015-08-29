package view;

import java.awt.Color;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.util.LinkedList;

import javax.swing.BorderFactory;
import javax.swing.JLabel;
import javax.swing.JPanel;

public class RowStatusPanel extends JPanel{
	LinkedList<WrapPanel> panelList;
	LinkedList<LabeledComponent> componentList;
	PanelMaker panelMaker;
	
	public RowStatusPanel(){
		panelList = new LinkedList<WrapPanel>();
		componentList = new LinkedList<LabeledComponent>();
		panelMaker = new PanelMaker();
	}
	
	public void init(){
		panelMaker.setGridBagFill(GridBagConstraints.HORIZONTAL);

		
		this.setLayout(new GridBagLayout());
		this.setBorder(BorderFactory.createLineBorder(Color.black));
		
		panelList.add(new WrapPanel(1));
		panelList.add(new WrapPanel(1));
		componentList.add(new LabeledComponent(new JLabel(),"Row"));
		componentList.add(new LabeledComponent("Forced Input"));
		

		panelList.get(0).addLabeledComponent(componentList.get(0));
		panelMaker.addComponent(this, panelList.get(0));
		
		panelMaker.setGridBagAnchor(GridBagConstraints.NORTH);
		panelList.get(1).addLabeledComponent(componentList.get(1));
		panelMaker.addComponent(this, panelList.get(1),10);
		
	}
	
	
	
}
