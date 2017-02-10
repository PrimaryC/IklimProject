package iklim.society.model;

import java.util.LinkedList;
import java.util.List;

import iklim.society.work.BuildingProcessWork;
import iklim.society.work.ProcessParameter;
import iklim.society.work.Work;

import org.apache.jena.ontology.OntModel;
import org.apache.jena.query.Query;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QueryFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.StmtIterator;
import org.apache.jena.vocabulary.RDF;
import org.apache.jena.vocabulary.RDFS;

public class ModelManager {
	private final OntModel model;
	
	public static final String Prefix = "http://www.projectIklim.com/Society#";

	
	private final Property				belong_to;
	private final Property				contains;
	private final Property				hasInventory;
	private final Property				makes;
	private final Property				consume;
	private final Property				processDuration;
	private final Property				hasProcess;
	private final Property				materialType;
	private final Property				quantity;
	
	private final Resource				Farm;
	private final Resource				Water;
	private final Resource				Scythe;
	private final Resource				Inventory;
	private final Resource 				Process;
	

	public ModelManager() {
		model = ModelFactory.createOntologyModel();
		model.read("./Test.owl");
		
		this.belong_to = model.getProperty(Prefix+"belong_to");
		this.contains = model.getProperty(Prefix+"contains");
		this.hasInventory = model.getProperty(Prefix+"hasInventory");
		this.makes = model.getProperty(Prefix+"makes");
		this.consume = model.getProperty(Prefix+"consume");
		this.processDuration = model.getProperty(Prefix+"processDuration");
		this.hasProcess = model.getProperty(Prefix+"hasProcess");
		this.materialType = model.getProperty(Prefix+"materialType");
		this.quantity = model.getProperty(Prefix+"quantity");
		
		this.Farm = model.getResource(Prefix+"Farm");
		this.Water = model.getResource(Prefix+"Water");
		this.Scythe = model.getResource(Prefix+"Scythe");
		this.Inventory = model.getResource(Prefix+"Inventory");
		this.Process = model.getResource(Prefix+"Process");
		
		
	}

	public void init() {
		String farmInd = this.buildStructure("Farm001", Farm);
		String water = this.createItem("TempWater001", Water.toString());
		this.assignItem(water, farmInd);
		String scythe = this.createItem("TempScythe001", Scythe.toString());
		this.assignItem(scythe, farmInd);
	}
	
	public String buildStructure(String id, Resource type){
		id = checkPrefix(id);
		
		Resource buildingInd = model.createIndividual(id, type);
		Resource inventory = model.createIndividual(id+"/Inventory",Inventory);
		buildingInd.addProperty(hasInventory, inventory );
		return buildingInd.toString();
	}
	
	private String checkPrefix(String id) {
		if(!id.startsWith("http://")){
			id = Prefix+id;
		}
		return id;
		
	}

	public String createItem(String id, String type){
		id = checkPrefix(id);
		Resource item = model.createIndividual(id, model.getResource(type));
		return item.toString();
	}
	
	public void assignItem(String itemID, String invID){
		this.takeItem(itemID);
		Resource itemInd = model.getResource(itemID);
		Resource farmInd = model.getResource(invID);
		if(!farmInd.hasProperty(RDF.type, Inventory)){
			farmInd = farmInd.getPropertyResourceValue(hasInventory);
		}
		farmInd.addProperty(contains, itemInd );
		itemInd.addProperty(belong_to, farmInd);
	}
	
	public void takeItem(String i){
		Resource item = model.getResource(i);
		Resource preInven = item.getPropertyResourceValue(belong_to);
		if(preInven!=null){
			model.remove(preInven, contains, item);
			model.remove(item, belong_to, preInven);
		}
	}
	
	public void removeItem(String itemID){
		takeItem(itemID);
		Resource item = model.getResource(itemID);
		StmtIterator s = item.listProperties();
		model.remove(s.toList());
	}
	
	
	public void printStatus(){
		final String queryString = "select ?building ?item where { \n"
				+ "?building <" + RDF.type + "> <" + Prefix + "Structure> . \n"
				+ "?building <" + Prefix + "hasInventory> ?inv . \n"
				+ "?inv <" + Prefix + "contains> ?item .\n"
				+ " }";

		final Query q = QueryFactory.create(queryString);
		final QueryExecution qe = QueryExecutionFactory.create(q, model);
		final ResultSet r = qe.execSelect();
		while (r.hasNext()) {
			final QuerySolution sol = r.nextSolution();
			String building = sol.get("building").toString();
			String item = sol.get("item").toString();
			System.out.println(building+" have "+item);
		}
	}
	
