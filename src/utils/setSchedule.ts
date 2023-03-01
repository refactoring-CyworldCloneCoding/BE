// import schedule from 'node-schedule';
// const { Users } = require('../models');
// const logger = require('../util/logger');

// module.exports = {
//   myHomeCountSchedule: async () => {
//     try {
//       schedule.scheduleJob('*/1 * * * *', async () => {
//         // const allUsers = await Users.findAll();
//         // const userIds = allUsers.map((ids) => ids.userId);

//         await Users.update(
//           { today: 0 },
//           {
//             where: {},
//           }
//         );
//       });
//     } catch (err) {
//       logger.error(err);
//     }
//   },
// };
