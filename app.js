import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db/mysql.js';

/** router */
import userRouter from './router/userRouter.js';
import theaterRouter from './router/theaterRouter.js';
import screenRouter from './router/screenRouter.js';
import seatRouter from './router/seatRouter.js';
import movieRouter from './router/movieRouter.js';
import bookingRouter from './router/bookingRouter.js';
import paymentRouter from './router/paymentRouter.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use(userRouter);
app.use(theaterRouter);
app.use(screenRouter);
app.use(seatRouter);
app.use(movieRouter);
app.use(bookingRouter);
app.use(paymentRouter);

sequelize.sync()
  .then(() => {
    console.log('connection established sucessfully');
  })
  .catch((e) => {
    console.log(e);
  });
sequelize.authenticate()
  .then(() => {
    console.log('connection established sucessfully');
  })
  .catch((err) => {
    console.log('error', err);
  });
app.listen(process.env.PORT, () => {
  console.log(`port listned at ${process.env.PORT}`);
});
