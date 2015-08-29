package iklim.engine.defaultIklimEngine.resource;

import iklim.engine.defaultIklimEngine.Configuration;

import java.awt.Image;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;

import javax.imageio.ImageIO;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.SourceDataLine;
import javax.sound.sampled.UnsupportedAudioFileException;

public class IklimResourceManager {
	private static final HashMap<String, Image>				imageMap;
	private static final HashMap<String, SourceDataLine>				audioMap;
	static{
		imageMap = new HashMap<String, Image>();
		audioMap = new HashMap<String, SourceDataLine>();
		File f = new File(Configuration.ResourceDirectory);
		LinkedList<File> list = new LinkedList<File>();
		for (File file : f.listFiles()) {
			list.add(file);
		}
		while(!list.isEmpty()){
			File readFile = list.removeFirst();
			if(readFile.isDirectory()){
				for (File file : readFile.listFiles()) {
					list.add(file);
				}
				continue;
			}
			if(isImageFile(readFile)){
				Image img = null;
				try {
					img = ImageIO.read(readFile);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				imageMap.put(makeSimpleName(readFile), img);
			}
			if(isAudioFile(readFile)){
				SourceDataLine line = null;
				try {
					System.out.println(readFile.getName());
					AudioInputStream ais = AudioSystem.getAudioInputStream(readFile);
					AudioFormat af = ais.getFormat();
					DataLine.Info info = new DataLine.Info(SourceDataLine.class, af);
					line = (SourceDataLine) AudioSystem.getLine(info);
					line.open(af);
					int read = 0;
					byte[] readByte = new byte[1024];
					while(read != -1){
						read = ais.read(readByte, 0, readByte.length);
						if(read>-1){
							line.write(readByte, 0, read);
						}
					}
				} catch (LineUnavailableException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				} catch (UnsupportedAudioFileException e) {
					e.printStackTrace();
				}
				audioMap.put(makeSimpleName(readFile), line);
			}
		}
		
	}
	private static boolean isImageFile(File readFile) {
		if(readFile.getName().endsWith("jpg")){
			return true;
		}
		if(readFile.getName().endsWith("png")){
			return true;
		}
		if(readFile.getName().endsWith("gif")){
			return true;
		}
		if(readFile.getName().endsWith("bmp")){
			return true;
		}
		return false;
	}
	
	private static boolean isAudioFile(File readFile) {
		if(readFile.getName().endsWith("wav")){
			return true;
		}
		if(readFile.getName().endsWith("mp3")){
			return true;
		}
		if(readFile.getName().endsWith("ogg")){
			return true;
		}
		return false;
	}

	private static String makeSimpleName(File readFile) {
		return readFile.getName().substring(0, readFile.getName().length()-4);
	}

	public static Image getImage(String name) throws ResourceNotFoundException{
		if(imageMap.containsKey(name)){
			return imageMap.get(name);
		}
		throw new ResourceNotFoundException(name);
	}

	public static SourceDataLine getAudio(String name) throws ResourceNotFoundException{
		if(audioMap.containsKey(name)){
			return audioMap.get(name);
		}
		throw new ResourceNotFoundException(name);
		
	}

}
