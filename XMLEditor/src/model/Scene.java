package model;



import static staticContext.UtilityContext.*;

import modelAbstract.AbstractDataKey;
import modelAbstract.ListedAbstractData;

public class Scene extends ListedAbstractData{

	private int index; 

	
	public Scene(int id,AbstractDataKey episodeKey){
		super(new AbstractDataKey(SceneID,id));

		this.parent = episodeKey;
	}
	


	public int getIndex() {
		return index;
	}



	public void setIndex(int index) {
		this.index = index;
	}


}
