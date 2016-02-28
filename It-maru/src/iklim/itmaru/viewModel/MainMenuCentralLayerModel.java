package iklim.itmaru.viewModel;

import java.awt.image.BufferedImage;
import java.util.HashMap;

import iklim.engine.uidata.AbstractViewModel;

public class MainMenuCentralLayerModel implements AbstractViewModel{
	private String currentWheel;
	
	public static final String START_GAME = "START_GAME";
	public static final String LOAD_GAME = "LOAD_GAME";
	public static final String CONFIGURATION = "CONFIGURATION";
	public static final String END_GAME = "END_GAME";
	
	public MainMenuCentralLayerModel(){
		this.currentWheel = START_GAME;
	}

	public String getCurrentWheel() {
		return currentWheel;
	}

	public void setCurrentWheel(String currentWheel) {
		this.currentWheel = currentWheel;
	}
	
}
