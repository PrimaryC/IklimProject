package model;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.UUID;

import modelAbstract.AbstractData;
import modelAbstract.AbstractDataKey;
import modelAbstract.ListedAbstractData;
import static staticContext.UtilityContext.*;
public class Sentence extends ListedAbstractData{


	private String text;
	private int index;

	private int textSize;
	private boolean isStrike;
	private boolean isUnderbar;
	private boolean isItalic;
	
	public Sentence(int id, AbstractDataKey rowKey){
		super(new AbstractDataKey(SentenceID, id));
	
		this.parent = rowKey;
		isStrike = false;
		isUnderbar = false;
		isItalic = false;
		textSize = 10;
	}
	
	
	
	public boolean isStrike() {
		return isStrike;
	}



	public void setStrike(boolean isStrike) {
		this.isStrike = isStrike;
	}



	public boolean isUnderbar() {
		return isUnderbar;
	}



	public void setUnderbar(boolean isUnderbar) {
		this.isUnderbar = isUnderbar;
	}



	public boolean isItalic() {
		return isItalic;
	}



	public void setItalic(boolean isItalic) {
		this.isItalic = isItalic;
	}



	public int getTextSize() {
		return textSize;
	}



	public void setTextSize(int textSize) {
		this.textSize = textSize;
	}






	public int getIndex() {
		return index;
	}



	public void setIndex(int index) {
		this.index = index;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	
	

}
