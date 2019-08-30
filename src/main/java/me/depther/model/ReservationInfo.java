package me.depther.model;

public class ReservationInfo {

	private boolean cancelYn;

	private String createDate;

	private DisplayInfo displayInfo;

	private int displayInfoId;

	private String modifyDate;

	private int productId;

	private String reservationDate;

	private String reservationEmail;

	private int reservationInfoId;

	private String reservationName;

	private String reservationTelephone;

	private int totalPrice;

	public boolean isCancelYn() {
		return cancelYn;
	}

	public void setCancelYn(boolean cancelYn) {
		this.cancelYn = cancelYn;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public DisplayInfo getDisplayInfo() {
		return displayInfo;
	}

	public void setDisplayInfo(DisplayInfo displayInfo) {
		this.displayInfo = displayInfo;
	}

	public int getDisplayInfoId() {
		return displayInfoId;
	}

	public void setDisplayInfoId(int displayInfoId) {
		this.displayInfoId = displayInfoId;
	}

	public String getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(String modifyDate) {
		this.modifyDate = modifyDate;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getReservationDate() {
		return reservationDate;
	}

	public void setReservationDate(String reservationDate) {
		this.reservationDate = reservationDate;
	}

	public String getReservationEmail() {
		return reservationEmail;
	}

	public void setReservationEmail(String reservationEmail) {
		this.reservationEmail = reservationEmail;
	}

	public int getReservationInfoId() {
		return reservationInfoId;
	}

	public void setReservationInfoId(int reservationInfoId) {
		this.reservationInfoId = reservationInfoId;
	}

	public String getReservationName() {
		return reservationName;
	}

	public void setReservationName(String reservationName) {
		this.reservationName = reservationName;
	}

	public String getReservationTelephone() {
		return reservationTelephone;
	}

	public void setReservationTelephone(String reservationTelephone) {
		this.reservationTelephone = reservationTelephone;
	}

	public int getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}

	@Override
	public String toString() {
		return "ReservationInfo{" +
				"cancelYn=" + cancelYn +
				", createDate='" + createDate + '\'' +
				", displayInfo=" + displayInfo +
				", displayInfoId=" + displayInfoId +
				", modifyDate='" + modifyDate + '\'' +
				", productId=" + productId +
				", reservationDate='" + reservationDate + '\'' +
				", reservationEmail='" + reservationEmail + '\'' +
				", reservationInfoId=" + reservationInfoId +
				", reservationName='" + reservationName + '\'' +
				", reservationTelephone='" + reservationTelephone + '\'' +
				", totalPrice=" + totalPrice +
				'}';
	}
}
