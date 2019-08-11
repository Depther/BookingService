package me.depther.model;

import java.util.List;

public class ReservationInfoResponse {

	private List<ReservationInfo> reservationInfos;

	private int size;

	public ReservationInfoResponse() {
	}

	public ReservationInfoResponse(List<ReservationInfo> reservationInfos, int size) {
		this.reservationInfos = reservationInfos;
		this.size = size;
	}

	public List<ReservationInfo> getReservationInfos() {
		return reservationInfos;
	}

	public void setReservationInfos(List<ReservationInfo> reservationInfos) {
		this.reservationInfos = reservationInfos;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	@Override
	public String toString() {
		return "ReservationInfoResponse{" +
				"reservationInfos=" + reservationInfos +
				", size=" + size +
				'}';
	}

}
