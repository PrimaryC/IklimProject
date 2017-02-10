package iklim.society.work;

public class ProcessParameter {
	private boolean						product;
	private String						materialID;
	private int							quantity;
	
	
	public boolean isProduct() {
		return product;
	}
	public void setProduct(boolean product) {
		this.product = product;
	}
	public String getMaterialID() {
		return materialID;
	}
	public void setMaterialID(String materialID) {
		this.materialID = materialID;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		
		if(product){
			sb.append("Produce");
		}else{
			sb.append("Consume");
		}
		
		sb.append(" ").append(quantity).append(" of ").append(materialID);
		return sb.toString();
	}
	
}
