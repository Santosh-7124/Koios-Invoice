import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <div className="homeHeading">
        <span>Choose the </span>
        <p>type of invoice? </p>
      </div>
      <div className="homeContainer">
        <Link to="/PerformaInvoice" className="homeOption">
          <p>Performa Invoice</p>
        </Link>
        <Link to="/TaxInvoice" className="homeOption">
          <p>Tax Invoice</p>
        </Link>
        <Link to="/" className="homeOption">
          <p>Purchase Invoice</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
