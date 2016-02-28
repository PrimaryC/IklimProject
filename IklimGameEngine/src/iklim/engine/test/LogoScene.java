package iklim.engine.test;



import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;

import iklim.engine.gameInterface.AbstractLayer;
import iklim.engine.gameInterface.Scene;
import iklim.engine.uicontrol.EventListener;
import iklim.engine.uicontrol.SceneContext;
import iklim.engine.uidata.AbstractViewModel;
import iklim.engine.uidata.ViewModelManager;



public class LogoScene extends Scene{
	
	
	public LogoScene(EventListener listener) {
		super(listener);
		
		this.setLayout(null);
		TitleLayer layer = new TitleLayer();
		layer.setBounds(SceneContext.FRAME_WIDTH/ 2 - 100, SceneContext.FRAME_HEIGHT / 2 - 100,200,200);
		
		this.addLayer(SceneContext.TitleLayer,layer);
		this.add(layer);
		
		
		
		init();
	}
	
	public void init(){
		
	}
	
	
	
	@Override
	public void setViewModel(ViewModelManager viewModel) {
		this.getLayer(0).setModel(viewModel);
	}


}
