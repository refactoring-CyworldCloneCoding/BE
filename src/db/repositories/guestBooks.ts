import { GuestBooksCreateForm } from '../../interfaces/guestbook';
import { Guestbooks } from '../models';

class GuestBooksRepository {
  createBook = async (CreateForm: GuestBooksCreateForm) => {
    await Guestbooks.create(CreateForm);
  };

  // 방명록 조회시 guestbookId 기준 내림차순으로 조회
  getBooks = async (myhomeId: number) => {
    return await Guestbooks.findAll({
      where: { myhomeId },
      // order: [['guestbookId', 'desc']],
    });
  };

  findByGuestBook = async (guestbookId: number) => {
    return await Guestbooks.findByPk(guestbookId);
  };

  updateBook = async (guestbook: string, guestbookId: number) => {
    await Guestbooks.update(
      { guestBook: guestbook },
      { where: { guestbookId } }
    );
  };

  deleteBook = async (guestbookId: number) => {
    await Guestbooks.destroy({
      where: { guestbookId },
    });
  };

  // findByUser = async (userId) => {
  //   return Users.findByPk(userId);
  // };
}

export default new GuestBooksRepository();
