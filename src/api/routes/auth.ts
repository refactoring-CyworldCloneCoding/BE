// import { Router, Request, Response, NextFunction } from 'express';
// import jwt from '../../utils/jwt';
// import passport from 'passport';
// import { Users } from '../../db/models';
// import { isLoggedIn, isNotLoggedIn } from 'src/middlewares/testMiddleware';
// import bcrypt from 'bcrypt';

// const router = Router();

// router.post('/join', isNotLoggedIn, async (req, res, next) => {
//   const { email, name, password } = req.body; 

//   try {
//     const exUser = await Users.findOne({ where: { email } });
//     if (exUser) return res.redirect('/join?error=exist');

//     const hash = await bcrypt.hash(password, 12);

//     const userInfo = Users.create({
//       email,
//       name,
//       password: hash,
//     });

//     await Users.save(userInfo);

//     return res.redirect('/');
//   } catch (error) {
//     console.error(error);
//     return next(error);
//   }
// });

// router.post('/login', isNotLoggedIn, (req, res, next) => {
//   passport.authenticate('local', (authError, user, info) => {
//     if (authError) {
//       console.error(authError);
//       return next(authError); 
//     }
//     if (!user) return res.redirect(`/?loginError=${info.message}`);

//     return req.login(user, (loginError) => {
//       if (loginError) {
//         console.error(loginError);
//         return next(loginError);
//       }
//       return res.redirect('/');
//     });
//   })(req, res, next); 
// });

// router.get('/logout', isLoggedIn, (req, res) => {
//   // req.logout();
//   // req.session.destroy();
//   res.redirect('/');
// });

// export default router;
