const commentService = require("../services/comment.service");

const addComment = async (req, res) => {
  try {
    const { photo_id, content } = req.body;

    if (!photo_id || !content) {
      return res.status(400).json({
        success: false,
        message: "Thiếu photo_id hoặc nội dung bình luận",
      });
    }

    const newComment = await commentService.createComment(photo_id, content);

    return res.status(201).json({
      success: true,
      message: "Đã thêm bình luận",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await commentService.deleteComment(id);
    return res.status(200).json({
      success: true,
      message: "Đã xóa bình luận",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addComment, deleteComment };
