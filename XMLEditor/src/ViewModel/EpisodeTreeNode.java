package ViewModel;

import java.util.Enumeration;

import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.TreeNode;

import java.util.LinkedList;

import model.*;
import modelAbstract.AbstractData;
import modelAbstract.AbstractDataKey;

public class EpisodeTreeNode extends DefaultMutableTreeNode{
	private AbstractDataKey key;
	
	public EpisodeTreeNode(AbstractDataKey key){
		this.key = key;
	}
	
	public EpisodeTreeNode(Object userObject){
		super(userObject);
	}
	
	public EpisodeTreeNode(AbstractData data){
		if(data instanceof Episode)
			this.userObject = ((Episode) data).getName();
		else
			this.userObject = data.getIndex();
		this.key = data.getKey();
	}
	
	public AbstractDataKey getKey() {
		if(key != null)
			return key;
		else
			return null;
	}

	public void setKey(AbstractDataKey key) {
		this.key = key;
	}
}
