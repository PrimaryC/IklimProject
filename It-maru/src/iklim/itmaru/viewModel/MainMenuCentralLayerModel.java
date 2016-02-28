package iklim.itmaru.viewModel;

import iklim.engine.uidata.AbstractGameViewerModel;

public class MainMenuCentralLayerModel implements AbstractGameViewerModel{
	private SelectionList currentWheel;
	
	public enum SelectionList {START_GAME,LOAD_GAME,CONFIGURATION,END_GAME};
	
	public MainMenuCentralLayerModel(){
		this.currentWheel = SelectionList.START_GAME;
	}

	public String getCurrentWheel() {
		return currentWheel.name();
	}

	public void setCurrentWheel(SelectionList wheel) {
		this.currentWheel = wheel;
	}
	
}
