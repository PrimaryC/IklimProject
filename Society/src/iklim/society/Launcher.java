package iklim.society;

import iklim.society.controller.TaskManager;
import iklim.society.interaction.InteractionManager;
import iklim.society.model.ModelManager;

public class Launcher {
	public Launcher() {
		ModelManager model = new ModelManager();
		model.init();
		InteractionManager interaction = new InteractionManager(model);
		interaction.init();
		TaskManager task = new TaskManager(model);
		task.start();
	}
	
	public static void main(String[] args) {
		
		
		new Launcher();
	}
}
