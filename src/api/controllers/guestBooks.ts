import { Request, Response, NextFunction } from 'express';
import { GuestBooks } from '../../services';

class GuestBooksController {
  // 방명록 작성
  createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await GuestBooks.createBook(req, res);
      res.status(200).send({ msg: '방명록이 작성되었습니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };

  // 방명록 목록 조회
  getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await GuestBooks.getBooks(req, res);
      res.status(200).json({ data: result });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };

  // 방명록 수정
  updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await GuestBooks.updateBook(req, res);
      res.status(200).send({ msg: '방명록이 수정되었습니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };

  // 방명록 삭제
  deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await GuestBooks.deleteBook(req, res);
      res.status(200).send({ msg: '방명록이 삭제되었습니다.' });
    } catch (error: any) {
      res.status(400).json({ msg: error.message });
      next(error);
    }
  };
}

export default new GuestBooksController();
