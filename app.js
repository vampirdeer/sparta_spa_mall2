const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
//api 연결하기
app.use("/", require("./routes"));

//콘솔로그에 찍기
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});

const connect = require("./schemas");
connect();
