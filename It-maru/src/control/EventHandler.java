package control;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import ViewModel.ViewModelManager;
import ViewModel.layermodel.LogoLayerModel;

public class EventHandler {
	private ViewModelManager viewModel;
	
	public EventHandler(ViewModelManager vm){
		this.viewModel = vm;
	}
	
	public void loadFile(){
		String filename = "pic.jpg";
		BufferedImage img = null;
		try {
			img = ImageIO.read(new File(filename));
		} catch (IOException e) {
			System.out.println("No Such File!! (" + filename + ")");
			e.printStackTrace();
		}
		
		LogoLayerModel temp = (LogoLayerModel)viewModel.getLayerModel(SceneContext.TitleLayer);
		temp.setImage(img);
	}
}
