import { Request, Response } from 'express';
import { GuestBooks, Myhomes } from '../db/repositories';
import { GuestBooksCreateForm } from '../interfaces/guestbook';
import { Guestbooks as GuestBooksModels } from '../db/models';

class GuestBooksService {
  // 방명록 작성
  createBook = async (req: Request, res: Response) => {
    const { guestbook, bookImage } = req.body;
    const { myhomeId } = req.params;
    const { user } = res.locals;

    // 미니홈피의 userId가 없을시 예외처리
    const existUser = await Myhomes.findByMyhome(+myhomeId);
    if (!existUser) throw new Error('미니홈피가 존재하지 않습니다.');

    // 방명록을 입력하지 않거나 3자 이하일 때 예외처리
    if (!guestbook) throw new Error('방명록을 입력해주세요.');
    if (guestbook.length < 3) throw new Error('방명록은 3자이상 입력해주세요.');

    // 본인의 미니홈피 방명록 작성요청시 예외처리
    if (existUser.userId === user.userId)
      throw new Error('내 미니홈피에는 방명록 작성이 불가합니다.');

    const CreateForm: GuestBooksCreateForm = {
      myhomeId: +myhomeId,
      userId: user.userId,
      guestBookNum: 0,
      name: user.name,
      guestBook: guestbook,
      bookImage,
    };

    await GuestBooks.createBook(CreateForm);
  };

  // userId에 해당하는 미니홈피 방명록 목록 조회
  getBooks = async (req: Request, res: Response) => {
    const { myhomeId } = req.params;
    const books: Array<GuestBooksModels> = await GuestBooks.getBooks(+myhomeId);
    // console.log((books[0].dataValues.guestBookId));
    for (let i = 0; i < books.length; i++) {
      books[i].dataValues.guestBookNum = i + 1;
    }

    return books.sort(
      (a, b) => b.dataValues.guestBookNum - a.dataValues.guestBookNum
    );
  };

  // 방명록 수정
  // updateBook = async (req: Request, res: Response) => {
  //   const { userId, guestbookId } = req.params;
  //   const { guestbook } = req.body;
  //   const { user } = res.locals;

  //   // 수정할 방명록을 작성하지 않을 시 예외처리
  //   if (!guestbook) throw new Error('수정할 방명록을 입력해주세요.');

  //   // 수정할 방명록이 없거나 본인이 작성한 방명록이 아닐 시 예외처리
  //   const findGuestBook = GuestBooks.findByGuestBook(
  //     guestbookId
  //   );
  //   if (!findGuestBook) throw new Error('존재하지 않는 방명록입니다.');
  //   if (findGuestBook.writerId !== user.userId)
  //     throw new Error('본인이 작성한 방명록이 아닙니다.');

  //   GuestBooks.updateBook(guestbook, guestbookId);
  // };

  deleteBook = async (req: Request, res: Response) => {
    const { myhomeId, guestbookId } = req.params;
    const { user } = res.locals;

    const findGuestBook = await GuestBooks.findByGuestBook(+guestbookId);

    // 삭제할 방명록이 없거나 본인이 작성한 방명록이 아닐 시 예외처리
    if (!findGuestBook) throw new Error('존재하지 않는 방명록입니다.');
    if (findGuestBook.userId !== user.userId)
      throw new Error('본인이 작성한 방명록이 아닙니다.');

    await GuestBooks.deleteBook(+guestbookId);
  };
}

export default new GuestBooksService();
