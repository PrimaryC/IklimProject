package iklim.itmaru.control;

import iklim.itmaru.control.listener.EventListener;

public class ControlManager {
	private Tester test;
	private EventListener eventListener;
	private String currentSceneName;
	
	public static void main(String[] ar){
		new ControlManager();
	}
	
	public ControlManager(){
		test  = new Tester();
		eventListener = new EventListener();
		init();
	}
	
	public void init(){
		test.addListener(eventListener);
		run();
	}
	
	public void run(){
		
	}
	
	
}
