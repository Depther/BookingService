// 서버에 요청 전달을 위한 클래스
function DataRequest() {
	this.methodType = "GET";
	this.requestURI = "/api/products/";
	this.displayInfoId = 0;
}

// 전체적인 처리를 진행하는 메소드
DataRequest.prototype.executeProcess = function() {
	this.getAPIParam();
	this.callSendRequest();
};

// 파라미터를 가져오는 메소드
DataRequest.prototype.getAPIParam = function() {
	const regExp = /[a-zA-Z]+\/([0-9]+)/;
	const targetIdx = 1;
	this.displayInfoId = regExp.exec(window.location.pathname)[targetIdx];
};

// RequestSender에게 필요한 정보를 전달하고 서버에 요청을 위임하는 메소드
DataRequest.prototype.callSendRequest = function() {
	const requestSender = new RequestSender(this, this.methodType, this.requestURI + this.displayInfoId, null, this.responseHandler);
	requestSender.sendRequest();
};

// 서버에서 온 응답을 처리하는 메소드
DataRequest.prototype.responseHandler = function(xhr, client) {
	const response = JSON.parse(xhr.responseText);
	new TopMenu(response).executeProcess();
	new ProductDeatil(response).executeProcess();
	new Reservation(response).executeProcess();
};

// 화면 상단 메뉴바와 이미지에 대한 처리를 담당하는 클래스
function TopMenu(response) {
	this.response = response;
}

// 전체적인 처리를 진행하는 메소드
TopMenu.prototype.executeProcess = function() {
	this.setBackBtn();
	this.setTitle();
	this.setMainImage();
};

// 뒤로 가기 버튼을 설정하는 메소드
TopMenu.prototype.setBackBtn = function() {
	const backBtn = document.querySelector(".btn_back");
	backBtn.href = "/detail/" + this.response.displayInfo.displayInfoId;
};

// 상단바에 상품명을 출력하는 메소드
TopMenu.prototype.setTitle = function() {
	const title = document.querySelector(".title");
	title.textContent = this.response.displayInfo.productDescription;
};

// 예약하기 페이지의 메인 이미지를 출력하는 메소드
TopMenu.prototype.setMainImage = function() {
	const image = document.querySelector(".img_thumb");
	const title = document.querySelector(".preview_txt_tit");
	const price = document.querySelectorAll(".preview_txt_dsc").item(0);
	let lowestPrice = 0;
	for (let item of this.response.productImages) {
		if (item.saveFileName.includes("ma")) {
			image.src = "/api/download/image/" + item.fileInfoId;
			break;
		}
	}
	title.textContent = this.response.displayInfo.productDescription;
	for (let item of this.response.productPrices) {
		if (lowestPrice === 0) lowestPrice = item.price;
		if (lowestPrice > item.price) {
			lowestPrice = item.price;
		}
	}
	price.textContent = "₩ " + lowestPrice + " ~";
};

// 상품 설명에 대한 처리를 하는 클래스
function ProductDeatil(response) {
	this.response = response;
}

// 전체적인 처리를 진행하는 메소드
ProductDeatil.prototype.executeProcess = function() {
	this.printDescription();
};

// 상품 설명을 출력하는 메소드
ProductDeatil.prototype.printDescription = function() {
	const title = document.querySelector(".in_tit");
	const place = document.querySelectorAll(".dsc")[0];
	title.textContent = this.response.displayInfo.productDescription;
	place.innerHTML = "장소 : " + this.response.displayInfo.placeLot + "<br>" + place.textContent;
};

// 예약 정보와 관련된 처리를 하는 클래스
function Reservation(response) {
	this.response = response;
}

// 전체적인 처리를 진행하는 메소드
Reservation.prototype.executeProcess = function() {
	this.printTicketInfo();
	this.setTicketBtnEventListener();
	this.setInputValueChecker();
	this.setClauseEventListener();
	this.setReserveBtnConditionChecker();
	this.setReserveBtnEventListener();
};

// 티켓 정보를 출력하는 메소드
Reservation.prototype.printTicketInfo = function() {
	const priceTemplate = document.querySelector("#template-price-item").textContent;
	const addLocation = document.querySelector(".ticket_body");
	const priceBindMethod = Handlebars.compile(priceTemplate);
	for (let item of this.response.productPrices) {
		switch(item.priceTypeName) {
			case 'A':
				item.priceTypeName = "성인";
				break;
			case 'Y':
				item.priceTypeName = "청소년";
				break;
			case 'B':
				item.priceTypeName = "유아";
				break;
			case 'S':
				item.priceTypeName = "성인";
				break;
			case 'D':
				item.priceTypeName = "장애인";
				break;
			case 'C':
				item.priceTypeName = "지역주민";
				break;
			case 'E':
				item.priceTypeName = "얼리버드";
				break;
		}
		item.price = Number(item.price).toLocaleString('en');
		const resultHTML = priceBindMethod(item);
		addLocation.insertAdjacentHTML("beforeend", resultHTML);
	}
};

