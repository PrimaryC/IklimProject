package view;

import java.awt.Component;
import java.awt.Graphics;
import java.util.LinkedList;

import javax.swing.*;
import javax.swing.tree.DefaultMutableTreeNode;

import ViewModel.EpisodeListModel;
import ViewModel.EpisodeTreeNode;
import ViewModel.TreeMaker;
import controller.ButtonListener;
import static staticContext.UtilityContext.*;
import model.*;
import modelAbstract.*;

public class EpisodeListPanel extends JPanel {
	
	private AbstractDataKey currentSentenceKey;
	private JButton createEpisodeButton;
	private JButton createComponentButton;
	private JButton deleteComponentButton;
	private EpisodeListModel model;

	private JScrollPane episodeTreeViewer;
	private EpisodeTreeNode mainNode;
	
	public EpisodeListPanel(EpisodeListModel model){
		createEpisodeButton = new JButton(CreateEpisodeButton);
		createComponentButton = new JButton("+");
		deleteComponentButton = new JButton("-");
		this.model = model;
		episodeTreeViewer = new JScrollPane();
		mainNode = new EpisodeTreeNode("root");


		init();
	}
	
	public void init(){
		this.add(createEpisodeButton);
		this.add(episodeTreeViewer);
		this.add(createComponentButton);
		this.add(deleteComponentButton);

	
		
		episodeTreeViewer.setSize(240,500);
		episodeTreeViewer.setLocation(0,0);
		episodeTreeViewer.setViewportView(model.getEpisodeTree());
		
		createEpisodeButton.setSize(60,35);
		createEpisodeButton.setLocation(0, 500);
		
		createComponentButton.setSize(60,35);
		createComponentButton.setLocation(60,500);
		createComponentButton.setActionCommand(CreateComponentButton);
		
		deleteComponentButton.setSize(60,35);
		deleteComponentButton.setLocation(120,500);
		deleteComponentButton.setActionCommand(DeleteComponentButton);

	}
	
	public void redrawComponents(){
		episodeTreeViewer.setViewportView(model.getEpisodeTree());
	}
	
	public void setCurrentLocation(AbstractDataKey getCurrentSentenceKey) {
		this.currentSentenceKey = getCurrentSentenceKey;
	}
	
	public void addButtonListener(ButtonListener bl) {
		createEpisodeButton.addActionListener(bl);
		createComponentButton.addActionListener(bl);
		deleteComponentButton.addActionListener(bl);

	}

	public AbstractDataKey getCurrentSentenceKey() {
		return currentSentenceKey;
	}

	
}
