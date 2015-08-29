package ViewModel;

import java.awt.Point;
import java.util.LinkedList;

import javax.swing.JTree;

import modelAbstract.AbstractData;


public class ViewModelManager {
	private EpisodeListModel episodeListModel;
	private Point frameEndPoint;
	private SceneStatusData sceneStatusData;
	
	
	public ViewModelManager(){
		frameEndPoint = new Point(1000,1000);
		episodeListModel =  new EpisodeListModel(frameEndPoint);
		sceneStatusData = new SceneStatusData(frameEndPoint);
	}

	public EpisodeListModel getEpisodeListModel() {
		return episodeListModel;
	}
	
	public void makeTree(LinkedList<AbstractData> episodeList){
		episodeListModel.setData(TreeMaker.makeTree(episodeList));
	}

	public Point getFrameEndPoint() {
		return frameEndPoint;
	}

	public void setFrameEndPoint(Point frameEndPoint) {
		this.frameEndPoint = frameEndPoint;
	}

	public SceneStatusData getSceneStatusData() {
		return sceneStatusData;
	}

	public void setSceneStatusData(SceneStatusData sceneStatusData) {
		this.sceneStatusData = sceneStatusData;
	}
	
	
}
