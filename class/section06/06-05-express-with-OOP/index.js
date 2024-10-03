// const express =  require('express') // 옛날 방식 => commonjs
import express from 'express'; // 요즘 방식 => module
import { CashService } from './cash';
import { ProductService } from './product';

const app = express();
// 상품 구매하기 api
app.post('/products/buy', function (req, res) {
  //1.가진돈 검증하는 코드 (대략 10줄 정도)
  const cashService = new CashService();
  const hasMoney = cashService.checkValue();
  //판매 여부를 검증하는 코드(대략 10줄 정도)
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout();

  // 3. 상품 구매하는 코드
  if (hasMoney && !isSoldout) {
    req.send('상품구매 완료!!');
  }
});
//상품 환불하기 api
app.post('/product/refund', function (req, res) {
  //1. 판매 여부를 검증하는 코드(대략 10줄 정도)
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout();
  //2. 환불하는 코드(10줄)
  if (isSoldout) {
    res.send('상품 환불 완료');
  }
});
app.listen(3000);