// 티켓 +, - 버튼에 대한 처리를 설정하는 메소드
Reservation.prototype.setTicketBtnEventListener = function() {
	const controllers = document.querySelectorAll(".count_control");
	for (let controller of controllers) {
		controller.addEventListener("click", (e) => {
			if (e.target.tagName !== "A") return;
			e.preventDefault();
			const minusBtn = e.target.parentElement.firstElementChild;
			const plusBtn = e.target.parentElement.lastElementChild;
			const pricePerTicket = e.target.closest(".qty").querySelector(".qty_info_icon > .product_price > .price").textContent.replace(/,/g, "");
			const ticketCount = e.target.parentElement.querySelector(".count_control_input");
			const subPrice = e.target.closest(".count_control").querySelector(".individual_price > .total_price");
			const totalCount = document.querySelector("#totalCount");
			const totalPrice = document.querySelector("#totalPrice");
			if (e.target.classList.contains("ico_plus3")) {
				if (ticketCount.value === "0") {
					ticketCount.classList.remove("disabled");
					minusBtn.classList.remove("disabled");
				}
				ticketCount.setAttribute("value", Number.parseInt(ticketCount.value) + 1);
				totalCount.textContent = Number.parseInt(totalCount.textContent) + 1;
				totalPrice.textContent = Number.parseInt(totalPrice.textContent) + Number.parseInt(pricePerTicket);
			} else {
				if (ticketCount.value === "1") {
					ticketCount.classList.add("disabled");
					minusBtn.classList.add("disabled");
				}
				ticketCount.setAttribute("value", Number.parseInt(ticketCount.value) - 1);
				totalCount.textContent = Number.parseInt(totalCount.textContent) - 1;
				totalPrice.textContent = Number.parseInt(totalPrice.textContent) - Number.parseInt(pricePerTicket);
			}
			subPrice.textContent = Number.parseInt(ticketCount.value) * Number.parseInt(pricePerTicket);
		});
	}
};

