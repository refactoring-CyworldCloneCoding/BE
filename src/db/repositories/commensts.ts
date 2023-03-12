import { CreateCommentsForm } from '../../interfaces/comment';
import { Comments } from '../models';

class CommentRepository {
  findAllComment = async (myhomeId: number, diaryId: number) => {
    return await Comments.find(
      { where: { myhomeId, diaryId } }
      //{ order: [['createdAt', 'DESC']] }
    );
  };

  createComment = async (createForm: CreateCommentsForm) => {
    const commentInfo = Comments.create({
      userId: createForm.userId,
      diaryId: createForm.diaryId,
      myhomeId: createForm.myhomeId,
      name: createForm.name,
      comment: createForm.comment,
    });
    await Comments.save(commentInfo);
  };

  updateComment = async (commentId: number, comment: string) => {
    const findComment = await Comments.findOne({ where: { commentId } });
    findComment.comment = comment;
    await Comments.save(findComment);
    // await Comments.update({ comment }, { where: { commentId } });
  };

  deleteComment = async (commentId: number, userId: number) => {
    await Comments.delete({
      commentId,
      userId,
    });
  };

  findByComment = async (commentId: number) => {
    return await Comments.findOne({ where: { commentId } });
  };
}

export default new CommentRepository();
