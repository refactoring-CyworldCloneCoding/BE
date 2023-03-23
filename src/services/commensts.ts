import { Request, Response } from 'express';
import { Comments as CommentsType } from '../db/entities';
import { Comments, Diaries, Myhomes } from '../db/repositories';
import { CreateCommentsForm } from '../interfaces/comment';
import datetime from '../utils/datetime';

class CommentService {
  findAllComment = async (myhomeId: number, diaryId: number) => {
    const findComment = await Comments.findAllComment(myhomeId, diaryId);
    findComment.map((comment:CommentsType) => {
          comment.createdAt = datetime.createDatetime(comment.createdAt);
          comment.updatedAt = datetime.createDatetime(comment.updatedAt);
    })
    return findComment;
  };

  createComment = async (req: Request, res: Response) => {
    const { diaryId, myhomeId } = req.params;
    const { userId, name } = res.app.locals.user;
    const { comment } = req.body;

    if (!comment) throw new Error('댓글을 작성해주세요.');

    const myhome = await Myhomes.findByMyhome(+myhomeId);
    const diary = await Diaries.findOneDiary(+diaryId);
    if (!myhome || !diary) throw new Error('잘못된 요청입니다.');

    const createForm: CreateCommentsForm = {
      userId,
      diaryId: +diaryId,
      myhomeId: +myhomeId,
      name,
      comment,
    };

    await Comments.createComment(createForm);
  };

  updateComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { userId } = res.app.locals.user;
    const { comment } = req.body;
    if (!comment) throw new Error('댓글을 작성해주세요.');

    const comments = await Comments.findByComment(+commentId);
    if (!comments) throw new Error('잘못된 요청입니다.');

    if (userId !== comments!.userId) throw new Error('수정 권한이 없습니다.');
    await Comments.updateComment(+commentId, comment);
  };

  deleteComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { userId } = res.app.locals.user;
    const comments = await Comments.findByComment(+commentId);
    if (!comments) throw new Error('잘못된 요청입니다.');

    if (userId !== comments!.userId) throw new Error('삭제 권한이 없습니다.');
    await Comments.deleteComment(+commentId, +userId);
  };

  findByComment = async (commentId: number) => {
    return await Comments.findByComment(commentId);
  };
}

export default new CommentService();
