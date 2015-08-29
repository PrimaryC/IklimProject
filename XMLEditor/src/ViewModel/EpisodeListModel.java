package ViewModel;

import java.awt.Point;

import javax.swing.JTree;

import modelAbstract.AbstractData;
import modelAbstract.AbstractDataKey;

public class EpisodeListModel extends AbstractViewData{
	private JTree episodeTree;
	
	public EpisodeListModel(Point p){
		super(p);
		episodeTree = new JTree(new EpisodeTreeNode("root"));
	}
	
	public void setData(JTree tree){
		episodeTree = tree;
	}
	
	
	public JTree getEpisodeTree() {
		return episodeTree;
	}
	
	public AbstractDataKey getLastSelectedKey(){
		EpisodeTreeNode data = (EpisodeTreeNode)episodeTree.getLastSelectedPathComponent();
		return data.getKey();
	}

	
}
