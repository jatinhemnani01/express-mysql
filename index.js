const app = require("express")();
const mysql = require('mysql')


const db = mysql.createConnection({
    host:'localhost',
    port:9000,
    user:'root',
    password:'1234',
    database:'test'
})

db.connect((err)=>{
    if(err) throw err;
    console.log("mysql Connected")
})


app.get("/", (_, res) => {
    db.query('SELECT * FROM `User`',(err,result)=>{
	if(err){
	    console.log(err)
	}
	res.send(result)
    })
});




app.listen(5000, () => {
  console.log("Server Running");
});
