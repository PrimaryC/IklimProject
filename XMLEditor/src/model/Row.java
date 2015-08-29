package model;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.UUID;

import Factory.ModelFactory;
import staticContext.UtilityContext;
import modelAbstract.AbstractData;
import modelAbstract.AbstractDataKey;
import modelAbstract.ListedAbstractData;
import static staticContext.UtilityContext.*;

public class Row extends ListedAbstractData{

	private int index;

	private ModelFactory factory;
	
	public Row(int id,AbstractDataKey sceneKey){
		super(new AbstractDataKey(RowID,id));

		factory = ModelFactory.getInstance();
		this.parent = sceneKey;
	}
	
	public Row(int id){
		super(new AbstractDataKey("Row",id));

	}

	
	public void applyTextSize(int startIndex,String text, int textSize){
		int size = 0;
		
		
		Sentence tempSentence = (Sentence)list.get(0);
		
		
		int sentenceLocation;
		
		for(sentenceLocation = 0;size + tempSentence.getText().length() < startIndex + 1;sentenceLocation++){
			tempSentence = (Sentence)list.get(sentenceLocation);
			size += tempSentence.getText().length();
		}
		startIndex -= size;
		
		if(tempSentence.getText().equals(text)){
			tempSentence.setTextSize(textSize);
			return;
		}
		
		if(startIndex + text.length() < tempSentence.getText().length()){
			if(text.startsWith(tempSentence.getText())){
				tempSentence.setText(tempSentence.getText().substring(text.length()));
				
				
				Sentence newSentence = factory.makeSentence(key);
				newSentence.setText(text);
				newSentence.setTextSize(textSize);
				list.add(sentenceLocation, newSentence);
				resetSentenceIndex();
				map.put(newSentence.key, newSentence);
			}else{
				
				Sentence newSentence1 = factory.makeSentence(key);
				Sentence newSentence2 = factory.makeSentence(key);
				
				newSentence1.setText(tempSentence.getText().substring(0, startIndex));
				newSentence2.setText(tempSentence.getText().substring(startIndex + text.length()));
				list.add(sentenceLocation, newSentence1);
				list.add(sentenceLocation + 2,newSentence2);
				resetSentenceIndex();
				map.put(newSentence1.key, newSentence1);
				map.put(newSentence2.key, newSentence2);
				
				return;
			}

			Sentence newSentence = factory.makeSentence(key);
			
			newSentence.setText(tempSentence.getText().substring(startIndex, tempSentence.getText().length()));
			newSentence.setTextSize(textSize);
			tempSentence.setText(tempSentence.getText().substring(0, startIndex));
			list.add(sentenceLocation, newSentence);
			resetSentenceIndex();
			map.put(newSentence.key, newSentence);
			
			for(int i = sentenceLocation;text.length() < 1 ;i++){
				tempSentence = (Sentence)list.get(i);
		
				
				if(tempSentence.getText().length() < text.length()){
					newSentence = factory.makeSentence(key);
					tempSentence.setText(tempSentence.getText().substring(text.length()));
					newSentence.setText(text);
					newSentence.setTextSize(textSize);
					
					list.add(i,newSentence);
					resetSentenceIndex();
					map.put(newSentence.key, newSentence);
					return;
				}
				
				tempSentence.setTextSize(textSize);
			}
		}
		
		
	}
	
	public void resetSentenceIndex(){
		for(int i = 0; i < list.size();i++)
			list.get(i).setIndex(i);
	}
	

	public int getIndex() {
		return index;
	}



	public void setIndex(int index) {
		this.index = index;
	}


	public void split(){
		
	}
}
