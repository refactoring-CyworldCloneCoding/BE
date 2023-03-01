import { Request, Response, NextFunction } from 'express';
import { CreateCommentsForm } from '../../interfaces/comment';
import { Comments } from '../../services';

class CommentsController {
  getComment = async (req: Request, res: Response, next: NextFunction) => {
    const { myhomeId } = req.params;
    const comments = await Comments.findAllComment(+myhomeId);
    res.status(200).json({ data: comments });
  };

  createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { diaryId, myhomeId } = req.params;
    const { userId, name } = res.locals.user;
    const { comment } = req.body;

    const createForm: CreateCommentsForm = {
      userId,
      diaryId: +diaryId,
      myhomeId: +myhomeId,
      name,
      comment,
    };

    await Comments.createComment(createForm);
    res.status(200).json();
  };

  updataComment = async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    const { comment } = req.body;
    try {
      const isWriter = await Comments.findByComment(+commentId);

      if (userId !== isWriter!.userId) {
        throw new Error('수정 권한이 없습니다.');
      }
      const updateCommentData = await Comments.updateComment(
        +commentId,
        comment
      );
      res.status(200).json({ data: updateCommentData });
    } catch (error) {
      res.status(400).json();
    }
  };

  deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    try {
      const isWriter = await Comments.findByComment(+commentId);

      if (userId !== isWriter!.userId) {
        throw new Error('삭제 권한이 없습니다.');
      }
      const deleteCommentData = await Comments.deleteComment(
        +commentId,
        userId
      );
      res.status(200).json({ msg: '삭제되었습니다.', data: deleteCommentData });
    } catch (error) {
      res.status(400).json();
    }
  };
}

export default new CommentsController();
