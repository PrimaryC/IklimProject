package controller;

import ViewModel.ViewModelManager;
import Factory.ModelFactory;
import view.ViewManager;
import model.*;
import modelAbstract.*;
import staticContext.*;
import static staticContext.UtilityContext.*;

public class ControlManager {
	private ButtonListener buttonListener;
	private ViewManager view;
	private ModelManager model;
	private ModelFactory factory;
	private ViewModelManager viewModel;
	
	public ControlManager(ViewManager view, ModelManager model, ViewModelManager viewModel) {
		this.view = view;
		this.model = model;
		this.viewModel = viewModel;
		buttonListener = new ButtonListener(this);
		factory = ModelFactory.getInstance();
		init();
	}

	private void init() {
		view.addButtonListener(buttonListener);
	}

	public void addSelectedStandingCGToModel() {
		AbstractDataKey graphicResourceKey = view.getSelectedResourceItem();
		AbstractDataKey sentenceKey = view.getSelectedSentence();
		model.addResource(
				factory.makeStandingCG(sentenceKey, graphicResourceKey),
				sentenceKey);
	}

	public void setSelectedStandingCGSizeToModel() {
		int size = view.getStandingCGSizeInputValue();
		AbstractDataKey key = view.getSelectedStandingCGKey();
		StandingCG cg = (StandingCG) model.getResourceByKey(key); // if value is
																	// not
																	// standingCG?
		cg.setSize(size);
	}

	public void setSelectedStandingCGBlurToModel() {
		int blur = view.getSelectedStandingCGBlur();
		AbstractDataKey key = view.getSelectedStandingCGKey();
		StandingCG cg = (StandingCG) model.getResourceByKey(key);
		cg.setBlur(blur);
	}

	public void setSelectedStandingCGCoordinateToModel() {
		int x = view.getSelectedStandingCGXCoordinate();
		int y = view.getSelectedStandingCGYCoordinate();
		AbstractDataKey key = view.getSelectedStandingCGKey();
		StandingCG cg = (StandingCG) model.getResourceByKey(key);
		cg.setX(x);
		cg.setY(y);

	}

	public void setSelectedTextToModel() {
		String text = view.getSelectedText();
		AbstractDataKey sentenceKey = view.getSelectedSentence();
		Sentence sentence = (Sentence) model.getResourceByKey(sentenceKey);
		sentence.setText(text);
	}

	public void showEpisodeCreationWindow() {
		view.setEpisodeCreationFrameVisibility(true);
	}

	public void confirmEpisodeCreation() {
		Episode newEpisode = factory.makeEpisode();
		String name = view.getEpisodeCreationFrame().getTitle();
		String writer = view.getEpisodeCreationFrame().getWriter();

		newEpisode.setName(name);
		newEpisode.setWriter(writer);
		model.addResource(newEpisode);
		view.getEpisodeCreationFrame().closeWindow();
		
		viewModel.makeTree(model.getIndividualList(EpisodeID));
		view.repaint();
	}

	public void addSubResource() {
		AbstractDataKey key = viewModel.getEpisodeListModel().getLastSelectedKey();
		AbstractData data = model.getResourceByKey(key);
		AbstractData newData = null;
		
		if (key != null) {
			if (key.type == EpisodeID) {
				newData = factory.makeScene(key);
			} else if (key.type == SceneID) {
				newData = factory.makeRow(key);
			} else if (key.type == RowID) {
				newData = factory.makeSentence(key);
			}
		}

		model.addResource(newData,key);
		view.repaint();
	}

	public void setSelectedTextSizeToModel() {

	}

	public void setSelectedTextTypeToModel() {
		// TODO Auto-generated method stub

	}

	public void deleteSubResource() {
		AbstractDataKey key = viewModel.getEpisodeListModel().getLastSelectedKey();
		model.removeResource(key);
		view.repaint();
	}

}
