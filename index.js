import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import usersRouter from './routes/usersRouter.js'
import operationsRouter from './routes/operationsRouter.js'

const app = express();

app.use(express.json());

dotenv.config()

connectDB()



app.use('/', usersRouter)

app.use('/', operationsRouter)



const PORT = process.env.PORT || 4000


app.listen(PORT, () => {

    console.log("Hello")

})