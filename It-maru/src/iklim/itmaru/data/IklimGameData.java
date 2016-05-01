package iklim.itmaru.data;

import java.awt.Point;
import java.util.ArrayList;

import iklim.itmaru.view.scene.mainmenuscene.layer.Location;

public class IklimGameData {
	private Location playerLocation;

	private ArrayList<ArrayList<Tile>> currentMap;
	private ArrayList<RoundThing> characterList;
	private ArrayList<RoundThing> wallList;
	private ArrayList<Line> lineList;
	private ArrayList<Square> squareList;
	
	public IklimGameData(){
		playerLocation = new Location(0,0);
		lineList = new ArrayList<Line>();
		characterList = new ArrayList<RoundThing>();
		wallList = new ArrayList<RoundThing>();
		squareList = new ArrayList<Square>();
	}
	public void init() {
		// TODO Auto-generated method stub
		
	}
	
	
	public ArrayList<Square> getSquareList() {
		return squareList;
	}
	public void addSquare(Square square) {
		this.squareList.add(square);
	}
	public ArrayList<Line> getLineList() {
		return lineList;
	}
	public void addLine(Line line) {
		this.lineList.add(line);
	}
	public ArrayList<RoundThing> getCharacterList() {
		return characterList;
	}
	public void addCharacter(RoundThing character) {
		this.characterList.add(character);
	}
	public ArrayList<RoundThing> getWallList() {
		return wallList;
	}
	public void addWall(RoundThing wall) {
		this.wallList.add(wall);
	}
	public Location getPlayerLocation() {
		return playerLocation;
	}
	public void setPlayerLocation(Location playerLocation) {
		this.playerLocation = playerLocation;
	}
	
	public ArrayList<ArrayList<Tile>> getCurrentMap() {
		return currentMap;
	}
	public void setCurrentMap(ArrayList<ArrayList<Tile>> currentMap) {
		this.currentMap = currentMap;
	}
	public void setLineList(ArrayList<Line> lineList) {
		this.lineList = lineList;
	}
	
	
	
	
}
