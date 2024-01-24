import  pg from "pg";

const {Pool} = pg;
const pool = new Pool({
	port:5432,
	host:"localhost",
	database:"mytask",
	user:"irfash",
	password:"0000"
});



export default pool;
