package me.depther.model;

public class ImageFile {

	private int fileId;

	private String fileName;

	private String saveFileName;

	private String contentType;

	private boolean deleteFlag;

	private String createDate;

	private String modifyDate;

	public int getFileId() {
		return fileId;
	}

	public void setFileId(int fileId) {
		this.fileId = fileId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getSaveFileName() {
		return saveFileName;
	}

	public void setSaveFileName(String saveFileName) {
		this.saveFileName = saveFileName;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public boolean isDeleteFlag() {
		return deleteFlag;
	}

	public void setDeleteFlag(boolean deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(String modifyDate) {
		this.modifyDate = modifyDate;
	}

	@Override
	public String toString() {
		return "ImageFile{" +
				"fileId=" + fileId +
				", fileName='" + fileName + '\'' +
				", saveFileName='" + saveFileName + '\'' +
				", contentType='" + contentType + '\'' +
				", deleteFlag=" + deleteFlag +
				", createDate='" + createDate + '\'' +
				", modifyDate='" + modifyDate + '\'' +
				'}';
	}
}
