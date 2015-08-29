package view;

import modelAbstract.*;

import javax.swing.JPanel;
import javax.swing.JTextField;

public class StatusPanel extends JPanel{

	AbstractDataKey currentStandingCGKey;
	JTextField standingCGSizeTextField;
	JTextField standingCGBlurTextField;
	JTextField standingCGXCoordinateTextField;
	JTextField standingCGYCoordinateTextField;
	JTextField textField;
	
	public StatusPanel(){
		standingCGSizeTextField = new JTextField();
		standingCGBlurTextField = new JTextField();
		standingCGXCoordinateTextField = new JTextField();
		standingCGYCoordinateTextField = new JTextField();
		textField = new JTextField();
	}
	
	public AbstractDataKey getSelectedStandingCGKey() {
		return currentStandingCGKey;
	}

	public int getStandingCGSizeInputValue() {
		String temp = standingCGSizeTextField.getText();
		return Integer.parseInt(temp);
	}

	public int getStandingCGBlurInputValue() {
		String temp = standingCGBlurTextField.getText();
		return Integer.parseInt(temp);
	}

	public int getStandingCGXInputValue() {
		String temp = standingCGXCoordinateTextField.getText();
		return Integer.parseInt(temp);
	}

	public int getStandingCGYInputValue() {
		String temp = standingCGYCoordinateTextField.getText();
		return Integer.parseInt(temp);
	}

	public String getText() {
		return textField.getText();
	}
	
	public String getSelectedText(){
		return textField.getSelectedText();
	}
	
}
