import React from "react";

const QuotationInvoiceKESLayout = ({ data }) => {
  return (
    <div className="quotationInvoiceLayout">
      <h1>Quotation Invoice</h1>

      {/* Display customer information */}
      <div className="customerInfo">
        <h2>Customer Information</h2>
        <p>
          <strong>Name:</strong> {data.billedToCompany}
        </p>
        <p>
          <strong>Address:</strong> {data.billedToAddress}
        </p>
        <p>
          <strong>GSTIN:</strong> {data.billedToGSTIN}
        </p>
      </div>

      {/* Display items */}
      <div className="itemsSection">
        <h2>Items</h2>
        {data.items.map((item, index) => (
          <div key={index} className="itemRow">
            <p>
              <strong>Part Name:</strong> {item.partName}
            </p>
            <p>
              <strong>HSN Code:</strong> {item.HSNCode}
            </p>
            <p>
              <strong>Quantity:</strong>{" "}
              {item.complimentary ? "0" : item.Quantity}
            </p>
            <p>
              <strong>Cost:</strong>{" "}
              {item.complimentary ? "0" : item.Cost}
            </p>
          </div>
        ))}
      </div>

      {/* Display additional information */}
      <div className="additionalInfo">
        <h2>Additional Information</h2>
        <p>
          <strong>Payment Terms:</strong> {data.paymentTerms}
        </p>
        <p>
          <strong>Delivery Date:</strong> {data.deliveryDate}
        </p>
        {/* Add other form data here as needed */}
      </div>
    </div>
  );
};

export default QuotationInvoiceKESLayout;
