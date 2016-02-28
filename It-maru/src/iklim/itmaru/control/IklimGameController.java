package iklim.itmaru.control;

import iklim.itmaru.control.listener.EventListener;

public class IklimGameController {
	private Tester test;
	private EventListener eventListener;
	private String currentSceneName;
	
	public static void main(String[] ar){
		new IklimGameController();
	}
	
	public IklimGameController(){
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
