import  express  from "express";
import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import jwt from 'jsonwebtoken'
const router = express.Router();


//create a task
router.post('/',async(req,res)=>{
   const {user_id} = req.body;
   const {title,description} = req.body;
   if(!user_id || !title || isNaN(user_id) ){
        return res.status(400).json({error:"Invalid user data"});
    }
    try {
        const response = await  pool.query('INSERT INTO todos(user_id,title,description) VALUES($1,$2,$3)',[user_id,title,description])
		res.status(201).json({message:"Inserted successfully "})
    } catch (error) {
		res.status(500).json({error:'Internal server error'})
    }
})

//get all task by id
router.get('/:user_id',async(req,res)=>{
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

//update task by id ---- status / title / description
router.put('/:user_id/updatetask/:id',async(req,res)=>{
	const {user_id,id} = req.params;
	const {title,description,status} = req.body;
	try {
	if (isNaN(user_id) || isNaN(id)) {
         return res.status(400).json({ error: "Invalid user or task ID" });
      }
	const updates = [];
	const values = [];
	let queryIndex = 3;

	if(title !== undefined){
		updates.push(`title=$${queryIndex}`);
		values.push(title);
		queryIndex++;
	}
	if(description !== undefined){
		updates.push(`description=$${queryIndex}`)
		values.push(description)
		queryIndex++;
	}
	if(status !== undefined){
		updates.push(`status=$${queryIndex}`)
		values.push(status);
		queryIndex++;
	}
	if(updates.length === 0)
	return res.status(400).json({error:"No valid fields to update"});

	const query = `UPDATE todos SET ${updates.join(', ')} WHERE user_id = $1 AND id = $2`
	values.unshift(user_id,id);
	
	const response = await pool.query(query,values);
	if(response.rowCount === 0 ){
		return res.status(404).json({error:"task not found"})
	}
	res.status(200).json({message:"Inserted successfully"})
	} catch (error) {

	      res.status(500).json({ err: 'Internal server update error',message:error });
	}
})

router.delete('/:user_id/deletetask/:id',async(req,res)=>{
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

export default router;