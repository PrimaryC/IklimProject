package view;

import java.awt.Color;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.util.LinkedList;
import javax.swing.*;
import ViewModel.SceneStatusData;

public class SceneStatusPanel extends JPanel{
	private SceneStatusData data;
	private LinkedList<LabeledComponent> panelList;
	private LinkedList<WrapPanel> wrapPanelList;
	private PanelMaker panelMaker;

	
	public SceneStatusPanel(SceneStatusData data){
		this.data = data;
		panelList = new LinkedList<LabeledComponent>();
		wrapPanelList = new LinkedList<WrapPanel>();
		panelMaker = new PanelMaker();	
	}
	
	public void init(){
		int panelCount = 0;
		WrapPanel currentPanel;
		panelMaker.setGridBagFill(GridBagConstraints.BOTH);
		this.setLayout(new GridBagLayout());
		this.setBorder(BorderFactory.createLineBorder(Color.black));
		
		
		panelList.add(new LabeledComponent(new JLabel(),"Scene"));
		panelList.add(new LabeledComponent("Forced Input"));
		panelList.add(new LabeledComponent(new JLabel(),"Textbox"));
		panelList.add(new LabeledComponent("X"));
		panelList.add(new LabeledComponent("Y"));
		panelList.add(new LabeledComponent("Width"));
		panelList.add(new LabeledComponent("Height"));
		panelList.add(new LabeledComponent(new JButton(),"Background"));
		panelList.add(new LabeledComponent("Blur"));
		panelList.add(new LabeledComponent(new JButton(),"BGM"));
		panelList.add(new LabeledComponent("Fade"));
		panelList.add(new LabeledComponent(new JButton("Confirm"), ""));
		
		wrapPanelList.add(new WrapPanel(1));
		wrapPanelList.add(new WrapPanel(1));
		wrapPanelList.add(new WrapPanel(5));
		wrapPanelList.add(new WrapPanel(2));
		wrapPanelList.add(new WrapPanel(2));
		wrapPanelList.add(new WrapPanel(1));
		
		for(int i = 0; i < wrapPanelList.size();i++){
			currentPanel = wrapPanelList.get(i);
			
			
			for(int j = 0; j < wrapPanelList.get(i).getPanelSize();j++){
				currentPanel.addLabeledComponent(panelList.get(panelCount));
				panelCount++;
			}
			
			panelMaker.addComponent(this, currentPanel);
		}
		
	}
	
	

	
}
