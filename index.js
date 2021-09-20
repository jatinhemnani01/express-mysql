const express = require("express");
const mysql = require("mysql");


const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  port: 9000,
  user: "root",
  password: "1234",
  database: "test",
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
  const {name,age,city,Email}=req.body;
  const post = {
    name: name,
    age: age,
    city: city,
    Email: Email,
  };

  db.query("INSERT INTO User SET ?", post, (err, result) => {
    if (err) {
      res.json({ message: "Error" });
    }

    res.json(post);
  });
});

// SERVER PORT
app.listen(5000, () => {
  console.log("Server Running");
});
