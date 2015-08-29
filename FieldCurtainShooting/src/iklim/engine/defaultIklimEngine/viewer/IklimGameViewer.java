package iklim.engine.defaultIklimEngine.viewer;

import java.awt.Dimension;
import java.awt.event.KeyListener;
import java.util.HashMap;

import javax.swing.JFrame;
import javax.swing.JLayeredPane;

import org.lwjgl.glfw.*;

import static org.lwjgl.glfw.Callbacks.*;
import static org.lwjgl.glfw.GLFW.*;
import static org.lwjgl.opengl.GL11.*;
import static org.lwjgl.system.MemoryUtil.*;
import static iklim.engine.defaultIklimEngine.Configuration.ViewConfig.*;

public class IklimGameViewer {
	
	private GLFWErrorCallback						errCallback;
	
	
//	private final JFrame							mainFrame;
//	private final JLayeredPane						mainPanel;
	private final HashMap<String, GameScene>		sceneMap;
	private String									currentScene;
	
	public IklimGameViewer() {
		GLFW.glfwSetErrorCallback(errCallback = errorCallbackPrint(System.err));
		sceneMap = new HashMap<String, GameScene>();
	}
	public void init(){
//		mainFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//		
//		mainPanel.setPreferredSize(new Dimension(FrameWidth, FrameHeight));
//		mainPanel.setOpaque(false);
//		
//		mainFrame.setContentPane(mainPanel);
//		mainFrame.pack();
		
	}
	
	public void run(String scene){
		currentScene = scene;
		GameScene gs = sceneMap.get(scene);
//		mainPanel.add(gs, 1);
//		mainFrame.setVisible(true);
	}
	public void addScene(String name, GameScene scene) {
		sceneMap.put(name, scene);
		
	}
	public void repaint() {
//		mainFrame.repaint();
	}
	public void animate() {
		sceneMap.get(currentScene).animate();
		
	}
	public boolean isSceneOver() {
		return sceneMap.get(currentScene).isClosed();
	}
	public void showScene(String sceneName) {
		if(sceneName.equals(currentScene)){
			return;
		}
//		mainPanel.remove(sceneMap.get(currentScene));
//		mainPanel.add(sceneMap.get(sceneName), 1);
		this.currentScene = sceneName;
	}
	public GameScene getCurrentScene() {
		return sceneMap.get(currentScene);
	}
	public void addKeyListener(KeyListener l) {
//		mainFrame.addKeyListener(l);
		
	}
	
	
	

}
