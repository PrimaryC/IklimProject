package iklim.engine.asset;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.media.CannotRealizeException;
import javax.media.Manager;
import javax.media.NoPlayerException;
import javax.media.Player;

public class AssetManager {
	private ImageMap 			imageMap;
	
	public AssetManager() {
		imageMap = new ImageMap();
	}
	
	public void load(Map<String, String> assetIDMap){
		File file = new File("./asset/");
		for (File asset : file.listFiles()) {
			try {
				String imgName = asset.getCanonicalFile().getName();
				if(assetIDMap.containsKey(imgName)){
					BufferedImage bi = ImageIO.read(asset);
					String assetID = assetIDMap.get(imgName);
					imageMap.put(assetID, bi);
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
