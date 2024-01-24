import express from 'express';
import 'dotenv/config'
import pool from "./config/db.js"
import authRoute from './routes/authRoutes.js';
import { authenticateToken } from './authtok.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/auth',authRoute);

//get all task by id
app.get('/:user_id/tasks',async(req,res)=>{
	const {user_id} = req.params;
	if(!user_id || isNaN(user_id)){
          return    res.status(400).json({error:'Invalid user Id format'})
	}
	try{
	const response = await pool.query('SELECT * FROM todos WHERE user_id = $1',[user_id])
	res.json(response?.rows);
	}catch(error){
		res.status(500).json({error:'Internal server error'})
	}
})

//create a task
app.post('/:user_id/tasks/addtask',async(req,res)=>{
   const {user_id} = req.params;
   const {title,description} = req.body;
   if(!user_id || !title || !description || isNaN(user_id) ){
        return res.status(400).json({error:"Invalid user data"});
    }
    try {
        const response = await  pool.query('INSERT INTO todos(user_id,title,description) VALUES($1,$2,$3)',[user_id,title,description])
		res.status(201).json({message:"Inserted successfully "})
    } catch (error) {
		res.status(500).json({error:'Internal server error'})
    }
})

//update task by id ---- status / title / description
app.put('/:user_id/tasks/updatetask/:id',async(req,res)=>{
	const {user_id,id} = req.params;
	const {title,description,status} = req.body;
	try {
	if (isNaN(user_id) || isNaN(id)) {
         return res.status(400).json({ error: "Invalid user or task ID" });
      }
	console.log("hi")
	const updates = [];
	if(title){
		updates.push(`title='${title}'`);
	}
	if(description){
		updates.push(`description='${description}'`)
	}
	if(status){
		updates.push(`status='${status}'`)
	}
		console.log('bye')
	const query = `UPDATE todos SET ${updates.join(', ')} WHERE user_id = $1 AND id = $2`
	const response = await pool.query(query,[user_id,id]);
		console.log(response)
	if(response.rowCount === 0 ){
		return res.status(404).json({error:"task not found"})
	}
	res.status(200).json({message:"Inserted successfully"})
	} catch (error) {

	      res.status(500).json({ err: 'Internal server update error',message:error });
	}
})

//Delete task by id
app.delete('/:user_id/task/deletetask/:id',async(req,res)=>{
	const {user_id,id} = req.params;
	try{
	console.log("hi")
	const response = await pool.query('DELETE FROM todos WHERE user_id = $1 AND id = $2',[user_id,id]);
	if(response.rowCount == 0){
		return res.status(404).json({error:"task not found"})
	}
	res.status(200).json({message:'Delted from the DB'});
	}catch(error){
	      res.status(500).json({ err: 'Deleted from the db',message:error });
	}
})

app.listen(process.env.PORT,()=>{
	console.log("i am ready " + process.env.PORT)
});
