// routes/posts.js
const express = require("express");
const router = express.Router();
const post = require("../schemas/post");

//게시글작성
router.post("/", async (req, res) => {
  try {
    await post.create({
      title: req.body.title,
      user: req.body.user,
      password: req.body.password,
      content: req.body.content,
    });
    res.status(201).json({ message: "게시글을 생성하였습니다." });
  } catch (error) {
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

//게시글 조회
router.get("/", async (req, res) => {
  try {
    const posting = await post.find();
    const resules = posting.map((posts) => {
      return {
        postId: posts._id,
        user: posts.user,
        title: posts.title,
        createdAt: posts.createdAt,
      };
    });
    res.json({
      data: resules,
    });
  } catch (error) {
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

//게시글 상세 조회

router.get("/:_postsId", async (req, res) => {
  try {
    const { _postsId } = req.params;
    const existPosts = await post.findOne({ _id: _postsId });

    const result = {
      postsId: existPosts._id,
      user: existPosts.user,
      title: existPosts.title,
      content: existPosts.content,
      createdAt: existPosts.createdAt,
    };

    res.json({ data: result });
  } catch (error) {
    res.status(400).send({ message: "게시글 조회에 실패하였습니다." });
  }
});

//게시글 수정
router.put("/:_postsId", async (req, res) => {
  try {
    const { _postsId } = req.params;

    const { password, title, content } = req.body;

    const existsposts = await post.findOne({ _id: _postsId });
    if (existsposts === null) {
      return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
    }
    await post.updateOne(
      { _id: _postsId },
      { $set: { password, title, content } }
    );
    return res.status(200).json({ message: "게시글을 수정하였습니다." });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

//게시글 삭제
router.delete("/:_postsId", async (req, res) => {
  try {
    const { _postsId } = req.params;

    const { password } = req.body;

    const existsposts = await post.findOne({ _id: _postsId });
    if (existsposts === null) {
      return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
    }
    await post.deleteOne({ _id: _postsId }, { $set: { password } });
    return res.status(200).json({ message: "게시글을 삭제하였습니다." });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

// localhost:3000/api/ GET
router.get("/", (req, res) => {
  res.send("default url for post.js GET Method");
});

// localhost:3000/api/about GET
router.get("/about", (req, res) => {
  res.send("post.js about PATH");
});

module.exports = router;
