// Promotion Data 조회
function getPromotions() {
	let xhr = new XMLHttpRequest();

	xhr.addEventListener("load", function() {
		let response = JSON.parse(this.responseText);
		let html = document.querySelector("#template-promotion-item").textContent;
		let target = document.querySelector(".visual_img");

		response.items.forEach(function(item) {
			let resultHTML = html.replace("{productImageUrl}", item.productImageUrl);
			target.insertAdjacentHTML("beforeend", resultHTML);
		});
	});
	xhr.open("GET", "http://localhost:8080/api/promotions");
	xhr.send();
}

// Category Data 조회
function getCategories() {
	let xhr = new XMLHttpRequest();

	xhr.addEventListener("load", function() {
		let response = JSON.parse(this.responseText);
		let html = document.querySelector("#template-category-item").textContent;
		let target = document.querySelector(".event_tab_lst");

		response.items.forEach(function(item) {
			let resultHTML = html.replace("{id}", item.id)
				                 .replace("{name}", item.name);
			target.insertAdjacentHTML("beforeend", resultHTML);
		});
	});
	xhr.open("GET", "http://localhost:8080/api/categories");
	xhr.send();
}

// Product Data 조회
function getProducts(categoryId, start) {
	let xhr = new XMLHttpRequest();

	xhr.addEventListener("load", function() {
		let response = JSON.parse(this.responseText);
		let totalCount = response.totalCount;

		if (totalCount <= start + 4) {
			document.querySelector(".more > .btn").style.visibility = "hidden";
		}

		document.querySelector(".pink").textContent = totalCount + "개";

		let html = document.querySelector("#template-product-item").textContent;
		let target = document.querySelectorAll(".lst_event_box");

		response.items.forEach(function(item, index) {
			let resultHTML = html.replace("{productId}", item.productId)
				                 .replace(/{productDescription}/gi, item.productDescription)
				                 .replace("{productImageUrl}", item.productImageUrl)
				                 .replace("{placeName}", item.placeName)
				                 .replace("{productContent}", item.productContent);
			target.item(index % 2).insertAdjacentHTML("beforeend", resultHTML);
		});
	});

	let requestURL = "http://localhost:8080/api/products?";
	if (categoryId !== undefined) requestURL += "categoryId=" + categoryId + "&";
	if (start !== undefined) requestURL += "start=" + start + "&";

	xhr.open("GET", requestURL);
	xhr.send();
}

// 카테고리 메뉴 클릭 이벤트 핸들러
function clickCategoryMenu(e) {
	let activedMenu = document.querySelector(".event_tab_lst > .item > .active");
	let clickedMenu = e.target.parentElement;

	if (e.target.tagName === "SPAN" && activedMenu !== clickedMenu) {
		let categoryId = clickedMenu.parentElement.getAttribute("data-category");
		activedMenu.classList.remove("active");
		clickedMenu.classList.add("active");
		document.querySelector(".more > .btn").style.visibility = "visible";
		clearProducts();
		getProducts(categoryId, 0);
	}
}

// 더보기 버튼 클릭 이벤트 핸들러
function clickMoreBtn(e) {
	let categoryId = document.querySelector(".event_tab_lst > .item > .active")
		                     .parentElement.getAttribute("data-category");

	let eventBoxes = document.querySelectorAll(".lst_event_box");
	let start = eventBoxes.item(0).childElementCount + eventBoxes.item(1).childElementCount;

	getProducts(categoryId, start);
}

// Product 리스트 지우는 함수
function clearProducts() {
	let target = document.querySelectorAll(".lst_event_box");
	let leftColumn = target.item(0);
	let rightColumn = target.item(1);

	while(leftColumn.hasChildNodes())
		leftColumn.removeChild(leftColumn.firstChild);

	while (rightColumn.hasChildNodes())
		rightColumn.removeChild(rightColumn.firstChild);
}

// Main
document.addEventListener("DOMContentLoaded", function() {
	// 초기 데이터 수신
	getPromotions();
	getCategories();
	getProducts();

	// 카테고리 메뉴 이벤트 설정
	let categoryMenu = document.querySelector(".event_tab_lst");
	categoryMenu.addEventListener("click", clickCategoryMenu);

	// 더보기 버튼 이벤트 설정
	let moreBtn = document.querySelector(".more > .btn");
	moreBtn.addEventListener("click", clickMoreBtn);
});

// 프로모션 영역 슬라이드 기능
window.addEventListener('load', function() {
	cloneItem();

	let promotionItems = document.querySelectorAll(".visual_img > .item");
	let len = promotionItems.length;
	let count = 0;

	setInterval(function() {
		count++;
		let xPos = count % len * 100;
		for (let i = 0; i < len; i++) {
			promotionItems.item(i).style.transition = "1s";
			promotionItems.item(i).style.transform = "translateX(-" + xPos + "%)";
		}
		if (count % len === len - 1) {
			controlEndImg(promotionItems, len);
			count++;
		}
	}, 4000);
});

// 슬라이드를 부드럽게 처리하기 위해 복제요소를 추가하는 함수
function cloneItem() {
	let firstItem = document.querySelector(".visual_img > .item:first-child");
	firstItem.parentElement.appendChild(firstItem.cloneNode(true));
}

// 프로모션 슬라이드 마지막 이미지 자연스럽게 처리하는 함수
function controlEndImg(promotionItems, len) {
	setTimeout(function() {
		for (let i = 0; i < len; i++) {
			promotionItems.item(i).style.transition = "0s";
			promotionItems.item(i).style.transform = "translateX(0%)";
		}
	}, 1000);
}