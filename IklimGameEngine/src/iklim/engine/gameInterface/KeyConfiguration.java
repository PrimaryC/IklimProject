package iklim.engine.gameInterface;

import java.awt.event.KeyEvent;
import java.util.LinkedList;

public class KeyConfiguration {
	private static final LinkedList<Object[]>				keyMap;
	static{
		keyMap = new LinkedList<Object[]>();
		loadConfig();
	}
	

	private static void loadConfig() {
		keyMap.add(new Object[]{ "A", KeyEvent.VK_Z});
		keyMap.add(new Object[]{ "B", KeyEvent.VK_X});
		keyMap.add(new Object[]{ "C", KeyEvent.VK_A});
		keyMap.add(new Object[]{ "D", KeyEvent.VK_S});
		keyMap.add(new Object[]{ "Up", KeyEvent.VK_UP});
		keyMap.add(new Object[]{ "Down", KeyEvent.VK_DOWN});
		keyMap.add(new Object[]{ "Left", KeyEvent.VK_LEFT});
		keyMap.add(new Object[]{ "Right", KeyEvent.VK_RIGHT});
	}
	
	public static String getPressedKeyByValue(int keyValue){
		for (Object[] objects : keyMap) {
			if(objects[1].equals(new Integer(keyValue))){
				return (String)objects[0];
			}
		}
		return null;
	}
}
