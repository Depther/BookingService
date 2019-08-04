package me.depther.model;

import java.util.List;

public class ReservationInfoResponse {

	private List<ReservationInfo> items;

	private int size;

	public List<ReservationInfo> getItems() {
		return items;
	}

	public void setItems(List<ReservationInfo> items) {
		this.items = items;
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
				"items=" + items +
				", size=" + size +
				'}';
	}
}
