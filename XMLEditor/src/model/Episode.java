package model;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.UUID;

import javax.swing.tree.TreeNode;

import modelAbstract.AbstractData;
import modelAbstract.AbstractDataKey;
import modelAbstract.ListedAbstractData;

public class Episode extends ListedAbstractData{

	private String name;
	private int index;
	private String writer;
	private String date;
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public Episode(int id){
		super(new AbstractDataKey("EpisodeType",id));
	}
	
	
	public int getIndex() {
		return index;
	}
	
	public void setIndex(int index) {
		this.index = index;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}
