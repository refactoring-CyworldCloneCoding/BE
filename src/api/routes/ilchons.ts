import { Router } from 'express';
import { Ilchons } from '../controllers';
import auth from '../../middlewares/auth';

const router = Router();


router.post('/ilchons', auth.isNotLoggedIn, Ilchons.ask);
router.get('/ilchons/:userId', Ilchons.getList);
router.put('/ilchons/:ilchonId', auth.isNotLoggedIn, Ilchons.outcome);
router.delete('/ilchons/:ilchonId', auth.isNotLoggedIn, Ilchons.deleteIlchon);

export default router;
