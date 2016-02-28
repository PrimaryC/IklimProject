package iklim.itmaru.control.listener;

public class EventListener {
	private KeyboardListener keyboard;
	public EventListener(){
		keyboard = new KeyboardListener();
	}
	public KeyboardListener getKeyboardListener() {
		return keyboard;
	}
	
	
}
