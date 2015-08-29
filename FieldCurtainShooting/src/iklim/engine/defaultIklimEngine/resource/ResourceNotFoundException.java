package iklim.engine.defaultIklimEngine.resource;

public class ResourceNotFoundException extends Exception {
	private static final long serialVersionUID = 9184751249711260444L;
	private final String					name;

	public ResourceNotFoundException(String name) {
		this.name = name;
	}
	
	@Override
	public String getMessage() {
		return "Resource Not Found : "+name;
	}
}
