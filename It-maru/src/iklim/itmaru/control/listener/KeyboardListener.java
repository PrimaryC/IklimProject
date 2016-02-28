package iklim.itmaru.control.listener;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class KeyboardListener implements KeyListener {

	@Override
	public void keyPressed(KeyEvent arg0) {
		int input = arg0.getKeyCode();
		
		if(input == KeyEvent.VK_RIGHT){
			System.out.println("right");
		}else if(input == KeyEvent.VK_LEFT){
			System.out.println("l");
		}else if(input == KeyEvent.VK_UP){
			System.out.println("u");
		}else if(input == KeyEvent.VK_DOWN){
			System.out.println("d");
		}
		
	}
	
	@Override
	public void keyReleased(KeyEvent arg0) {
		// TODO Auto-generated method stub
	}

	@Override
	public void keyTyped(KeyEvent arg0) {
		// TODO Auto-generated method stub
	}
	
	
}
