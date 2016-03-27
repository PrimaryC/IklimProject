package iklim.itmaru.view.scene.mainmenuscene.viewmodel;

import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.HashMap;

import iklim.engine.uidata.AbstractGameViewerModel;
import iklim.itmaru.viewModel.AbstractViewDataModel;

public class MainMenuSecondWheelLayerModel extends AbstractViewDataModel {

	private ArrayList<String> saveFileList;

	public ArrayList<String> getSaveFileList() {
		return saveFileList;
	}

	public void addSaveFile(String saveFileList) {
		this.saveFileList.add(saveFileList);
	}


	@Override
	public void inputCommand(String input) {
		// TODO Auto-generated method stub
		
	}
	
	
}
