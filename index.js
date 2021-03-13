const express = require('express');
const app = express();

const path = require('path');
const pool = require("./db");
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

// console.log(path.join(__dirname, "client/build"));
if(process.env.NODE_ENV === "production")
{
  app.use(express.static(path.join(__dirname, "/client/build")));
}

app.get("/api/banks", async (req, res) => {
  try 
  {
    const allBanks = await pool.query("SELECT * FROM banks");
    res.json(allBanks.rows);
  } 
  catch (err) 
  {
    console.error(err.message);
  }
});

app.get("/api/branches", async (req, res) => {
  
  try 
  {
    var search = req.query.q ? req.query.q.toUpperCase() : "";
    var limit = req.query.limit ? req.query.limit : 80;
    var offset = req.query.offset ? req.query.offset : 0;

    var searchInt = parseInt(search);

    //handling for invalid integer
    searchInt = searchInt ? searchInt : -1;

    const results = await pool.query(`SET client_encoding to 'win1252'; 
      SELECT ifsc, bank_id, branch, address, city, district, state FROM branches
      where branch like '%${search}%'
      or ifsc like '%${search}%'
      or bank_id = ${searchInt}
      or address like '%${search}%'
      or city like '%${search}%'
      or district like '%${search}%'
      or state like '%${search}%'
      order by ifsc 
      LIMIT ${limit} 
      OFFSET ${offset}`);

    res.send(results[1].rows);

  } 
  catch (err) 
  {
    console.error(err.message);
  }

});

app.get("/api/branches/autocomplete", async (req, res) =>
{
  
  try 
  {
    //Handling for empty parameters
    var branch = req.query.q ? req.query.q.toUpperCase() : "";
    var limit = req.query.limit ? req.query.limit : 80;
    var offset = req.query.offset ? req.query.offset : 0;

    const results = await pool.query(`SET client_encoding to 'win1252';  
      SELECT ifsc, bank_id, branch, address, city, district, state FROM branches
      where branch like '${branch}%'
      order by ifsc 
      LIMIT ${limit} 
      OFFSET ${offset}`);
      
    res.send(results[1].rows);
  } 
    catch (err) 
    {
      console.error(err.message);
    }
});

app.post("/api/branches/insert", async (req, res) => {
  
  try 
  {
    const { ifsc, id, branch, address, city, district, state } = req.body;
    
    var iD=parseInt(id);
    // console.log(typeof(iD));

    const insert = await pool.query(`INSERT INTO branches VALUES (
      '${ifsc}', ${iD}, 
      '${branch}', '${address}', 
      '${city}', '${district}', '${state}'
    )`);

    res.send("<h2>Successfully Inserted into the database: <br/><br/>" + 
    "Ifsc: " + ifsc + "<br/>" +
    "Bank_id: " + id + "<br/>" +
    "Branch: " + branch + "<br/>" +
    "Address: " + address + "<br/>" +
    "City: " + city + "<br/>" +
    "District: " + district + "<br/>" +
    "State: " + state + "</h2></br></br>" +
    "<br/><button><a href='/' alt='Go Back'>Go Back!</a></button>"
    );

  } 
    catch (error) {
      res.send("<br/><h2>" + error.message + "</h2>"
      +"<br/><button><a href='/' alt='Go Back'>Go Back!</a></button>");
    }
});

app.post("/api/branches/delete", async (req, res) => {
  
  try 
  {
    console.log(req.body.ifsc);
  
    const del = await pool.query(`Delete from branches where ifsc = '${req.body.ifsc}' `);
    
    res.send("Row with id= " + req.body.ifsc + " deleted successfully" + 
    " <br/><br/><button><a href='/' alt='Go Back'>Go Back!</a></button>");

  } 
    catch (error) {
      res.send("<br/><h2>" + error.message + "</h2>"
      +"<br/><button><a href='/' alt='Go Back'>Go Back!</a></button>");
    }
});



app.listen(PORT, () => 
{
    console.log(`Server has started on port ${PORT}`);
});