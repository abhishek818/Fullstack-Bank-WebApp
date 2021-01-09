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


  return (
    <Fragment>
      <span>
      <select className="select mt-5"
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
      
      <input type="text" className="search" placeholder="Search" 
        value={query} onChange = {(e) =>
      {
        setQuery(e.target.value);
      }} />
      <i className="fa fa-search" />
    
    </span>
    
    <h4 className="header"> Search Results for "<span style={{ color:"red" }}>{query}</span>" </h4>
      <table style={{ maxWidth: "90%" }} className="table table-bordered table-responsive-xl
       mb-5 mt-4 table-hover
       table-striped text-center
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
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListBanks;