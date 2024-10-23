export class CouponController {
  cashService;
  constructor(cashService) {
    this.cashService = cashService;
  }

  buyCoupon = (req, res) => {
    // 1. 돈 검증
    const hasMoney = this.cashService.checkValue();
    // 2. 쿠폰구매 코드
    if (hasMoney) {
      res.send('쿠폰 구매 완료!!');
    }
  };
}
