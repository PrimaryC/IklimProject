package iklim.engine.gameInterface.scene;

import javax.swing.JComponent;
import javax.swing.JLabel;

import iklim.engine.uicontrol.EventListener;
import iklim.engine.uidata.AbstractViewModel;
import iklim.engine.uidata.ViewModelManager;



public class MainTitleScene extends Scene {
	private JLabel logo;
	
	public MainTitleScene(EventListener btListener) {
		super(btListener);
		// TODO Auto-generated constructor stub
		logo = new JLabel();
		init();
		
	}
	
	public void init(){
		
	}

	@Override
	public void setViewModel(ViewModelManager viewModel) {
		// TODO Auto-generated method stub
		
	}
	

}
