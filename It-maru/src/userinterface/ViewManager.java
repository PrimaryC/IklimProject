package userinterface;

import java.awt.Color;
import java.util.Hashtable;
import java.util.LinkedList;

import javax.swing.JFrame;
import javax.swing.border.LineBorder;

import ViewModel.ViewModelManager;
import userinterface.scene.LogoScene;
import userinterface.scene.Scene;
import control.EventListener;
import control.SceneContext;

public class ViewManager {
	private Hashtable<String,Scene> sceneTable;
	private LinkedList<Scene> sceneList;
	private ViewModelManager viewModel;
	private JFrame mainFrame;
	private Scene currentScene;
	
	public ViewManager(ViewModelManager viewModel){
		mainFrame = new JFrame();
		sceneTable = new Hashtable<String,Scene>();
		sceneList = new LinkedList<Scene>();
		this.viewModel = viewModel;
	}
	
	public void init(ViewModelManager vm, EventListener listener){
		addScene(SceneContext.LogoScene,new LogoScene(listener));
		
		mainFrame.setVisible(true);
		mainFrame.setBounds(0,0,500,500);
		
		currentScene = sceneTable.get(SceneContext.LogoScene);
		currentScene.setViewModel(viewModel);
		currentScene.setBorder(new LineBorder(Color.black));
		currentScene.setBounds(0,0,500,500);
		currentScene.setVisible(false);
		
	}
	
	public void run(){
		currentScene.setVisible(true);
	}

	public void addScene(String sceneName,Scene scene){
		sceneTable.put(sceneName, scene);
		sceneList.add(scene);
		mainFrame.add(scene);
	}

	public void init() {
		// TODO Auto-generated method stub
		
	}
	
	public void repaint(){
		currentScene.repaintAll();
	}
}
