package iklim.engine;

import iklim.engine.asset.AssetManager;
import iklim.engine.configuration.Configuration;

import java.util.HashMap;

import iklim.engine.gameInterface.IklimGameViewer;
import iklim.engine.uidata.IklimGameViewerDataManager;

public class IklimGameEngine {
	private AssetManager asset;
	private IklimGameViewer view;
	private IklimGameViewerDataManager viewModel;
	private Configuration config;

	public IklimGameEngine(Configuration cfg) {
		this.config = cfg;
		asset = new AssetManager();
		viewModel = new IklimGameViewerDataManager();
		view = new IklimGameViewer(viewModel);

		init();
	}

	public void init() {
		asset.load();
		viewModel.init();
		view.init();
	}

	
}
