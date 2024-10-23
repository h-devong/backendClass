import express from "express";

const app = express;

app.get("/stocks", (req, res) => {
  res.send("주식가격 조회");
});

app.get("/stocks/max", (req, res) => {
  res.send("주식최대가격 조회");
});

app.post("/stocks", (req, res) => {
  res.send("주식가격 등록");
});

app.listen(3002);
