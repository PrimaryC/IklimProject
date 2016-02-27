package iklim.engine.gameInterface.layer;

import java.awt.Graphics;

import javax.swing.JComponent;
import javax.swing.JPanel;

import iklim.engine.uidata.AbstractViewModel;
import iklim.engine.uidata.ViewModelManager;

public abstract class AbstractLayer extends JPanel{
	
	
	public abstract void setModel(ViewModelManager model);
	
}
