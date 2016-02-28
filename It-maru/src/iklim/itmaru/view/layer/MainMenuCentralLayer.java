package iklim.itmaru.view.layer;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

import iklim.engine.gameInterface.AbstractLayer;
import iklim.engine.gameInterface.LayoutedImage;
import iklim.engine.uidata.AbstractViewModel;
import iklim.engine.uidata.ViewModelManager;
import iklim.itmaru.utility.LayerContext;
import iklim.itmaru.viewModel.MainMenuCentralLayerModel;

public class MainMenuCentralLayer extends AbstractLayer{
	
	MainMenuCentralLayerModel model;
	
	@Override
	public void setModel(ViewModelManager model) {
		this.model = (MainMenuCentralLayerModel)model.getLayerModel(LayerContext.MAIN_MENU_CENTRAL_LAYER);
	}

	@Override
	public void drawElements(Graphics g) {
		
	}
	
	
	public void calculateLocation(){
		String currentWheel = model.getCurrentWheel();
		LayoutedImage currentImage = new LayoutedImage(new BufferedImage(1, 2, 3)); // ������! ������ ��� �߰��Ǹ� ���� �ٲ� ��!!!
		
		
		
	}

}
