import { Request, Response, NextFunction } from 'express';
import { Comments } from '../../services';

class CommentsController {
  getComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { myhomeId, diaryId } = req.params;
      const comments = await Comments.findAllComment(+myhomeId, +diaryId);
      res.status(200).json({ data: comments });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };

  createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Comments.createComment(req, res);
      res.status(201).json({ msg: '댓글이 작성되었습니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };

  updataComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Comments.updateComment(req, res);
      res.status(200).json({ msg: '댓글이 수정되었습니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };

  deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      await Comments.deleteComment(req, res);
      res.status(200).json({ msg: '댓글이 삭제되었습니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };
}

export default new CommentsController();
