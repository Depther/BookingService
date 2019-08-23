package me.depther.model;

public class Promotion {

	private int id;

	private int productId;

	private int fileId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public int getFileId() {
		return fileId;
	}

	public void setFileId(int fileId) {
		this.fileId = fileId;
	}

	@Override
	public String toString() {
		return "Promotion{" +
				"id=" + id +
				", productId=" + productId +
				", fileId=" + fileId +
				'}';
	}
}
