import { CashService } from './services/cash.service';
export class CouponController {
  buyCoupon = (req, res) => {
    // 1. 돈 검증
    const cashService = new CashService();
    const hasMoney = cashService.checkValue();
    // 2. 쿠폰구매 코드
    if (hasMoney) {
      req.send('쿠폰 구매 완료!!');
    }
  };
}
