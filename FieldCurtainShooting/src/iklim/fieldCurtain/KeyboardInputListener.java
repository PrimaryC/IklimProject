package iklim.fieldCurtain;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class KeyboardInputListener implements KeyListener{
	private FieldCurtainCore					core;

	public KeyboardInputListener(FieldCurtainCore fieldCurtainCore) {
		this.core = fieldCurtainCore;
	}

	@Override
	public void keyPressed(KeyEvent e) {
		if(e.getKeyCode()==KeyEvent.VK_Z){
			core.aKeyPressed();
		}
		
	}

	@Override
	public void keyReleased(KeyEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void keyTyped(KeyEvent e) {
		// TODO Auto-generated method stub
		
	}

}
