package iklim.itmaru.view.scene.mainmenuscene;

import java.util.HashMap;
import java.util.LinkedList;

import iklim.engine.gameInterface.IklimGameScene;
import iklim.engine.uidata.AbstractGameViewerModel;
import iklim.engine.uidata.IklimGameViewerDataManager;
import iklim.itmaru.data.IklimGameData;
import iklim.itmaru.utility.ViewModelContext;
import iklim.itmaru.view.scene.mainmenuscene.layer.MainMenuBackgroundLayer;
import iklim.itmaru.view.scene.mainmenuscene.layer.MainMenuCentralLayer;
import iklim.itmaru.view.scene.mainmenuscene.viewmodel.*;
import iklim.itmaru.viewModel.*;

public class MainMenuScene extends IklimGameScene {

	private IklimGameData dataManager;
	private String currentData;
	
	private MainMenuBackgroundLayer backgroundLayer;
	private MainMenuCentralLayer centralLayer;
	
	private MainMenuBackgroundLayerModel backgroundModel;
	private MainMenuCentralLayerModel centralModel;
	private MainMenuSecondWheelLayerModel secondWheelModel;

	public MainMenuScene(String name, IklimGameData dataManager) {

		super(name);
		centralModel =  new MainMenuCentralLayerModel();
		backgroundModel =  new MainMenuBackgroundLayerModel();
		secondWheelModel =  new MainMenuSecondWheelLayerModel();

		this.dataManager = dataManager;
		currentData = ViewModelContext.MainMenuCentralLayerModel;
		
		
		

		this.addLayer(new MainMenuBackgroundLayer());
		this.addLayer(new MainMenuCentralLayer());

		
		((MainMenuCentralLayer) this.getLayer(1)).setModel(centralModel);
		((MainMenuBackgroundLayer) this.getLayer(0)).setModel(backgroundModel);
		
		
		
		
	}

	@Override
	public void keyPressed(String key) {
		if (currentData.equals(ViewModelContext.MainMenuCentralLayerModel)) {
	
			MainMenuCentralLayer layer = ((MainMenuCentralLayer) this.getLayer(1));
			if (key.equals("Up")) {
				centralModel.minusCurrentWheelIndex();
				layer.wheelChanged(centralModel.getCurrentWheel());
			} else if (key.equals("Down")) {
				centralModel.addCurrentWheelIndex();
				layer.wheelChanged(centralModel.getCurrentWheel());
			} else if (key.equals("Left")) {
			
			} else if (key.equals("Right")) {
				if(centralModel.getCurrentWheel() == 0)
					this.setOver(true);
			}
		}
	}

	@Override
	public void setViewModel(IklimGameViewerDataManager viewModel) {
		// TODO Auto-generated method stub

	}

}
