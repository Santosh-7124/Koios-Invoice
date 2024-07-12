import React from "react";
import { Link } from "react-router-dom";

function PerformaInvoice() {
  return (
    <div className="Home">
      <div className="heading" style={{paddingTop:"0px", paddingBottom:"36px"}}>
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>{">"}</span>
          <p>Performa Invoice </p>
        </div>
      </div>
      <div className="homeHeading">
        <span>Choose the Sender </span>
        <p>which Company?</p>
      </div>
      <div className="homeContainer">
        <Link to="/PerformaInvoice/KES" className="homeOption">
          <p>Koios Engineering Solutions</p>
        </Link>
        <Link to="/PerformaInvoice/TKS" className="homeOption">
          <p>The Koios Studio</p>
        </Link>
      </div>
    </div>
  );
}

export default PerformaInvoice;
