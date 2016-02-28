package iklim.itmaru.viewModel;

import java.util.HashMap;

import iklim.engine.uidata.AbstractGameViewerModel;

public class IklimGameViewDataManager {
	private HashMap<String,AbstractGameViewerModel> viewModelMap;

	public HashMap<String, AbstractGameViewerModel> getViewModelMap() {
		return viewModelMap;
	}

	public void addViewModel(String key, AbstractGameViewerModel viewModel) {
		this.viewModelMap.put(key, viewModel);
	}
	
	
}
