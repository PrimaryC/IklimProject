package iklim.society.controller;

import iklim.society.model.ModelManager;
import iklim.society.work.Work;

import java.util.List;
import java.util.PriorityQueue;
import java.util.Timer;
import java.util.TimerTask;

public class TaskManager extends TimerTask {

	private Timer 						timer;
	private PriorityQueue<Work>			queue;
	private long						tik;
	private ModelManager				model;
	private long						idCount;
	
	
	public TaskManager(ModelManager m) {
		tik = 0;
		idCount = 0;
		queue = new PriorityQueue<Work>(new WorkComparator());
		timer = new Timer();
		timer.scheduleAtFixedRate(this, 1000, 1000);
		this.model = m;
	}
	public void start(){
		List<Work> works = model.getBuildingProcessList();
		for (Work work : works) {
			work.setExecutionTik(tik+work.getProcessTik());
		}
		queue.addAll(works);
	}

	@Override
	public void run() {
		if(queue.size()>0 && queue.peek().getExecutionTik()<tik){
			queue.poll().execute(this);
		}
		System.out.println("-----------------------------------Tik "+tik+"-----------------------------------");
		model.printStatus();
		tik++;
		
	}

	public void newTemperalBuildingTask(String buildingID) {
		Work w = model.getBuildingProcess(buildingID);
		w.setExecutionTik(tik+1);
		queue.offer(w);
	}

	public String newItem(String materialID) {
		return model.createItem(materialID+String.format("%010d", ++idCount), materialID);
		
	}
	public void newTask(String buildingID) {
		Work w = model.getBuildingProcess(buildingID);
		w.setExecutionTik(tik+w.getProcessTik());
		queue.offer(w);
	}


}
