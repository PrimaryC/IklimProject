package userinterface.layer;

import java.awt.Graphics;

import javax.swing.JComponent;
import javax.swing.JPanel;

import ViewModel.AbstractViewModel;
import ViewModel.ViewModelManager;

public abstract class AbstractLayer extends JPanel{
	
	
	public abstract void setModel(ViewModelManager model);
	
}
