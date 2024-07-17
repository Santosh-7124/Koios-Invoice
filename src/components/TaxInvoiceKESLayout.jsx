import React from "react";
import KESLogo from "../assets/KESLogo.png";
import Signature from "../assets/Signature.png";
import { toWords } from "number-to-words";
import { Margin, Resolution, usePDF } from "react-to-pdf";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

function TaxInvoiceKESLayout({ data }) {
  const calculateTotalCost = () => {
    let total = 0;
    data.items.forEach((item) => {
      total += item.Quantity * item.Cost;
    });
    return total;
  };

  const totalCostInWords = () => {
    let total = calculateTotalCost();
    if (data.Tax === "SGSTandCGST") {
      total = (total * data.CGST) / 100 + (total * data.SGST) / 100 + total;
    } else {
      total = (total * data.IGST) / 100 + total;
    }
    return toWords(total);
  };

  const { toPDF, targetRef } = usePDF({
    method: "save",
    filename: "usepdf-example.pdf",
    page: { margin: Margin.NONE, resolution: Resolution.HIGH, size: "A1" },
  });

  return (
    <div className="containerBig" id="containerBig">
      <div className="formSection" style={{ alignItems: "center" }}>
        <div className="formSectionHeading">Preview</div>
      </div>
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
      <div className="layout" ref={targetRef}>
        <div className="performaDetails">
          <div
            className="performaDetailsDateAndNumber"
            style={{ background: "#FFF5D9" }}
          >
            <p className="p">Tax Invoice</p>
            <div className="performaDetailsNumber">
              <p>
                <span>
                  <sub>Date</sub>:
                </span>
                {formatDate(data.InvoiceDate)}
              </p>
              <p>
                <span>
                  <sub>Invoice</sub>:
                </span>
                {data.InvoiceNo}
              </p>
              <p>
                <span>
                  <sub>Reference</sub>:
                </span>
                {data.referenceNumber}
              </p>
            </div>
          </div>
        </div>
        <div className="performaHeading" style={{ border: "none" }}>
          <div className="performaHeadingContainer">
            <div className="performaHeadingLogo">
              <img src={KESLogo}></img>
            </div>
            <div className="performaHeadingInfo">
              <sub style={{ textTransform: "uppercase" }}>
                Koios Engineering Solutions PVT Ltd
              </sub>
              <div className="performaHeadingInfoSub">
                <p>
                  No. 57/D, Balaji Layout, Vajarahalli, Near 100ft road, off
                  Kankapura main road Thalaghattapura,Bangalore South,
                  <br /> Bangalore - 560109.
                </p>
                <div className="performaDetailsNumber">
                  <p>
                    <span>
                      <sub>GSTIN</sub>:
                    </span>
                    29AAKCK0668H1Z6
                  </p>
                  <p>
                    <span>
                      <sub>Email</sub>:
                    </span>
                    info@koiosengg.com
                  </p>
                  <p>
                    <span>
                      <sub>Mobile</sub>:
                    </span>
                    +91-6361668024
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="performaDetailsContainer">
            <div
              className="performaDetailsSet"
              style={{
                background: "#fff",
                borderTop: "1px solid rgba(17, 17, 17, 0.10)",
                minHeight: "auto",
              }}
            >
              <sub>Billed To :</sub>
              <div className="performaDetailsSetContainer">
                <div className="set">
                  <p>{data.billedToCompany}</p>
                  <span>{data.billedToAddress}</span>
                </div>
                <div className="performaDetailsNumber">
                  <p>
                    <span>
                      <sub>GSTIN</sub>:
                    </span>
                    {data.billedToGSTIN}
                  </p>
                  <p>
                    <span>
                      <sub>PAN No</sub>:
                    </span>
                    {data.billedToPAN}
                  </p>
                  <p>
                    <span>
                      <sub>Mobile</sub>:
                    </span>
                    {data.billedToPhoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="performaTable">
          <div className="performaTableHeading">
            <div className="number">No</div>
            <div className="partName">Part Name</div>{" "}
            <div className="performaTableSetDetails">
              <div className="performaTableSetDetailsSet">
                <div className="detail">Details</div>
                <div className="Quantity">Oty</div>
                <div className="UnitCost">Unit Cost</div>
                <div className="TotalCost">Total Cost</div>
              </div>
            </div>
          </div>
          <div
            className="performaTableContainer"
            style={{ background: "rgba(255, 191, 0, 0.10)" }}
          >
            {data.items.map((item, index) => (
              <div className="performaTableSet" key={index}>
                <div className="number">{index + 1}</div>
                <div className="partName">{item.partName}</div>
                <div className="performaTableSetDetails">
                  {item.details.map((detail, detailIndex) => (
                    <div
                      className="performaTableSetDetailsSet"
                      key={detailIndex}
                    >
                      <div className="detail">{detail.detail}</div>
                      <div className="Quantity">
                        {detail.complimentary ? "-" : detail.quantity}
                      </div>
                      <div className="UnitCost">
                        {detail.complimentary ? "-" : detail.cost}
                      </div>
                      <div className="TotalCost">
                        {detail.complimentary
                          ? "Complimentary"
                          : detail.quantity * detail.cost}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="formButton">
        <button onClick={toPDF}>Download PDF</button>
      </div>
    </div>
  );
}

export default TaxInvoiceKESLayout;
