package iklim.itmaru.view.scene.mainmenuscene.viewmodel;

import iklim.engine.uidata.AbstractGameViewerModel;
import iklim.itmaru.viewModel.AbstractViewDataModel;

public class MainMenuCentralLayerModel implements AbstractGameViewerModel {
	private int currentWheel;
	
	public enum SelectionList {START_GAME,LOAD_GAME,CONFIGURATION,END_GAME};
	
	public MainMenuCentralLayerModel(){
		this.currentWheel = 0;
	}
	
	public int getCurrentWheel() {
		return currentWheel;
	}
	
	public void setCurrentWheel(SelectionList wheel) {
		this.currentWheel = wheel.ordinal();
	}

	public void addCurrentWheelIndex(){
		if(currentWheel < 0){
			currentWheel++;
		}
	}
	
	public void minusCurrentWheelIndex(){
		if(currentWheel > -3){
			currentWheel--;
		}
	}


	
}
