import React from "react";
import { Link } from "react-router-dom";

function PurchaseOrder() {
 return (
   <div className="twoOptionPage">
     <div
       className="heading"
       style={{ paddingTop: "0px", paddingBottom: "0px" }}
     >
       <div className="breadcrumb">
         <Link to="/">Home</Link>
         <span>{">"}</span>
         <p>Purchase Order</p>
       </div>
     </div>
     <div className="Home">
       <div className="homeHeading">
         <span>Choose the Sender </span>
         <p>which Company?</p>
       </div>
       <div className="homeContainer">
         <Link
           to="/PurchaseOrder/KES"
           style={{ width: "50%" }}
           className="homeOption"
         >
           <p>Koios Engineering Solutions</p>
         </Link>
         <Link
           to="/PurchaseOrder/TKS"
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

export default PurchaseOrder;
