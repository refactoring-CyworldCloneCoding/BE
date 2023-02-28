import { Router } from 'express';
import { Users } from '../controllers';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/signup', auth.tokenChecker, Users.signup);
router.post('/login', auth.tokenChecker, Users.login);
router.post('/emailcheck', Users.emailCheck);
router.get('/surfing', Users.surfing);
router.get('/:myhomeId', Users.myhome);
router.put('/:myhomeId', auth.authMiddleware, Users.intro);
// router.get('/dotori/:userId', Users.getDotori);
// router.put('/dotori', auth, Users.chargeDotori);
// router.post('/',Users.chargeCoupons)


export default router;
