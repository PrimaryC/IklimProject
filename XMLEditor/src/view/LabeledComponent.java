package view;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.JTextField;

public class LabeledComponent{
	private JComponent component;
	private JLabel label;


	public LabeledComponent(){
		this.label = new JLabel();
		this.component = new JTextField();
	}
	
	public LabeledComponent(JComponent component){
		this.label = new JLabel();
		this.component = component;

	}
	
	public LabeledComponent(String text){
		this.label = new JLabel(text);
		this.component = new JTextField();

	}
	
	public LabeledComponent(JComponent component, String text){
		this.label = new JLabel(text);
		this.component = component;

	}
	
	
	public String getComponentText(){
		if(component instanceof JTextField){
			return ((JTextField) component).getText();
		}else if(component instanceof JButton){
			return ((JButton) component).getText();
		}else
			return "";
	}
	public void setComponentText(String text){
		if(component instanceof JTextField){
			((JTextArea) component).setText(text);
		}else if(component instanceof JButton){
			((JButton) component).setText(text);
		}
	}
	
	public void setLabelText(String text){
		label.setText(text);
	}

	public JComponent getComponent() {
		return component;
	}

	public JLabel getLabel() {
		return label;
	}

	public int getComponentType() {
		if(component instanceof JTextField)
			return 0;
		else if(component instanceof JButton)
			return 1;
		else if(component instanceof JLabel)
			return 2;
		else
			return -1;
	}
	
	
}
