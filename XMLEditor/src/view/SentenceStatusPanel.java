package view;

import java.awt.Color;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.util.LinkedList;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.JTextField;

public class SentenceStatusPanel extends JPanel{
	
		LinkedList<WrapPanel> panelList;
		LinkedList<LabeledComponent> componentList;
		PanelMaker panelMaker;
		
		public SentenceStatusPanel(){
			panelList = new LinkedList<WrapPanel>();
			componentList = new LinkedList<LabeledComponent>();
			panelMaker = new PanelMaker();
		}
		
		public void init(){
			panelMaker.setGridBagFill(GridBagConstraints.HORIZONTAL);
			this.setLayout(new GridBagLayout());
			this.setBorder(BorderFactory.createLineBorder(Color.black));
			
			panelList.add(new WrapPanel(2));
			panelList.add(new TextSetPanel());
			panelList.add(new WrapPanel(1));
			panelList.add(new WrapPanel(1));
			
			componentList.add(new LabeledComponent(new JLabel(),"Sentence"));
			componentList.add(new LabeledComponent(new JButton(),"Effect"));
			componentList.get(1).setComponentText("set");
			componentList.add(new LabeledComponent(new JButton()));
			
			for(int i = 0; i < panelList.size();i++){
				panelMaker.addComponent(this, panelList.get(i));
			}
			panelList.get(0).addLabeledComponent(componentList.get(0));
			panelList.get(0).addLabeledComponent(componentList.get(1));
			panelList.get(2).addComponent(new JTextField());
			panelList.get(3).addLabeledComponent(componentList.get(2));		
		}
		
		
		
}

