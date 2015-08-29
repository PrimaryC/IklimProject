package view;

import java.awt.GridBagConstraints;
import java.awt.GridLayout;

import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JTextField;

public class TextSetPanel extends WrapPanel{
	private JButton boldButton;
	private JButton underbarButton;
	private JButton strikeOutButton;
	private JButton italicButton;
	private JTextField sizeTextField;
	
	public TextSetPanel(){
		super(0);
		boldButton = new JButton();
		underbarButton = new JButton();
		strikeOutButton = new JButton();
		italicButton = new JButton();
		sizeTextField = new JTextField();
	}
	
	public void init(){
		this.setLayout(new GridLayout(7,1));
		
		
		this.add(boldButton);
		this.add(underbarButton);
		this.add(strikeOutButton);
		this.add(italicButton);
		this.add(sizeTextField);
	}
}
