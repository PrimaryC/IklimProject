package iklim.engine.asset;

import java.awt.image.BufferedImage;
import java.util.HashMap;

public class ImageMap extends HashMap<String, BufferedImage>{
	private static ImageMap 					myInstance;
	
	private ImageMap(){}
	public static ImageMap getInstance(){
		return myInstance;
	}
	
	static void newIntance(){
		myInstance = new ImageMap();
	}
}
