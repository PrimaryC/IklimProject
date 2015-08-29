package Core;

import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;
import javax.swing.plaf.nimbus.NimbusLookAndFeel;

import ViewModel.ViewModelManager;
import view.ViewManager;
import controller.ControlManager;
import model.ModelManager;


public class Starter {
	private ViewManager viewManager;
	private ModelManager modelManager;
	private ControlManager controlManager;
	private ViewModelManager viewModelManager;
	
	public static void main(String ar[]){
		try {
			UIManager.setLookAndFeel(new NimbusLookAndFeel());
		} catch (UnsupportedLookAndFeelException e) {
			e.printStackTrace();
		}
		Starter starter = new Starter();
	}
	
	public Starter(){
		modelManager = new ModelManager();
		viewModelManager = new ViewModelManager();
		viewManager = new ViewManager(viewModelManager);
		controlManager = new ControlManager(viewManager, modelManager,viewModelManager);
	}
}
