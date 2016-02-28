package iklim.itmaru.control;

import javax.swing.JFrame;

import iklim.itmaru.control.listener.EventListener;

public class Tester extends JFrame{
	public Tester(){
		this.setSize(500, 500);
		this.setVisible(true);
	}
	
	public void addListener(EventListener listener){
		this.addKeyListener(listener.getKeyboardListener());
	}
	
	
}	
