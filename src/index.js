const express = require('express');
const app = express();
const cors = require('cors');

const path = require('path');
const pool = require("./db");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === "production")
{
  app.use(express.static(path.join(__dirname, "client/build")));
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

app.get("/api/branches/", async (req, res) => {
  
  try 
  {
    var search = req.query.q ? req.query.q.toUpperCase() : "";
    var limit = req.query.limit ? req.query.limit : 1000;
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
    var limit = req.query.limit ? req.query.limit : 1000;
    var offset = req.query.offset ? req.query.offset : 0;

    const results = await pool.query(`SET client_encoding to 'win1252';  
      SELECT ifsc, bank_id, branch, address, city, district, state FROM branches
      where branch like '${branch}%'
      order by ifsc 
      LIMIT ${limit} 
      OFFSET ${offset}`);
    
    // let filteredData = [];
    // filteredData.push("ifsc ,bank_id , branch , address , city , district , state");

    // for(var i=0;i<results[1].rows.length;i++)
    //   {
    //      let eachFilteredData = [];
    //      var data = results[1].rows[i];
    //      eachFilteredData.push(data.ifsc);
    //      eachFilteredData.push(data.bank_id);
    //      eachFilteredData.push(data.branch);
    //      eachFilteredData.push(data.address);
    //      eachFilteredData.push(data.city);
    //      eachFilteredData.push(data.district);
    //      eachFilteredData.push(data.state);
         
    //      filteredData.push(eachFilteredData);
    //   }
     
    // res.send(JSON.stringify(filteredData, null, 2));
      
    res.send(results[1].rows);
  } 
    catch (err) 
    {
      console.error(err.message);
    }
});


app.listen(PORT, () => 
{
    console.log(`Server has started on port ${PORT}`);
});