// 사용자 입력값에 대한 Validation 체크를 설정하는 메소드
Reservation.prototype.setInputValueChecker = function() {
	const NAME_REGEXP = /[a-zA-Z0-9]|[ \[\]{}()<>?|`~!@#$%^&*\-_+=,.;:\"'\\]/g;
	const TEL_REGEXP = /^\d{3}-\d{3,4}-\d{4}$/;
	const NO_DASH_TEL_REGEXP = /^\d{3}\d{3,4}\d{4}$/;
	const EMAIL_REGEXP = /^[a-zA-Z0-9\.]{1,30}@[a-zA-Z]+\.(([a-zA-Z]+\.[a-zA-Z]+)|([a-zA-Z]+))$/;
	const name = document.querySelector("#name");
	const tel = document.querySelector("#tel");
	const email = document.querySelector("#email");
	const warning = document.querySelectorAll(".warning_msg");
	name.addEventListener("focusout", () => {
		if (name.value.search(NAME_REGEXP) !== -1 || name.value.length <= 0) {
			name.nextElementSibling.classList.add("active");
		} else {
			name.nextElementSibling.classList.remove("active");
		}
	});
	tel.addEventListener("focusout", () => {
		if (NO_DASH_TEL_REGEXP.test(tel.value)) {
			if (tel.value.length == 10) {
				tel.value = tel.value.substr(0, 3) + "-" + tel.value.substr(3, 3) + "-" + tel.value.substr(6, 4);
			} else if (tel.value.length == 11) {
				tel.value = tel.value.substr(0, 3) + "-" + tel.value.substr(3, 4) + "-" + tel.value.substr(7, 4);
			}
		}
		if (!TEL_REGEXP.test(tel.value)) {
			tel.nextElementSibling.classList.add("active");
		} else {
			tel.nextElementSibling.classList.remove("active");
		}
	});
	email.addEventListener("focusout", () => {
		if (!EMAIL_REGEXP.test(email.value)) {
			email.nextElementSibling.classList.add("active");
		} else {
			email.nextElementSibling.classList.remove("active");
		}
	});
	for (let elem of warning) {
		elem.addEventListener("click", () => {
			elem.classList.remove("active");
			elem.previousElementSibling.focus();
		});
	}
};

// 이용자 약관과 관련된 이벤트 리스너 설정 메소드
Reservation.prototype.setClauseEventListener = function() {
	const items = document.querySelectorAll(".btn_agreement");
	for (let item of items) {
		item.addEventListener("click", (e) => {
			e.preventDefault();
			item.closest(".agreement").classList.toggle("open");
			item.lastElementChild.classList.toggle("fn-down2");
			item.lastElementChild.classList.toggle("fn-up2");
			item.firstElementChild.textContent = item.firstElementChild.textContent === "보기" ? "접기" : "보기";
		});
	}
};

// 예약하기 버튼의 활성화 조건을 체크하고 활성화, 비활성화를 처리하는 메소드
Reservation.prototype.setReserveBtnConditionChecker = function() {
	const items = document.querySelectorAll("#name, #tel, #email, #chk3, .count_control");
	const name = document.querySelector("#name");
	const tel = document.querySelector("#tel");
	const email = document.querySelector("#email");
	const count = document.querySelector("#totalCount");
	const chk = document.querySelector("#chk3");
	const reserveBtn = document.querySelector(".bk_btn_wrap");
	for (let item of items) {
		let type = "focusout";
		if (item.type === "checkbox") type = "change";
		if (item.tagName === "DIV") type = "click";
		item.addEventListener(type, () => {
			setTimeout(() => {
				if (name.value === "" || name.nextElementSibling.classList.contains("active") ||
					tel.value === "" || tel.nextElementSibling.classList.contains("active") ||
					email.value === "" || email.nextElementSibling.classList.contains("active") ||
					Number.parseInt(count.textContent) === 0 ||
					!chk.checked) {
					reserveBtn.classList.add("disable");
					return;
				}
				reserveBtn.classList.remove("disable");
			}, 0);
		});
	}
};

// 예약하기 버튼 클릭 이벤트 리스너 설정 메소드
Reservation.prototype.setReserveBtnEventListener = function() {
	const bookingBtn = document.querySelector(".bk_btn");
	bookingBtn.addEventListener("click", () => {
		if (confirm("예약하시겠습니까?")) {
			const bookingRequest = new BookingRequest(this.response);
			bookingRequest.sendBookingRequest();
		}
	});
};

// 서버에 예약 정보를 전송하는 클래스
function BookingRequest(response) {
	this.method = "POST";
	this.uri = "/api/reservations";
	this.displayInfoId = response.displayInfo.displayInfoId;
	this.productId = response.displayInfo.productId;
	this.reservationEmail = document.querySelector("#email").value;
	this.reservationName = document.querySelector("#name").value;
	this.reservationTelephone = document.querySelector("#tel").value;
	this.reservationYearMonthDay = DateFormatter.makeDateString(new Date());
}

// 예약 정보 서버로 전송
BookingRequest.prototype.sendBookingRequest = function() {
	const requestSender = new RequestSender(this, this.method, this.uri, {
		displayInfoId: this.displayInfoId,
		productId: this.productId,
		reservationEmail: this.reservationEmail,
		reservationName: this.reservationName,
		reservationTelephone: this.reservationTelephone,
		reservationYearMonthDay: this.reservationYearMonthDay,
		prices: this.getReservationPrice()
	}, this.responseHandler);
	requestSender.sendRequest();
};

// 예약 가격 정보를 가져오는 메소드
BookingRequest.prototype.getReservationPrice = function() {
	const result = [];
	const items = document.querySelectorAll(".qty");
	for (let item of items) {
		const controller = item.querySelector(".count_control_input");
		const count = controller.value;
		const productPriceId = controller.getAttribute("productPriceId");
		const reservationPrice = {
			count: count,
			productPriceId: productPriceId
		};
		result.push(reservationPrice);
	}
	return result;
};

// 수신한 응답을 처리하는 콜백 메소드
BookingRequest.prototype.responseHandler = function(xhr, client) {
	const response = JSON.parse(xhr.responseText);
	if (!response.reservationInfoId) {
		alert("예매에 실패하였습니다. 다시 시도해주세요.");
		return;
	}
	alert("예매가 완료되었습니다.");
	window.location.href = "/";
};

// 메인 함수
document.addEventListener("DOMContentLoaded", () => {
	new DataRequest().executeProcess();
});