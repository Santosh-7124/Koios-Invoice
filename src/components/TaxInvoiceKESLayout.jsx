import React from "react";

function TaxInvoiceKESLayout({ data }) {
  return (
    <div className="tax-invoice-layout">
      <div className="invoice-details">
        <h2>Invoice Details</h2>
        <p>
          <strong>Invoice No:</strong> {data.InvoiceNo}
        </p>
        <p>
          <strong>Invoice Date:</strong> {data.InvoiceDate}
        </p>
        <p>
          <strong>Reference Number:</strong> {data.referenceNumber}
        </p>
      </div>

      <div className="billed-to">
        <h2>Billed To</h2>
        <p>
          <strong>Company:</strong> {data.billedToCompany}
        </p>
        <p>
          <strong>GSTIN:</strong> {data.billedToGSTIN}
        </p>
        <p>
          <strong>PAN:</strong> {data.billedToPAN}
        </p>
        <p>
          <strong>Address:</strong> {data.billedToAddress}
        </p>
        <p>
          <strong>Phone Number:</strong> {data.billedToPhoneNumber}
        </p>
      </div>

      <div className="items">
        <h2>Items</h2>
        {data.items.map((item, index) => (
          <div key={index} className="item">
            <p>
              <strong>Service:</strong> {item.partName}
            </p>
            <ul>
              {item.details.map((detail, detailIndex) => (
                <li key={detailIndex}>
                  <p>
                    <strong>Detail:</strong> {detail.detail}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {detail.quantity}
                  </p>
                  <p>
                    <strong>Cost:</strong> {detail.cost}
                  </p>
                  <p>
                    <strong>Complimentary:</strong>{" "}
                    {detail.complimentary ? "Yes" : "No"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="tax-details">
        <h2>Tax Details</h2>
        <p>
          <strong>Tax Type:</strong> {data.Tax}
        </p>
        {data.Tax === "SGSTandCGST" && (
          <>
            <p>
              <strong>SGST:</strong> {data.SGST}
            </p>
            <p>
              <strong>CGST:</strong> {data.CGST}
            </p>
          </>
        )}
        {data.Tax === "IGST" && (
          <p>
            <strong>IGST:</strong> {data.IGST}
          </p>
        )}
      </div>

      <div className="payment-terms">
        <h2>Payment Terms & Conditions</h2>
        <p>{data.PaymentTermsandConditions}</p>
      </div>
    </div>
  );
}

export default TaxInvoiceKESLayout;
