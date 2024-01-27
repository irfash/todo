import  express  from "express";
import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import jwt from 'jsonwebtoken'
const router = express.Router();



router.post('/signup',async(req,res)=>{
const {name,email,password} = req.body;
const hashedpassword =await bcrypt.hash(password,10);
	try{
     const response =await pool.query('INSERT INTO users(name,email,hashedpassword) VALUES($1,$2,$3) RETURNING *',[name,email,hashedpassword]);
	 const token = jwt.sign({id:response.rows[0].id},process.env.PRIVATEKEY,{expiresIn:'1h'})
	const {id,name} = response.rows[0];
	 res.json({user_id:id,name,token});
  }catch(err){
		res.status(500).json({message:"Error creating user",error:err})
  }
})

router.post('/login',async(req,res)=>{
	const {email,password} = req.body;
	const response = await pool.query('SELECT * FROM users WHERE email = $1' , [email]);
	if(response.rows.length>0){
	const validPassword =await bcrypt.compare(password,response.rows[0].hashedpassword);
	if(validPassword){
			const token = jwt.sign({id:response.rows[0].id},process.env.PRIVATEKEY,{expiresIn:'1h'});
			console.log("i->");
	console.log(response);
	console.log("<-i");		
	const {id,name} = response.rows[0];
	 res.json({user_id:id,name,token});
			
			// res.json({token});
		}else{
			res.status(400).json({error:"Invalid password"})
		}
	}else{
		res.status(400).json({error:'user Not Found'});
	}
})

export default router;
