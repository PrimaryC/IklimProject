package iklim.engine.asset;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.media.CannotRealizeException;
import javax.media.Manager;
import javax.media.NoPlayerException;
import javax.media.Player;

import iklim.engine.configuration.Configuration;
import iklim.engine.configuration.ImageIDMap;

public class AssetManager {
	
	public AssetManager() {
		ImageMap.newIntance();
	}
	
	public void load(){
		ImageIDMap imgMap = Configuration.getInstance().getImageIDMap();
		File file = new File("./asset/");
		for (File asset : file.listFiles()) {
			try {
				String imgName = asset.getCanonicalFile().getName();
				if(imgMap.containsKey(imgName)){
					BufferedImage bi = ImageIO.read(asset);
					String assetID = imgMap.get(imgName);
					ImageMap.getInstance().put(assetID, bi);
				}
				if(asset.getCanonicalFile().getName().equals("Alarm01.wav")){
					Player p = Manager.createRealizedPlayer(asset.toURI().toURL());
					p.start();
				}
			
			} catch (IOException e) {
				e.printStackTrace();
			} catch (NoPlayerException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (CannotRealizeException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		
		
	}

	
	
	
}
