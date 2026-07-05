import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db';
import budgetRouter from './router/budgetRouter';

async function connectDb() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue.bold('Conexión exitosa a la DB'));
  } catch (error) {
    console.log( colors.red.bold('Falló la conexión a la BD'));
  }
}
connectDb();
const app = express()

app.use(morgan('dev'))

app.use('/api/budgets', budgetRouter);

app.use(express.json())



export default app