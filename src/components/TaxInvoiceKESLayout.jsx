import React from "react";

function TaxInvoiceKESLayout({ formData }) {
  const {
    InvoiceNo,
    InvoiceDate,
    referenceNumber,
    billedToCompany,
    billedToGSTIN,
    billedToPAN,
    billedToAddress,
    billedToPhoneNumber,
    items,
    Tax,
    SGST,
    CGST,
    IGST,
    PaymentTermsandConditions,
  } = formData;

  return (
    <div className="invoice-layout">
      <h1>Tax Invoice</h1>
      <div className="invoice-header">
        <div>
          <h2>Invoice No: {InvoiceNo}</h2>
          <p>Date: {InvoiceDate}</p>
          <p>Reference Number: {referenceNumber}</p>
        </div>
        <div>
          <h2>Billed To:</h2>
          <p>Company: {billedToCompany}</p>
          <p>GSTIN: {billedToGSTIN}</p>
          <p>PAN: {billedToPAN}</p>
          <p>Address: {billedToAddress}</p>
          <p>Phone Number: {billedToPhoneNumber}</p>
        </div>
      </div>

      <div className="invoice-items">
        <h2>Services</h2>
        {items.map((item, index) => (
          <div key={index} className="invoice-item">
            <h3>Service: {item.partName}</h3>
            {item.details.map((detail, detailIndex) => (
              <div key={detailIndex} className="invoice-item-detail">
                <p>Detail: {detail.detail}</p>
                <p>Quantity: {detail.quantity}</p>
                <p>Cost: {detail.cost}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="invoice-tax">
        <h2>Tax Details</h2>
        <p>Tax Type: {Tax}</p>
        {Tax === "SGSTandCGST" && (
          <div>
            <p>SGST: {SGST}%</p>
            <p>CGST: {CGST}%</p>
          </div>
        )}
        {Tax === "IGST" && (
          <div>
            <p>IGST: {IGST}%</p>
          </div>
        )}
      </div>

      <div className="invoice-terms">
        <h2>Payment Terms and Conditions</h2>
        <p>{PaymentTermsandConditions}</p>
      </div>
    </div>
  );
}

export default TaxInvoiceKESLayout;
