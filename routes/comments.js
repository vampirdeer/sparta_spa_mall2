const express = require("express");
const router = express.Router();
const comment = require("../schemas/comment");
const Post = require("../schemas/post");

//댓글 생성
router.post("/:_postId", async (req, res) => {
  try {
    const { _postId } = req.params;
    const posting = await Post.findOne({ _id: _postId });
    const { content } = req.body;

    if (posting === null) {
      return res.status(400).json({ message: "게시글을 찾을 수 없습니다." });
    }
    if (content.length === 0) {
      return res.status(400).json({ message: "댓글을 내용을 입력해주세요." });
    }

    await comment.create({
      user: req.body.user,
      password: req.body.password,
      content: req.body.content,
    });

    return res.status(201).json({ message: "댓글을 생성하였습니다." });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

//댓글 목록 조회
router.get("/:_postId", async (req, res) => {
  try {
    const commenting = await comment.find();
    const resules = commenting.map((comments) => {
      return {
        commentId: comments._id,
        user: comments.user,
        content: comments.content,
        createdAt: comments.createdAt,
      };
    });
    res.json({
      data: resules,
    });
  } catch (error) {
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});
//댓글 수정
router.put("/:_commentId", async (req, res) => {
  try {
    const { _commentId } = req.params;

    const { password, content } = req.body;

    const commenting = await comment.findOne({ _id: _commentId });
    if (commenting.password !== password) {
      return res
        .status(404)
        .json({ message: "비밀번호 조회에 실패하였습니다." });
    }

    if (commenting === null) {
      return res.status(404).json({ message: "댓글 조회에 실패하였습니다." });
    }
    if (content.length === 0) {
      return res.status(400).json({ message: "댓글을 내용을 입력해주세요." });
    }

    await comment.updateOne(
      { _id: _commentId },
      { $set: { password, content } }
    );
    return res.status(200).json({ message: "댓글을 수정하였습니다." });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

//댓글 삭제
router.delete("/:_commentId", async (req, res) => {
  try {
    const { _commentId } = req.params;

    const { password } = req.body;

    const commenting = await comment.findOne({ _id: _commentId });
    if (commenting === null) {
      return res.status(404).json({ message: "댓글 조회에 실패하였습니다." });
    }
    await comment.deleteOne({ _id: _commentId }, { $set: { password } });
    return res.status(200).json({ message: "댓글을 삭제하였습니다." });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});
module.exports = router;
