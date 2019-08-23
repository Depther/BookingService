// 프로모션 담당 클래스
class Promotions {
	constructor() {
		this.response = "";
	}
	// 프로모션 데이터 요청 메소드
	sendRquest() {
		const methodType = "GET";
		const requestURI = "/api/promotions";
		const params = null;
		const requestSender = new RequestSender(this, methodType, requestURI, params, this.requestListener);
		requestSender.sendRequest();
	}
	// 서버 응답 처리 메소드
	requestListener(xhr, client) {
		client.response = JSON.parse(xhr.responseText);
		client.addPromotionItems();
		client.addDummyItems();
		client.setSlideEffect();
	}
	// Promotion 데이터 화면에 추가하는 메소드
	addPromotionItems() {
		const template = document.querySelector("#template-promotion-item").textContent;
		const addPosition = document.querySelector(".visual_img");
		for (let item of this.response.items) {
			const resultHTML = template.replace("{fileId}", item.fileId);
			addPosition.insertAdjacentHTML("beforeend", resultHTML);
		}
	}
	// 부드러운 슬라이드 전환을 위해 슬라이드의 마지막에 더미 아이템 추가
	addDummyItems() {
		const firstItem = document.querySelector(".visual_img > .item:first-child");
		firstItem.parentElement.appendChild(firstItem.cloneNode(true));
	}
	// 프로모션 영역 슬라이드 효과 설정 메소드
	setSlideEffect() {
		const promotionItems = document.querySelectorAll(".visual_img > .item");
		const len = promotionItems.length;
		let count = 0;

		setInterval(() => {
			count++;
			let xPos = count % len * 100;
			for (let i = 0; i < len; i++) {
				promotionItems.item(i).style.transition = "1s";
				promotionItems.item(i).style.transform = "translateX(-" + xPos + "%)";
			}
			if (count % len === len - 1) {
				this.controlEndImg(promotionItems);
				count++;
			}
		}, 4000);
	}
	// 슬라이드 마지막 이미지 도달 시 처리하는 메소드
	controlEndImg(promotionItems) {
		setTimeout(() => {
			promotionItems.forEach((item) => {
				item.style.transition = "0s";
				item.style.transform = "translateX(0%)";
			});
		}, 1000);
	}
}

// 카테고리 담당 클래스
class Categories {
	constructor() {
		this.response = "";
	}
	// 프로모션 데이터 요청 메소드
	sendRquest() {
		const methodType = "GET";
		const requestURI = "/api/categories";
		const params = null;
		const requestSender = new RequestSender(this, methodType, requestURI, params, this.requestListener);
		requestSender.sendRequest();
	}
	// 서버 응답 처리 메소드
	requestListener(xhr, client) {
		client.response = JSON.parse(xhr.responseText);
		client.addCategoryItems();
	}
	// Category 아이템 화면 출력 메소드
	addCategoryItems() {
		const template = document.querySelector("#template-category-item").textContent;
		const addPosition = document.querySelector(".event_tab_lst");
		for (let item of this.response.items) {
			const resultHTML = template.replace("{id}", item.id)
				                       .replace("{name}", item.name);
			addPosition.insertAdjacentHTML("beforeend", resultHTML);
		}
	}
}

// 상품 담당 클래스
class Products {
	constructor() {
		this.response = "";
	}
	// 상품 데이터 요청 메소드
	sendRquest(categoryId, start) {
		this.start = start;
		const methodType = "GET";
		const params = null;
		let requestURI = "/api/products?";
		if (categoryId !== undefined) requestURI += "categoryId=" + categoryId + "&";
		if (start !== undefined) requestURI += "start=" + start + "&";
		const requestSender = new RequestSender(this, methodType, requestURI, params, this.requestListener);
		requestSender.sendRequest();
	}
	// 서버 응답 처리 메소드
	requestListener(xhr, client) {
		client.response = JSON.parse(xhr.responseText);
		client.addProductItems();
	}
	// 상품 데이터 화면 추가 메소드
	addProductItems() {
		const totalCount = this.response.totalCount;
		if (totalCount <= this.start + 4) {
			document.querySelector(".more > .btn").style.visibility = "hidden";
		}
		document.querySelector(".pink").textContent = totalCount + "개";
		const template = document.querySelector("#template-product-item").textContent;
		const addPosition = document.querySelectorAll(".lst_event_box");
		this.response.items.forEach((item, index) => {
			const resultHTML = template.replace("{productId}", item.productId)
				                       .replace("{displayInfoId}", item.displayInfoId)
				                       .replace(/{productDescription}/gi, item.productDescription)
				                       .replace("{fileId}", item.fileId)
				                       .replace("{placeName}", item.placeName)
				                       .replace("{productContent}", item.productContent);
			addPosition.item(index % 2).insertAdjacentHTML("beforeend", resultHTML);
		});
	}
}

// 이벤트 담당 클래스
class Event {
	constructor() {
		this.products = new Products();
	}
	// 이벤트 리스너 설정 메소드
	setEventListener() {
		const categoryMenu = document.querySelector(".event_tab_lst");
		const moreBtn = document.querySelector(".more > .btn");
		categoryMenu.addEventListener("click", this.categoryListener.bind(this));
		moreBtn.addEventListener("click", this.moreButtonListener.bind(this));
	}
	// 카테고리 메뉴 이벤트리스너
	categoryListener(e) {
		const activedMenu = document.querySelector(".event_tab_lst > .item > .active");
		const clickedMenu = e.target.parentElement;
		if (e.target.tagName === "SPAN" && activedMenu !== clickedMenu) {
			const categoryId = clickedMenu.parentElement.dataset.category;
			activedMenu.classList.remove("active");
			clickedMenu.classList.add("active");
			document.querySelector(".more > .btn").style.visibility = "visible";
			this.clearProducts();
			this.products.sendRquest(categoryId, 0);
		}
	}
	// 더보기 버튼 이벤트 리스너
	moreButtonListener() {
		const categoryId = document.querySelector(".event_tab_lst > .item > .active").parentElement.dataset.category;
		const eventBoxes = document.querySelectorAll(".lst_event_box");
		const start = eventBoxes.item(0).childElementCount + eventBoxes.item(1).childElementCount;
		this.products.sendRquest(categoryId, start);
	}
	// 상품 정보 화면에서 지우는 메소드
	clearProducts() {
		const target = document.querySelectorAll(".lst_event_box");
		const leftColumn = target.item(0);
		const rightColumn = target.item(1);
		while(leftColumn.hasChildNodes())
			leftColumn.removeChild(leftColumn.firstChild);
		while (rightColumn.hasChildNodes())
			rightColumn.removeChild(rightColumn.firstChild);
	}
}

// Main 함수
document.addEventListener("DOMContentLoaded", () => {
	new Promotions().sendRquest();
	new Categories().sendRquest();
	new Products().sendRquest();
	new Event().setEventListener();
});
