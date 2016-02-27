package control;

import java.awt.event.MouseListener;

public class EventListener {
	private EventHandler handler;
	private MouseListener mouseListener;
	private ButtonListener btnListener;
	
	public EventListener(EventHandler handler) {
		this.handler = handler;
	}
	
	
}
