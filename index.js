const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "2002",
  database: "practise",
});

//DB Connection
db.connect((err) => {
  if (err) throw err;
  console.log("mysql Connected");
});

// Root Route
app.get("/", (_, res) => {
  db.query("SELECT * FROM `User`", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/add", (req, res) => {
  const { name, age, city, Email } = req.body;
  const post = {
    name: name,
    age: age,
    city: city,
    Email: Email,
  };

  // Add DATA TO DB
  db.query("INSERT INTO User SET ?", post, (err, result) => {
    if (err) {
      res.json({ message: "Error" });
    }

    res.json(post);
  });
});

// DELETE DATA FROM DB
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM User WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ message: "Error" });
    }

    res.status(202).json({ message: "Deleted" });
  });
});

// UPDATE DETAILS IN DB
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const {name,city,age,Email}=req.body;
  const data={
    name:name,
    age:age,
    city:city,
    Email:Email
  }
  const sql=`UPDATE User SET ? WHERE id = ${id}`
  
  db.query(sql,data,(err,_)=>{
    if(err){
      res.status(400).json({message:"Error"})
    }
    res.json({message:"Updated"})
  })
});

// SERVER PORT
app.listen(5000, () => {
  console.log("Server Running");
});
