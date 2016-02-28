package iklim.itmaru.viewModel;

import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.HashMap;

public class MainMenuSecondWheelLayerModel {

	private ArrayList<String> saveFileList;

	public ArrayList<String> getSaveFileList() {
		return saveFileList;
	}

	public void addSaveFile(String saveFileList) {
		this.saveFileList.add(saveFileList);
	}
	
	
}