	public Work	getBuildingProcess(String id){
		BuildingProcessWork w = new BuildingProcessWork(this);
		id = checkPrefix(id);
		Resource baseBuilding = queryBaseBuilding(id);	
		if(baseBuilding == null) return null;
		w.setBuildingID(id.toString());
		Resource baseBuildingProcess =baseBuilding.getPropertyResourceValue(hasProcess);
		
		int duration = baseBuildingProcess.getProperty(processDuration).getObject().asLiteral().getInt();
		w.setProcessTik(duration);
		
		getProcessRuleParameter(w, baseBuildingProcess, consume);
		getProcessRuleParameter(w, baseBuildingProcess, makes);
		
		return w;
	}

	private void getProcessRuleParameter(BuildingProcessWork w, Resource process, Property property) {
		StmtIterator iter = process.listProperties(property);
		while(iter.hasNext()){
			ProcessParameter pp = new ProcessParameter();
			Resource param = iter.next().getObject().asResource();
			
			pp.setProduct(property.equals(makes));
			pp.setMaterialID(param.getProperty(materialType).getObject().toString());
			pp.setQuantity(param.getProperty(quantity).getObject().asLiteral().getInt());
			w.addParameters(pp);
		}
		
	}

	private Resource queryBaseBuilding(String id) {
		final String queryString = "select distinct ?bb where { \n"
				+ "<"+id + "> <" + RDF.type + "> ?btype . \n"
				+ "?btype <" + RDFS.subClassOf + "> <"+Prefix+"Structure> . \n"
				+ "filter (?btype != <"+Prefix+"Structure>)"
				+ "?bb <" + RDF.type + "> ?btype . \n"
				+ "?bb <" + Prefix + "hasProcess> ?pro . \n"
				+ " }";

		final Query q = QueryFactory.create(queryString);
		final QueryExecution qe = QueryExecutionFactory.create(q, model);
		final ResultSet r = qe.execSelect();
		if(!r.hasNext()){
			return null;
		}
		return r.next().getResource("bb");
	}

	public boolean hasItem(String id, String materialID, int q) {
		Resource inventory = model.getResource(id);
		if(!inventory.hasProperty(RDF.type, Inventory)){
			inventory = inventory.getPropertyResourceValue(hasInventory);
		}
		StmtIterator iter = inventory.listProperties(contains);
		int i = 0;
		while(iter.hasNext()){
			String item = iter.next().getObject().asResource().toString();
			if(isType(item, materialID)){
				i++;
			}
		}
		return i>=q;
	}

	public String getInventoryItem(String materialID, String buildingID) {
		Resource itemInd = model.getResource(materialID);
		Resource invInd = model.getResource(buildingID);
		if(!invInd.hasProperty(RDF.type, Inventory)){
			invInd = invInd.getPropertyResourceValue(hasInventory);
		}
		StmtIterator iter = invInd.listProperties(contains);
		while(iter.hasNext()){
			String tempItem = iter.next().getObject().asResource().toString();
			if(isType(tempItem, materialID)){
				return tempItem;
			}
		}
		return null;
	}

	public boolean isType(String id, String typeID){
		StmtIterator typeIter = model.getResource(id).listProperties(RDF.type);
		while(typeIter.hasNext()){
			Resource type = typeIter.next().getObject().asResource();
			if(type.toString().equals(typeID)){
				return true;
			}
		}
		return false;
	}
	
	public List<Work> getBuildingProcessList() {
		LinkedList<Work> works = new LinkedList<Work>();
		final String queryString = "select ?building ?item where { \n"
				+ "?building <" + RDF.type + "> <" + Prefix + "Structure> . \n"
				+ "?building <" + Prefix + "hasInventory> ?inv . \n"
				+ " }";

		final Query q = QueryFactory.create(queryString);
		final QueryExecution qe = QueryExecutionFactory.create(q, model);
		final ResultSet r = qe.execSelect();
		while (r.hasNext()) {
			final QuerySolution sol = r.nextSolution();
			String building = sol.get("building").toString();
			Work w = this.getBuildingProcess(building);
			works.add(w);
		}
		return works;
	}
	
	

}
