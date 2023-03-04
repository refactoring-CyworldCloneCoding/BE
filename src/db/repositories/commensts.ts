import { CreateCommentsForm } from '../../interfaces/comment';
import { Comments } from '../models';

class CommentRepository {
  findAllComment = async (myhomeId: number, diaryId: number) => {
    return await Comments.findAll(
      { where: { myhomeId, diaryId } }
      //{ order: [['createdAt', 'DESC']] }
    );
  };

  createComment = async (createForm: CreateCommentsForm) => {
    await Comments.create(createForm);
  };

  updateComment = async (commentId: number, comment: string) => {
    await Comments.update({ comment }, { where: { commentId } });
  };

  deleteComment = async (commentId: number, userId: number) => {
    await Comments.destroy({
      where: { commentId, userId },
    });
  };

  findByComment = async (commentId: number) => {
    return await Comments.findByPk(commentId);
  };
}

export default new CommentRepository();
