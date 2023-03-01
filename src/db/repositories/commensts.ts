import { CreateCommentsForm } from '../../interfaces/comment';
import { Comments } from '../models';

class CommentRepository {
  findAllComment = async (myhomeId: number) => {
    const comments = Comments.findAll(
      { where: { myhomeId } }
      //{ order: [['createdAt', 'DESC']] }
    );
    return comments;
  };

  createComment = async (createForm: CreateCommentsForm) => {
    const createCommentData = await Comments.create(createForm);
    return createCommentData;
  };

  updateComment = async (commentId: number, comment: string) => {
    await Comments.update(
      { comment },
      { where: { commentId } }
    );
  };

  deleteComment = async (commentId: number, userId: number) => {
    const deleteCommentData = await Comments.destroy({
      where: { commentId, userId },
    });
    return deleteCommentData;
  };

  findByComment = async (commentId: number) => {
    return await Comments.findByPk(commentId);
  };
}

export default new CommentRepository();
