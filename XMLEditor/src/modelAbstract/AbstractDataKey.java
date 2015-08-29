package modelAbstract;

import static staticContext.UtilityContext.*;

public class AbstractDataKey {
	public final int						type;
	public final int						id;
	
	
	
	public AbstractDataKey(int type, int id) {
		this.type = type;
		this.id = id;
	}
	
	
	public AbstractDataKey(String s, int id2) {
		int type = -1;
		if(s.equals(EpisodeType)){
			type = EpisodeID;
		}else if(s.equals(SceneType)){
			type = SceneID;
		}else if(s.equals(RowType)){
			type = RowID;
		}else if(s.equals(SentenceType)){
			type = SentenceID;
		}else if(s.equals(GraphicResourceType)){
			type = GraphicResourceID;
		}else if(s.equals(SoundResourceType)){
			type = SoundResourceID;
		}else if(s.equals(EffectType)){
			type = EffectID;
		}else if(s.equals(StandingCGType)){
			type = StandingCGID;
		}
		this.type = type;
		this.id = id2;
		
	}

	@Override
	public int hashCode() {
		return (type*1000000)+id;
	}
	
	@Override
	public boolean equals(Object obj) {
		return this.hashCode()==obj.hashCode();
	}
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("[Key] type : ").append(type).append(" | id : ").append(id);
		
		return sb.toString();
	}

	
}
