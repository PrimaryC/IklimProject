package view;


import java.awt.BorderLayout;
import java.awt.FlowLayout;

import javax.swing.*;
import modelAbstract.*;

import controller.ButtonListener;

public class ResourceManagerPanel extends JPanel{
	AbstractDataKey selectedResourceItem;
	
	JButton graphicResourceTabButton;
	JButton soundResourceTabButton;
	JButton effectTabButton;
	JButton addResourceButton;
	
	JPanel buttonPanel;
	JPanel tabPanel;
	
	JTabbedPane tab;
	
	
	public ResourceManagerPanel(){
		graphicResourceTabButton = new JButton();
		soundResourceTabButton = new JButton();
		effectTabButton = new JButton();
		addResourceButton = new JButton();
		
		buttonPanel = new JPanel();
		tabPanel = new JPanel();
		
		tab = new JTabbedPane();
	}
	
	public void init(){
		this.setLayout(new BorderLayout());
		buttonPanel.setLayout(new FlowLayout());
		
		tab.add("Graphic", graphicResourceTabButton);
		tab.add("Sound",soundResourceTabButton);
		tab.add("Effect", effectTabButton);
		tabPanel.add(tab);
		
		this.add(tabPanel, "Center");
		this.add(buttonPanel, "South");
	}
	
	public void addButtonListener(ButtonListener bl) {
		
	}

	public AbstractDataKey getSelectedResourceItem() {
		return selectedResourceItem;
	}

	public void setSelectedResourceItem(AbstractDataKey selectedResourceItem) {
		this.selectedResourceItem = selectedResourceItem;
	}

}
