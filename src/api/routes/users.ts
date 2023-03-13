import { Router } from 'express';
import { Users } from '../controllers';
import auth from '../../middlewares/auth';
import * as test from '../../db/models';
import { isLoggedIn, isNotLoggedIn } from '../../middlewares/testMiddleware';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await test.Users.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/signup', isNotLoggedIn, Users.signup);
router.post('/login', isNotLoggedIn, Users.login);
router.get('/logout',isLoggedIn, Users.logout);
router.post('/emailcheck', Users.emailCheck);
router.get('/surfing', Users.surfing);
router.get('/:myhomeId', Users.myhome);
router.put('/:myhomeId', auth.authMiddleware, Users.intro);
// router.get('/dotori/:userId', Users.getDotori);
// router.put('/dotori', auth, Users.chargeDotori);
// router.post('/',Users.chargeCoupons)

export default router;
