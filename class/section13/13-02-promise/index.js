const fetchDate = async () => {
  //axios 가정
  const result = await new Promise((성공함수, 실패함수) => {
    setTimeout(() => {
      try {
        console.log("이미지 받아옴"); //5초뒤에 이미지 받아옴
        성공함수("png");
      } catch (error) {
        실패함수("failed");
      }
    }, 5000);
  });
  console.log(result);
  console.log("받아온 강아지 사진 브라우저에 전달");
};

fetchDate();
