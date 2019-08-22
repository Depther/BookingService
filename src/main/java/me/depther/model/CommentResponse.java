package me.depther.model;

public class CommentResponse {

	private int commentId;

	private int productId;

	private int reservationInfoId;

	private int score;

	private String comment;

	private String createDate;

	private String modifyDate;

	private CommentImage commentImage;

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getCommentId() {
		return commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}

	public CommentImage getCommentImage() {
		return commentImage;
	}

	public void setCommentImage(CommentImage commentImage) {
		this.commentImage = commentImage;
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

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public int getReservationInfoId() {
		return reservationInfoId;
	}

	public void setReservationInfoId(int reservationInfoId) {
		this.reservationInfoId = reservationInfoId;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	@Override
	public String toString() {
		return "CommentResponse{" +
				"comment='" + comment + '\'' +
				", commentId=" + commentId +
				", commentImage=" + commentImage +
				", createDate='" + createDate + '\'' +
				", modifyDate='" + modifyDate + '\'' +
				", productId=" + productId +
				", reservationInfoId=" + reservationInfoId +
				", score=" + score +
				'}';
	}
}
