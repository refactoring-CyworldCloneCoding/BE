import express from 'express';
import authlogin from '../middlewares/authLoginUserMiddleware';
import auth from '../middlewares/authMiddlewares';
import UsersController from '../controllers/users.mjs';
const usersController = new UsersController();
const router = express.Router();

router.post('/signup', authlogin, usersController.signup);
router.post('/login', authlogin, usersController.login);
router.post('/emailcheck', usersController.emailCheck);
router.get('/surfing', usersController.surfing);
router.get('/myhome/:userId', usersController.myhome);
router.put('/myhome/:userId', auth, usersController.intro);
// router.get('/dotori/:userId', usersController.getDotori);
// router.put('/dotori', auth, usersController.chargeDotori);
// router.post('/',usersController.chargeCoupons)


export default router;
