import React from "react";
import { Link } from "react-router-dom";

function QuotationInvoice() {
  return (
    <div className="twoOptionPage">
      <div
        className="heading"
        style={{ paddingTop: "0px", paddingBottom: "0px" }}
      >
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>{">"}</span>
          <p>Quotation Invoice</p>
        </div>
      </div>
      <div className="Home">
        <div className="homeHeading">
          <span>Choose the Sender </span>
          <p>which Company?</p>
        </div>
        <div className="homeContainer">
          <Link
            to="/QuotationInvoice/KES"
            style={{ width: "50%" }}
            className="homeOption"
          >
            <p>Koios Engineering Solutions</p>
          </Link>
          <Link
            to="/TaxInvoice/TKS"
            style={{ width: "50%" }}
            className="homeOption"
          >
            <p>The Koios Studio</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuotationInvoice;
