package modelAbstract;

import java.util.HashMap;
import java.util.LinkedList;


public class ListedAbstractData extends AbstractData{
	protected LinkedList<AbstractData> list;
	protected HashMap<AbstractDataKey,AbstractData> map;
	
	public ListedAbstractData(AbstractDataKey key) {
		super(key);
		list = new LinkedList<AbstractData>();
		map = new HashMap<AbstractDataKey, AbstractData>();
	}
	
	public void add(AbstractData data){
		list.add(data);
		map.put(data.key, data);
	}
	
	public void remove(AbstractDataKey key){
		AbstractData data = map.get(key);
		for(int i = 0; i < list.size();i++){
			if(list.get(i).key.hashCode() == key.hashCode())
				list.remove(i);
		}
		
		map.remove(key);
	}

	public LinkedList<AbstractData> getList() {
		return list;
	}

	public HashMap<AbstractDataKey, AbstractData> getMap() {
		return map;
	}
	
	

}
