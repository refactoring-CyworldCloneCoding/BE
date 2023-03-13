import { Router } from 'express';
import { Users } from '../controllers';
import auth from '../../middlewares/auth';
import { restrictTo } from '../../middlewares/restrictTo';

const router = Router();

router.get('/', auth.isNotLoggedIn, restrictTo('admin'), Users.getAllUsers);

router.post('/signup', auth.isLoggedIn, Users.signup);
router.post('/login', auth.isLoggedIn, Users.login);
router.get('/refresh', auth.isNotLoggedIn, Users.refreshAccessTokenHandler);
router.get('/logout', auth.isNotLoggedIn, Users.logout);
router.post('/emailcheck', Users.emailCheck);
router.get('/surfing', Users.surfing);
router.get('/:myhomeId', Users.myhome);
router.put('/:myhomeId', auth.isNotLoggedIn, Users.intro);
// router.get('/dotori/:userId', Users.getDotori);
// router.put('/dotori', auth, Users.chargeDotori);
// router.post('/',Users.chargeCoupons)

export default router;
