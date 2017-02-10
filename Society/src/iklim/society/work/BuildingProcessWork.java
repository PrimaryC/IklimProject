package iklim.society.work;

import iklim.society.controller.TaskManager;
import iklim.society.model.ModelManager;

import java.util.LinkedList;

public class BuildingProcessWork extends Work{

	private String 									buildingID;
	private LinkedList<ProcessParameter>			parameters;
	
	
	public BuildingProcessWork(ModelManager m) {
		super(m);
		parameters = new LinkedList<ProcessParameter>();
	}
	
	public String getBuildingID() {
		return buildingID;
	}
	public void setBuildingID(String buildingID) {
		this.buildingID = buildingID;
	}
	public LinkedList<ProcessParameter> getParameters() {
		return parameters;
	}
	public void addParameters(ProcessParameter parameter) {
		this.parameters.add(parameter);
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("Work for ").append(buildingID).append("\n");
		sb.append("\tWork on ").append(this.getExecutionTik()).append("\n");
		sb.append("\tProcess in ").append(this.getProcessTik()).append("\n");
		for (ProcessParameter processParameter : parameters) {
			sb.append("\t").append(processParameter.toString()).append("\n");
		}
		return sb.toString();
	}
	
	@Override
	public void execute(TaskManager t) {

		for (ProcessParameter processParameter : parameters) {
			if(!processParameter.isProduct() && !this.getModel().hasItem(this.buildingID, processParameter.getMaterialID(), processParameter.getQuantity())){
				t.newTemperalBuildingTask(this.buildingID);
				System.out.println("Item Insufficient. Task of "+buildingID+" is Canceled");
				return;
			}
		}
		
		for (ProcessParameter param : parameters) {
			if(param.isProduct()){
				for(int i = 0; i < param.getQuantity(); i++){
					String item = t.newItem(param.getMaterialID());
					this.getModel().assignItem(item, buildingID);
				}
			}else{
				for(int i = 0; i < param.getQuantity(); i++){
					String item = this.getModel().getInventoryItem(param.getMaterialID(), buildingID);
					this.getModel().removeItem(item);
				}
			}
		}
		t.newTask(buildingID);
		
	}
	
	
}
