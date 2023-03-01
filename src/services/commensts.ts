import {Comments} from '../db/repositories'
import { CreateCommentsForm } from '../interfaces/comment';

class CommentService {
  findAllComment = async (myhomeId: number) => {
    const allComment = await Comments.findAllComment(myhomeId);
    return allComment;
  };

  createComment = async (createForm: CreateCommentsForm) => {
    await Comments.createComment(createForm);
  };

  updateComment = async (commentId: number, comment: string) => {
    const updateCommentData = await Comments.updateComment(commentId, comment);
    return updateCommentData;
  };

  deleteComment = async (commentId: number, userId: number) => {
    const deleteCommentData = await Comments.deleteComment(commentId, userId);
    return deleteCommentData;
  };

  findByComment = async (commentId: number) => {
    return await Comments.findByComment(commentId);
  };
}

export default new CommentService();
