package ViewModel;

import java.util.LinkedList;

import javax.swing.JTree;

import model.*;
import modelAbstract.AbstractData;

public class TreeMaker {
	
	public static JTree makeTree(LinkedList<AbstractData> episodeList){
		JTree tree;
		EpisodeTreeNode mainNode = new EpisodeTreeNode("root");
		
		for(int i = 0; i < episodeList.size();i++){
			Episode episode = (Episode)episodeList.get(i);
			EpisodeTreeNode episodeNode = new EpisodeTreeNode(episode.getName());
			episodeNode.setKey(episode.key);
			
			for(int j = 0; j < episode.getList().size();j++){
				Scene scene = (Scene)episode.getList().get(j);
				EpisodeTreeNode sceneNode = new EpisodeTreeNode(scene.getIndex());
				sceneNode.setKey(scene.key);
				
				for(int k = 0; k < scene.getList().size();k++){
					Row row = (Row)scene.getList().get(k);
					EpisodeTreeNode rowNode = new EpisodeTreeNode(row.getIndex());
					rowNode.setKey(row.key);
					
					for(int l = 0; l < row.getList().size();l++){
						Sentence sentence = (Sentence)row.getList().get(l);
						EpisodeTreeNode sentenceNode = new EpisodeTreeNode(sentence.getIndex());
						sentenceNode.setKey(sentence.key);
						rowNode.add(sentenceNode);
					}
					sceneNode.add(rowNode);
				}
				episodeNode.add(sceneNode);
			}
			mainNode.add(episodeNode);
		}
		
		tree = new JTree(mainNode);
		
		return tree;
	}
}
