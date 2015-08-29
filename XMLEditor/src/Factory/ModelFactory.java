package Factory;
import static staticContext.UtilityContext.*;
import model.*;
import modelAbstract.AbstractData;
import modelAbstract.AbstractDataKey;


public class ModelFactory {
	private static ModelFactory factory;
	private static int idCount = 0;
	
	private int assignId(){
		return idCount++;
	}
	
	private ModelFactory(){
		
	}
	
	public static synchronized ModelFactory getInstance(){
		if(factory == null){
			factory = new ModelFactory();
		}
		
		return factory;
	}
	
	public Episode makeEpisode(){
		return new Episode(assignId());
	}
	
	public Effect makeEffect(){
		return new Effect(assignId());
	}
	
	public GraphicResource makeResource(){
		return new GraphicResource(assignId());
	}
	
	public Row makeRow(AbstractDataKey sceneKey){
		return new Row(assignId(),sceneKey);
	}
	
	public Scene makeScene(AbstractDataKey episodeKey){
		return new Scene(assignId(), episodeKey);
	}
	
	public Sentence makeSentence(AbstractDataKey rowKey){
		return new Sentence(assignId(), rowKey);
	}
	
	public SoundResource makeSoundResource(){
		return new SoundResource(assignId());
	}
	
	public StandingCG makeStandingCG(AbstractDataKey sentenceKey, AbstractDataKey graphicSource){
		return new StandingCG(assignId(), sentenceKey,graphicSource);
	}
}
