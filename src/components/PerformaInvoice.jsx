import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function PerformaInvoice() {
  return (
    <>
      <Helmet>
        {/* Remove old favicons */}
        <script>
          {`
                        document.querySelectorAll('link[rel="icon"]').forEach(el => el.remove());
                      `}
        </script>
        {/* Add new favicon */}
        <link rel="icon" type="image/svg+xml" href="/react.svg" />
        <title>Performa Invoice</title>
      </Helmet>
      <div className="twoOptionPage">
        <div
          className="heading"
          style={{ paddingTop: "0px", paddingBottom: "0px" }}
        >
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>{">"}</span>
            <p>Performa Invoice </p>
          </div>
        </div>
        <div className="Home">
          <div className="homeHeading">
            <span>Choose the Sender </span>
            <p>which Company?</p>
          </div>
          <div className="homeContainer">
            <Link
              to="/PerformaInvoice/KES"
              style={{ width: "50%" }}
              className="homeOption"
            >
              <p>Koios Engineering Solutions</p>
            </Link>
            <Link
              to="/PerformaInvoice/TKS"
              style={{ width: "50%" }}
              className="homeOption"
            >
              <p>The Koios Studio</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PerformaInvoice;
