package model;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.LinkedList;
import java.util.UUID;

import javax.swing.tree.DefaultMutableTreeNode;

import Factory.ModelFactory;
import modelAbstract.AbstractData;
import modelAbstract.AbstractDataKey;
import modelAbstract.ListedAbstractData;
import static staticContext.UtilityContext.*;

public class ModelManager {

	private HashMap<Integer, LinkedList<AbstractData>> individualListMap;
	private HashMap<AbstractDataKey, AbstractData> fullMap;
	private ModelFactory factory;

	public ModelManager() {
		individualListMap = new HashMap<Integer, LinkedList<AbstractData>>();
		individualListMap.put(EpisodeID, new LinkedList<AbstractData>());
		individualListMap.put(SceneID, new LinkedList<AbstractData>());
		individualListMap.put(RowID, new LinkedList<AbstractData>());
		individualListMap.put(SentenceID, new LinkedList<AbstractData>());
		individualListMap.put(GraphicResourceID,
				new LinkedList<AbstractData>());
		individualListMap
				.put(SoundResourceID, new LinkedList<AbstractData>());
		individualListMap.put(EffectID, new LinkedList<AbstractData>());
		individualListMap.put(StandingCGID, new LinkedList<AbstractData>());
		fullMap = new HashMap<AbstractDataKey, AbstractData>();
		factory = ModelFactory.getInstance();
	}
	/*
	 * public void removeResource // 없앨 때 꼭 index 정렬할것
	 */
	public void addResource(AbstractData data, AbstractDataKey sourceKey) {

		if (data instanceof Episode) {
			individualListMap.get(EpisodeID).addLast(data);
		} else if (data instanceof Scene) {
			Episode tempEpisode = (Episode) fullMap.get(sourceKey);
			data.setIndex(tempEpisode.getList().size()+1);
			individualListMap.get(SceneID).addLast(data);
			tempEpisode.getList().add((Scene) data);

		} else if (data instanceof Row) {
			Scene tempScene = (Scene) fullMap.get(sourceKey);
			data.setIndex(tempScene.getList().size() + 1);
			individualListMap.get(RowID).addLast(data);
			tempScene.getList().add((Row) data);
			System.out.println("fuck");
		} else if (data instanceof Sentence) {
			Row tempRow = (Row) fullMap.get(sourceKey);
			data.setIndex(tempRow.getList().size() + 1);
			individualListMap.get(SentenceID).addLast(data);
			tempRow.getList().add((Sentence) data);
		} else if (data instanceof StandingCG) {
			Sentence tempSentence = (Sentence) fullMap.get(sourceKey);
			data.setIndex(tempSentence.getList().size() + 1);
			individualListMap.get(StandingCGID).addLast(data);
			tempSentence.getList().add((StandingCG) data);
		} else if (data instanceof GraphicResource) {
			individualListMap.get(GraphicResourceID).addLast(data);
		} else if (data instanceof SoundResource) {
			individualListMap.get(SoundResourceID).addLast(data);
		} else if (data instanceof Effect) {
			individualListMap.get(EffectID).addLast(data);
		} else {
			return;
		}

		fullMap.put(data.getKey(), data);
	}


	public void addResource(AbstractData data) {
		if (data instanceof Episode) {
			individualListMap.get(EpisodeID).addLast(data);
		} else if (data instanceof GraphicResource) {
			individualListMap.get(GraphicResourceID).addLast(data);
		} else if (data instanceof SoundResource) {
			individualListMap.get(SoundResourceID).addLast(data);
		} else if (data instanceof Effect) {
			individualListMap.get(EffectID).addLast(data);
		} else {
			return;
		}
		fullMap.put(data.getKey(), data);
	}
	
	public void removeResource(AbstractDataKey key){
		AbstractData data = fullMap.get(key);
		
		
		if(data.isParent()){
			ListedAbstractData parent = (ListedAbstractData)fullMap.get(data.getParent());
			parent.remove(key);
			System.out.println("fucked");
		}
		
		individualListMap.get(key.id).remove(data);
		fullMap.remove(key);
	}
	
	public LinkedList<AbstractData> getIndividualList(int type){
		return individualListMap.get(type);
	}
	
	public AbstractData getResourceByKey(AbstractDataKey key) {
		return fullMap.get(key);
	}

}
