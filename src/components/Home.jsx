import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="twoOptionPage">
      <div
        className="heading"
        style={{ paddingTop: "0px", paddingBottom: "0px" }}
      >
        <div className="breadcrumb">
          <p>Home</p>
        </div>
      </div>
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
            <p>Purchase Order</p>
          </Link>
          <Link to="/" className="homeOption">
            <p>Quotation</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
