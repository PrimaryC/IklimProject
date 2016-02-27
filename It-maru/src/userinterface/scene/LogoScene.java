package userinterface.scene;



import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;

import userinterface.layer.AbstractLayer;
import userinterface.layer.TitleLayer;
import control.EventListener;
import control.SceneContext;
import ViewModel.AbstractViewModel;
import ViewModel.ViewModelManager;



public class LogoScene extends Scene{
	
	
	public LogoScene(EventListener listener) {
		super(listener);
		
		this.setLayout(null);
		TitleLayer layer = new TitleLayer();
		System.out.println(this.WIDTH);
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
