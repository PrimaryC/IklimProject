package iklim.society.work;

import iklim.society.controller.TaskManager;
import iklim.society.model.ModelManager;

public abstract class Work {
	private long						executionTik;
	private int							processTik;
	private ModelManager				model;

	public Work(ModelManager model) {
		this.model = model;
	}
	
	public long getExecutionTik() {
		return executionTik;
	}

	public void setExecutionTik(long l) {
		this.executionTik = l;
	}

	public int getProcessTik() {
		return processTik;
	}

	public void setProcessTik(int processTik) {
		this.processTik = processTik;
	}
	public abstract void execute(TaskManager tm);

	public ModelManager getModel() {
		return model;
	}

	
}
