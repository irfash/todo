import express from 'express';
import 'dotenv/config'
import pool from "./config/db.js"
import authRoute from './routes/authRoutes.js';
import taskRoute from './routes/taskRoute.js';
import { authenticateToken } from './authtok.js';
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/auth',authRoute);
app.use('/api/tasks',authenticateToken,taskRoute);

app.listen(process.env.PORT,()=>{
	console.log("i am ready --" + process.env.PORT)
});
