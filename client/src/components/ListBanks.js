import React, { Fragment, useEffect, useState } from "react";

const ListBanks = () => {

  const [banks, setBanks] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
  
  const getBanks = async () => {
    try {
      const response = await fetch(`/api/branches?q=${query}`);
      const results = await response.json();
      
      setBanks(results);
    } catch (err) {
      console.error(err.message);
    }
  };

    getBanks();
  });

  // const submitBankHandler = (e) =>
  // {
  //   e.preventDefault();
  // }

  return (
    <Fragment>
      <h3>The Bank Database was taken from: &nbsp;  
        <a href="https://github.com/snarayanank2/indian_banks" target="_blank" rel="noreferrer">
          Click Here!
        </a>
      </h3>
      <span>
      <select className="select mt-3"
       value={query} onChange = {(e) =>
      {
        setQuery(e.target.value);
      }}>
        <option value=""> Select an Option </option>
        <option value="Bangalore"> Bangalore </option>
        <option value="Mumbai"> Mumbai </option>
        <option value="Kolkata"> Kolkata </option>
        <option value="Delhi"> Delhi </option>
        <option value="Ahmedabad"> Ahmedabad </option>
      </select>
      
      <input type="text" className="search" placeholder="Search any column" 
        value={query} onChange = {(e) =>
      {
        setQuery(e.target.value);
      }} />
      <i className="fa fa-search" />
    
    </span>
    
    <h4 className="header"> Search Results for "<span style={{ color:"pink", font:"10px" }}>{query}</span>" </h4>
    
    <form action="/api/branches/insert" method="post" className="form">
      <input size="10" type="text" name="ifsc" placeholder="Enter Ifsc" required />
      <input size="8" type="text" name="id" placeholder="Enter Bank Id" required />
      <input type="text" name="branch" className="todo-input" placeholder="Enter Branch" required />
      <input size="30" name="address" type="text" className="todo-input" placeholder="Enter Address" required />
      <input type="text" name="city" className="todo-input" placeholder="Enter City" required />
      <input type="text" name="district" className="todo-input" placeholder="Enter District" required />
      <input type="text" name="state" className="todo-input" placeholder="Enter State" required />
      
      <button type="submit" className="btn btn-info">Add a Record !
      </button>
    </form>
    
    <table style={{ maxWidth: "95%" }} className="table table-bordered table-responsive-xl
       mb-5 mt-4 table-hover
       text-center
       center">
        <thead className="thead-dark">
          <tr>
            <th>Ifsc</th>
            <th>Bank_id</th>
            <th>Branch</th>
            <th>Address</th>
            <th>City</th>
            <th>District</th>
            <th>State</th>
            <th>Delete row</th>
          </tr>
        </thead>
        <tbody>
          {banks.map(bank => (
            <tr key={bank.ifsc}>
              <td>{bank.ifsc}</td>
              <td>{bank.bank_id}</td>
              <td>{bank.branch}</td>
              <td>{bank.address}</td>
              <td>{bank.city}</td>
              <td>{bank.district}</td>
              <td>{bank.state}</td>
              <td>
                <form action="/api/branches/delete" method="post">
                  <button name="ifsc" value={bank.ifsc} id={bank.ifsc} style={{ backgroundColor: "#d9534f" }} 
                    type="submit" className="btn btn-danger">Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListBanks;