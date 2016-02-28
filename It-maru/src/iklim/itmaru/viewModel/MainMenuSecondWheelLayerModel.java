package iklim.itmaru.viewModel;

import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.HashMap;

import iklim.engine.uidata.AbstractViewModel;

public class MainMenuSecondWheelLayerModel implements AbstractViewModel{

	private ArrayList<String> saveFileList;

	public ArrayList<String> getSaveFileList() {
		return saveFileList;
	}

	public void addSaveFile(String saveFileList) {
		this.saveFileList.add(saveFileList);
	}
	
	
}
