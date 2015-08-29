package modelAbstract;



import java.util.UUID;

public class AbstractData {
	public AbstractDataKey			key;
	private int 					index;
	protected AbstractDataKey 		parent;
	
	public AbstractData(AbstractDataKey key) {
		this.key = key;
	}


	public AbstractDataKey getKey() {
		return key;
	}


	public int getIndex() {
		return index;
	}


	public void setIndex(int index) {
		this.index = index;
	}


	public AbstractDataKey getParent() {
		return parent;
	}
	
	public boolean isParent(){
		if(parent == null){
			return false;
		}else
			return true;
	}

	public void setParent(AbstractDataKey parent) {
		this.parent = parent;
	}
	
	
}
