package iklim;

import java.util.HashMap;

import iklim.engine.Configuration;
import iklim.engine.IklimGameEngine;

public class Core {
	private IklimGameEngine engine;
	public Core() {
		HashMap<String, String> cfgMap = new HashMap<String, String>();
		cfgMap.put(Configuration.Assets+".test", "test.png");
		engine = new IklimGameEngine(cfgMap);
		engine.init();
	}
	
	
	
	public static void main(String[] args) {
		new Core();
	}
}
