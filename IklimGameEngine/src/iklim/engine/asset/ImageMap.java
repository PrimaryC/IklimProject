package iklim.engine.asset;

import java.awt.image.BufferedImage;
import java.util.HashMap;

public class ImageMap extends HashMap<String, BufferedImage>{
	private static final long serialVersionUID = 6834609716112661915L;
	private static ImageMap 					myInstance;
	
	private ImageMap(){}
	public static ImageMap getInstance(){
		return myInstance;
	}
	
	static void newIntance(){
		myInstance = new ImageMap();
	}
}
