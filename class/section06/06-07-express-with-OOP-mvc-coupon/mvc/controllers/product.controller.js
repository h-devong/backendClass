import { CashService } from './services/cash.service';
import { ProductService } from './services/product.service';

export class Productcontroller {
  buyProduct = (req, res) => {
    //1.가진돈 검증하는 코드 (대략 10줄 정도)
    const cashService = new CashService();
    const hasMoney = cashService.checkValue();
    //판매 여부를 검증하는 코드(대략 10줄 정도)
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout();

    // 3. 상품 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send('상품구매 완료!!');
    }
  };

  refundProduct = (req, res) => {
    //1. 판매 여부를 검증하는 코드(대략 10줄 정도)
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout();
    //2. 환불하는 코드(10줄)
    if (isSoldout) {
      res.send('상품 환불 완료');
    }
  };
}
