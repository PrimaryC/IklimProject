package userinterface.scene;

import javax.swing.JComponent;
import javax.swing.JLabel;

import control.EventListener;
import ViewModel.AbstractViewModel;
import ViewModel.ViewModelManager;



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
