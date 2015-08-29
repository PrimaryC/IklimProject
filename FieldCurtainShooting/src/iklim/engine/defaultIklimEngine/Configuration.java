package iklim.engine.defaultIklimEngine;

import java.io.File;

public class Configuration {
	private static final String				configFileName =		"./IklimConfig.cfg";
	static{
		System.setProperty("j3d.transparentOffScreen", "true");
		File f = new File(configFileName);
	}
	
	public static final String				ResourceDirectory = 	"./resource/";
	
	public static class ViewConfig{
		public static int					FrameWidth = 			1280;
		public static int					FrameHeight = 			800;
	}
}
