package iklim.engine;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Set;

public class Configuration {
	public static final String Assets = "assets";
	
	private final HashMap<String, String> config;
	public Configuration(HashMap<String, String> cm) {
		boolean assetKeyConfirmed = false;
		
		Set<String> keySet = cm.keySet();
		for (String string : keySet) {
			if(string.startsWith(Assets+".")){
				assetKeyConfirmed = true;
			}
		}
		if(!assetKeyConfirmed){
			//TODO throw Asset Key Configuration Not Exists Exception
		}
		config = cm;
	}
	
	public HashMap<String, String> getAssetIDMap(){
		HashMap<String, String> assetIDMap = new HashMap<String, String>();
		for(String key : config.keySet()){
			if(key.startsWith(Assets)){
				String assetFile = config.get(key);
				String assetKey = key.substring(Assets.length()+1);
				assetIDMap.put(assetFile, assetKey);
			}
		}
		return assetIDMap;
	}
	

}
