package me.depther.service.impl;

import me.depther.model.Comment;
import me.depther.model.DisplayInfoResponse;
import me.depther.model.ProductResponse;
import me.depther.repository.ProductsRepository;
import me.depther.service.ProductsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductsServiceImpl implements ProductsService {

	@Autowired
	private ProductsRepository productsRepository;

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Override
	public ProductResponse getProducts(int categoryId, int start) throws Exception {
		ProductResponse response = new ProductResponse();
		if (categoryId != 0) {
			response.setTotalCount(productsRepository.selectPartCount(categoryId));
			response.setItems(productsRepository.selectPartList(categoryId, start));
		} else {
			response.setTotalCount(productsRepository.selectAllCount());
			response.setItems(productsRepository.selectAllList(start));
		}
		return response;
	}

	@Override
	public DisplayInfoResponse getProductDetail(int displayInfoId) throws Exception {
		DisplayInfoResponse response = new DisplayInfoResponse();
		response.setDisplayInfo(productsRepository.selectDisplayInfo(displayInfoId));
		response.setProductImages(productsRepository.selectProductImages(displayInfoId));
		response.setDisplayInfoImage(productsRepository.selectDisplayInfoImage(displayInfoId));
		response.setComments(productsRepository.selectComments(displayInfoId));
		/*
			Q. Comment 한 건마다 관련 이미지를 DB에서 가져오는 방식은 오버헤드가 클텐데 다른 방법은 없을까요?
			제가 생각한 다른 방법은 쿼리 한번으로 관련된 commentImages 데이터를 전부 가져온 후
			매칭되는 Comment 객체에 하나씩 매칭시키는 방식인데 이 방식은 O(n^2) 시간복잡도를 가질 것 같아서
			오히려 더 비효율적일 수 있겠다는 생각이 드네요.
			좋은 방법이 있으면 코멘트 부탁드립니다.
		*/
		for (Comment e : response.getComments()) {
			e.setCommentImages(productsRepository.selectCommentImages(e.getCommentId()));
		}

		/*
			Q. 중간중간 아래와 같이 try catct로 예외처리를 하게되면 코드의 가독성이 안좋아지는 것 같습니다.
			그렇다고 메소드 전체를 try catch로 묶자니 예외처리가 필요없는 부분도 try catch문에 포함됨으로써
			성능 저하가 우려됩니다.
			리뷰어님께서는 어떤 방법으로 예외처리를 하시는지 팁을 주시면 감사하겠습니다.
		*/
		try {
			response.setAverageScore(productsRepository.selectAvgScore(displayInfoId));
		} catch (NullPointerException e) {
			response.setAverageScore(0);
			logger.debug("Exception: NoAvgScoreException occurred!");
		}
		response.setProductPrices(productsRepository.selectProductPrices(displayInfoId));
		return response;
	}

}