const CommentService = require('../services/commensts.services');

class CommentsController {
  Comments = new CommentService();

  getComment = async (req, res) => {
    const { userId } = req.params;
    const comments = await this.Comments.findAllComment(userId);
    res.status(200).json({ data: comments });
  };

  createComment = async (req, res) => {
    const { diaryId, userId } = req.params;
    const { name } = res.locals.user;
    console.log(name);
    const { comment } = req.body;

    const createCommentData = await this.Comments.createComment(
      diaryId,
      userId,
      name,
      comment
    );
    res.status(200).json({ data: createCommentData });
  };

  updataComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    const { comment } = req.body;
    try {
      const isWriter = await this.Comments.findByComment(commentId);

      if (userId !== isWriter.userId) {
        throw new Error('수정 권한이 없습니다.');
      }
      const updateCommentData = await this.Comments.updateComment(
        commentId,
        comment
      );
      res.status(200).json({ data: updateCommentData });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };

  deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    try {
      const isWriter = await this.Comments.findByComment(commentId);

      if (userId !== isWriter.userId) {
        throw new Error('삭제 권한이 없습니다.');
      }
      const deleteCommentData = await this.Comments.deleteComment(
        commentId,
        userId
      );
      res.status(200).json({ msg: '삭제되었습니다.', data: deleteCommentData });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };
}

export default new CommentsController();
