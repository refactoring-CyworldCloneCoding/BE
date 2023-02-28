import { Request, Response, NextFunction } from 'express';
import { Comments } from '../../services';

class CommentsController {
  getComment = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const comments = await Comments.findAllComment(userId);
    res.status(200).json({ data: comments });
  };

  createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { diaryId, userId } = req.params;
    const { name } = res.locals.user;
    console.log(name);
    const { comment } = req.body;

    const createCommentData = await Comments.createComment(
      diaryId,
      userId,
      name,
      comment
    );
    res.status(200).json({ data: createCommentData });
  };

  updataComment = async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    const { comment } = req.body;
    try {
      const isWriter = await Comments.findByComment(commentId);

      if (userId !== isWriter.userId) {
        throw new Error('수정 권한이 없습니다.');
      }
      const updateCommentData = await Comments.updateComment(
        commentId,
        comment
      );
      res.status(200).json({ data: updateCommentData });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };

  deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    try {
      const isWriter = await Comments.findByComment(commentId);

      if (userId !== isWriter.userId) {
        throw new Error('삭제 권한이 없습니다.');
      }
      const deleteCommentData = await Comments.deleteComment(
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
