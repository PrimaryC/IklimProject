package iklim.engine.gameInterface.layer;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferedImage;

import javax.swing.JButton;
import javax.swing.border.LineBorder;

import iklim.engine.uicontrol.SceneContext;
import iklim.engine.uidata.ViewModelManager;
import ViewModel.layermodel.LogoLayerModel;

public class TitleLayer extends AbstractLayer{
	
	private LogoLayerModel vm;

	public TitleLayer(){
	
		this.setBounds(10, 10, 400, 400);
		setBorder(new LineBorder(Color.black));

		this.setVisible(true);
	}
	
	@Override
	public void paint(Graphics g){
		
		System.out.println(vm.getImage() + "fdafdsafa");
		g.drawImage(vm.getImage(), 0, 0, null);
	
	}

	@Override
	public void setModel(ViewModelManager model) {
		this.vm = (LogoLayerModel)model.getLayerModel(SceneContext.TitleLayer);
	}
	
}
