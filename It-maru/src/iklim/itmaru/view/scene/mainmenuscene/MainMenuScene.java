package iklim.itmaru.view.scene.mainmenuscene;

import java.util.HashMap;
import java.util.LinkedList;

import iklim.engine.gameInterface.IklimGameScene;
import iklim.engine.uidata.AbstractGameViewerModel;
import iklim.engine.uidata.IklimGameViewerDataManager;
import iklim.itmaru.utility.ViewModelContext;
import iklim.itmaru.view.scene.mainmenuscene.layer.MainMenuBackgroundLayer;
import iklim.itmaru.view.scene.mainmenuscene.layer.MainMenuCentralLayer;
import iklim.itmaru.view.scene.mainmenuscene.viewmodel.*;
import iklim.itmaru.viewModel.*;

public class MainMenuScene extends IklimGameScene {

	private IklimGameViewDataManager dataManager;
	private String currentData;
	private HashMap<String, AbstractGameViewerModel> viewModelMap;

	public MainMenuScene(String name, IklimGameViewDataManager dataManager) {

		super(name);
		viewModelMap = new HashMap<String, AbstractGameViewerModel>();
		viewModelMap.put(ViewModelContext.MainMenuCentralLayerModel, new MainMenuCentralLayerModel());
		viewModelMap.put(ViewModelContext.MainMenuBackgroundLayerModel, new MainMenuBackgroundLayerModel());
		viewModelMap.put(ViewModelContext.MainMenuSecondWheelLayerModel, new MainMenuSecondWheelLayerModel());

		this.dataManager = dataManager;
		currentData = ViewModelContext.MainMenuCentralLayerModel;
		
		
		

		this.addLayer(new MainMenuBackgroundLayer());
		this.addLayer(new MainMenuCentralLayer());

		
		((MainMenuCentralLayer) this.getLayer(1)).setModel(viewModelMap.get(ViewModelContext.MainMenuCentralLayerModel));
		((MainMenuBackgroundLayer) this.getLayer(0)).setModel(viewModelMap.get(ViewModelContext.MainMenuBackgroundLayerModel));
		
		
		
		
	}

	@Override
	public void keyPressed(String key) {
		System.out.println("keyPressed" + key);
		if (currentData.equals(ViewModelContext.MainMenuCentralLayerModel)) {
			MainMenuCentralLayerModel tempModel = (MainMenuCentralLayerModel)viewModelMap.get(ViewModelContext.MainMenuCentralLayerModel);
			MainMenuCentralLayer layer = ((MainMenuCentralLayer) this.getLayer(1));
			if (key.equals("Up")) {
				tempModel.minusCurrentWheelIndex();
				layer.wheelChanged(tempModel.getCurrentWheel());
			} else if (key.equals("Down")) {
				tempModel.addCurrentWheelIndex();
				layer.wheelChanged(tempModel.getCurrentWheel());
			} else if (key.equals("Left")) {
			//	currentData.inputCommand("Left");
			} else if (key.equals("Right")) {
				//currentData.inputCommand("Right");
			}
		}
	}

	@Override
	public void setViewModel(IklimGameViewerDataManager viewModel) {
		// TODO Auto-generated method stub

	}

}
