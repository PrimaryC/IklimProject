package controller;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import static staticContext.UtilityContext.*;

public class ButtonListener implements ActionListener{
	private ControlManager				controller;
	
	public ButtonListener(ControlManager controller) {
		this.controller = controller;
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		if(e.getActionCommand().equals(AddStandingCGAsLayoutButton)){
			controller.addSelectedStandingCGToModel();
		}else if(e.getActionCommand().equals(StandingCGSizeSetButton)){
			controller.setSelectedStandingCGSizeToModel();
		}else if(e.getActionCommand().equals(StandingCGBlurSetButton)){
			controller.setSelectedStandingCGBlurToModel();
		}else if(e.getActionCommand().equals(StandingCGCoordinateSetButton)){
			controller.setSelectedStandingCGCoordinateToModel();
		}else if(e.getActionCommand().equals(InputTextButton)){
			controller.setSelectedTextToModel();
		}else if(e.getActionCommand().equals(TextSizeSetButton)){
			controller.setSelectedTextSizeToModel();
		}else if(e.getActionCommand().equals(TextTypeSetButton)){
			controller.setSelectedTextTypeToModel();
		}else if(e.getActionCommand().equals(CreateEpisodeButton)){
			controller.showEpisodeCreationWindow();
		}else if(e.getActionCommand().equals(ECOKButton)){
			controller.confirmEpisodeCreation();
		}else if(e.getActionCommand().equals(CreateComponentButton)){
			controller.addSubResource();
		}else if(e.getActionCommand().equals(DeleteComponentButton)){
			controller.deleteSubResource();
		}
		
		
	}

}
