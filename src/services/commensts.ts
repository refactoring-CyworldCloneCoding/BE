import {Comments} from '../db/repositories'

class CommentService {
  findAllComment = async (userId) => {
    const allComment = await Comments.findAllComment(userId);
    return allComment;
  };

  createComment = async (diaryId, userId, name, comment) => {
    const createCommentData = await Comments.createComment(
      diaryId,
      userId,
      name,
      comment
    );
    return {
      diaryId: createCommentData.diaryId,
      userId: createCommentData.userId,
      name: createCommentData.name,
      comment: createCommentData.comment,
    };
  };

  updateComment = async (commentId, comment) => {
    const updateCommentData = await Comments.updateComment(
      commentId,
      comment
    );
    return updateCommentData;
  };

  deleteComment = async (commentId, userId) => {
    const deleteCommentData = await Comments.deleteComment(
      commentId,
      userId
    );
    return deleteCommentData;
  };

  findByComment = async (commentId)=>{
    return await Comments.findByComment(commentId)
  }
}

export default new CommentService();
