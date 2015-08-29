package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.util.LinkedList;
import java.util.UUID;

import javax.swing.*;

import ViewModel.ViewModelManager;
import controller.ButtonListener;
import model.Episode;
import model.ModelManager;
import modelAbstract.*;
import static staticContext.UtilityContext.*;

public class ViewManager {
	private ResourceManagerPanel resourceManagerPanel;
	private EpisodeListPanel episodeListPanel;
	private ToolboxPanel toolboxPanel;
	private StatusPanel statusPanel;
	private JFrame mainFrame;
	private CenterPanel centerPanel;
	private EpisodeCreationFrame episodeCreationFrame;
	private ViewModelManager viewModel;
	private SceneStatusPanel sceneStatusPanel;
	private RowStatusPanel rowStatusPanel;
	private SentenceStatusPanel sentenceStatusPanel;
	
	
	public ViewManager(ViewModelManager viewModel){
		this.viewModel = viewModel;
		resourceManagerPanel = new ResourceManagerPanel();
		episodeListPanel = new EpisodeListPanel(viewModel.getEpisodeListModel());
		toolboxPanel = new ToolboxPanel();
		statusPanel = new StatusPanel();
		mainFrame = new JFrame("test");
		centerPanel = new CenterPanel();
		episodeCreationFrame = new EpisodeCreationFrame();
		sceneStatusPanel = new SceneStatusPanel(viewModel.getSceneStatusData());
		rowStatusPanel = new RowStatusPanel();
		sentenceStatusPanel = new SentenceStatusPanel();
		init();
	}
	
	
	public void init(){
		episodeListPanel.init();
		sceneStatusPanel.init();
		rowStatusPanel.init();
		sentenceStatusPanel.init();
		
		mainFrame.setSize(1280, 800);
		mainFrame.setLayout(null);
		
		episodeListPanel.setLayout(null);//Extreme Caution!!!!!!!!!
		episodeListPanel.setBounds(0, 0, 240,535);
		
		sceneStatusPanel.setBounds(900,0,380,535);
		
		rowStatusPanel.setBounds(900,0,380,535);
		sentenceStatusPanel.setBounds(900,0,380,535);
		
		mainFrame.add(sceneStatusPanel);
		mainFrame.add(resourceManagerPanel);
		mainFrame.add(episodeListPanel);
		mainFrame.add(statusPanel);
		mainFrame.add(toolboxPanel);
		mainFrame.add(centerPanel);
		mainFrame.add(rowStatusPanel);
		mainFrame.add(sentenceStatusPanel);
		mainFrame.setVisible(true);
		rowStatusPanel.setVisible(false);
		sceneStatusPanel.setVisible(false);
		mainFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}
		
	public void repaint(){
		mainFrame.repaint();
		episodeListPanel.redrawComponents();
	}
	
	public void addButtonListener(ButtonListener bl){
		resourceManagerPanel.addButtonListener(bl);
		episodeListPanel.addButtonListener(bl);
		episodeCreationFrame.addButtonListener(bl);
	}
	
	

	public ResourceManagerPanel getResourceManagerPanel() {
		return resourceManagerPanel;
	}


	public void setResourceManagerPanel(ResourceManagerPanel resourceManagerPanel) {
		this.resourceManagerPanel = resourceManagerPanel;
	}


	public EpisodeListPanel getEpisodeListPanel() {
		return episodeListPanel;
	}


	public void setEpisodeListPanel(EpisodeListPanel episodeListPanel) {
		this.episodeListPanel = episodeListPanel;
	}


	public ToolboxPanel getToolboxPanel() {
		return toolboxPanel;
	}


	public void setToolboxPanel(ToolboxPanel toolboxPanel) {
		this.toolboxPanel = toolboxPanel;
	}


	public StatusPanel getStatusPanel() {
		return statusPanel;
	}


	public void setStatusPanel(StatusPanel statusPanel) {
		this.statusPanel = statusPanel;
	}


	public JFrame getMainFrame() {
		return mainFrame;
	}


	public void setMainFrame(JFrame mainFrame) {
		this.mainFrame = mainFrame;
	}


	public CenterPanel getCenterPanel() {
		return centerPanel;
	}


	public void setCenterPanel(CenterPanel centerPanel) {
		this.centerPanel = centerPanel;
	}


	public EpisodeCreationFrame getEpisodeCreationFrame() {
		return episodeCreationFrame;
	}


	public void setEpisodeCreationFrame(EpisodeCreationFrame episodeCreationFrame) {
		this.episodeCreationFrame = episodeCreationFrame;
	}


	public AbstractDataKey getSelectedResourceItem() {
		return resourceManagerPanel.getSelectedResourceItem();
	}



	public AbstractDataKey getSelectedSentence() {
		return episodeListPanel.getCurrentSentenceKey();
	}


	public int getStandingCGSizeInputValue() {
		return statusPanel.getStandingCGSizeInputValue();
	}


	public AbstractDataKey getSelectedStandingCGKey() {
		return statusPanel.getSelectedStandingCGKey();
	}

	public int getSelectedStandingCGBlur() {
		return statusPanel.getStandingCGBlurInputValue();
	}


	public int getSelectedStandingCGXCoordinate() {
		return statusPanel.getStandingCGXInputValue();
	}
	
	public int getSelectedStandingCGYCoordinate() {
		return statusPanel.getStandingCGYInputValue();
	}


	public String getSelectedText() {
		return statusPanel.getText();
	}


	public void setEpisodeCreationFrameVisibility(boolean visiblity) {
		episodeCreationFrame.setVisible(visiblity);
	}
}
