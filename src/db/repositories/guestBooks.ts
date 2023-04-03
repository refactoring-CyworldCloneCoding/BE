import { GuestBooksCreateForm } from '../../interfaces/guestbook';
import { Guestbooks } from '../entities';

class GuestBooksRepository {
  createBook = async (createForm: GuestBooksCreateForm) => {
    const createInfo = Guestbooks.create({ ...createForm });
    await Guestbooks.save(createInfo);
  };

  // 방명록 조회시 guestbookId 기준 내림차순으로 조회
  getBooks = async (myhomeId: number) => {
    return await Guestbooks.find({
      where: { myhomeId },
      // order: [['guestbookId', 'desc']],
    });
  };

  findByGuestBook = async (guestbookId: number) => {
    return await Guestbooks.findOne({ where: { guestbookId } });
  };

  updateBook = async (guestbook: string, guestbookId: number) => {
    const guestbookInfo = await Guestbooks.findOne({ where: { guestbookId } });
    guestbookInfo.guestBook = guestbook;
    await Guestbooks.save(guestbookInfo);
    // await Guestbooks.update(
    //   { guestBook: guestbook },
    //   { where: { guestbookId } }
    // );
  };

  deleteBook = async (guestbookId: number) => {
    await Guestbooks.delete(guestbookId);
  };

  // findByUser = async (userId) => {
  //   return Users.findByPk(userId);
  // };
}

export default new GuestBooksRepository();
