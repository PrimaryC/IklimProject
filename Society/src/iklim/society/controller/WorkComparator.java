package iklim.society.controller;

import iklim.society.work.Work;

import java.util.Comparator;

public class WorkComparator implements Comparator<Work> {

	@Override
	public int compare(Work o1, Work o2) {
		if(o1.getExecutionTik()>o2.getExecutionTik()){
			return -1;
		}
		else if(o1.getExecutionTik()<o2.getExecutionTik()){
			return 1;
		}
		return 0;
	}

}
