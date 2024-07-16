import React from "react";
import KESLogo from "../assets/KESLogo.png";
import Signature from "../assets/Signature.png";
import { toWords } from "number-to-words";
import { Margin, Resolution, usePDF } from "react-to-pdf";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

const PerformaInvoiceKESLayout = ({ data }) => {
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
      <div className="layout" ref={targetRef}>
        <div className="performaHeading">
          <p className="performaHeadingText">Performa Invoice</p>
          <div className="performaHeadingContainer">
            <div className="performaHeadingLogo">
              <img src={KESLogo}></img>
            </div>
            <div className="performaHeadingInfo">
              <sub>Koios Engineering Solutions PVT Ltd</sub>
              <div className="performaHeadingInfoSub">
                <p>
                  No. 57/D, Balaji Layout, Vajarahalli, Near 100ft road, off
                  Knakapura main road Thalaghattapura,Bangalore South, Bangalore
                  - 560109.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <p
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    {"    "}
                    <span style={{ width: "60px" }}>GSTIN</span>: fefe
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    {"    "}
                    <span style={{ width: "60px" }}>Email </span>: fefe
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    {"    "}
                    <span style={{ width: "60px" }}>Mobile</span>: fefe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="performaDetails">
          <div className="performaDetailsDateAndNumber">
            <p>{formatDate(data.piDate)}</p>
            <div
              className="performaDetailsNumber"
              style={{ minWidth: "150px" }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                {"    "}
                <span style={{ width: "80px" }}>PI No</span>: {data.piNo}
              </p>
              <p
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                {"    "}
                <span style={{ width: "80px" }}>Reference</span>:{" "}
                {data.referenceNumber}
              </p>
              <p
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                {"    "}
                <span style={{ width: "80px" }}>Lead Time</span>:{" "}
                {data.leadTime}
              </p>
            </div>
          </div>
          <div className="performaDetailsContainer">
            <div className="performaDetailsSet">
              <sub>Billed To :</sub>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  alignItems: "flex-start",
                }}
              >
                <p className="performaDetailsSetCompany">
                  {data.billedToCompany}
                </p>
                <p>{data.billedToAddress}</p>
                <p>{data.billedToPhoneNumber}</p>
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  {"    "}
                  <span style={{ width: "40px" }}>GSTIN</span>:{" "}
                  {data.billedToGSTIN}
                </p>
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  {"    "}
                  <span style={{ width: "40px" }}>PAN</span>: {data.billedToPAN}
                </p>
              </div>
            </div>
            <div className="performaDetailsSet">
              <sub>Shipped To :</sub>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  alignItems: "flex-start",
                }}
              >
                <p className="performaDetailsSetCompany">
                  {data.shippedToCompany}
                </p>
                <p>{data.shippedToAddress}</p>
                <p>{data.shippedToPhoneNumber}</p>
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  {"    "}
                  <span style={{ width: "40px" }}>GSTIN</span>:{" "}
                  {data.shippedToGSTIN}
                </p>
                <p
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  {"    "}
                  <span style={{ width: "40px" }}>PAN</span>:{" "}
                  {data.shippedToPAN}
                </p>
              </div>
            </div>
          </div>
          <div className="performaTable">
            <div className="performaTableHeading">
              <div className="number">No</div>
              <div className="partName">Part Name</div>
              <div className="HSNcode">HSN Code</div>
              <div className="Quantity">Oty</div>
              <div className="UnitCost">Unit Cost</div>
              <div className="TotalCost">Total Cost</div>
            </div>
            <div className="performaTableContainer">
              {data.items.map((item, index) => (
                <div className="performaTableSet" key={index}>
                  <div className="number">{index + 1}</div>
                  <div className="partName"> {item.partName}</div>
                  <div className="HSNcode"> {item.HSNCode}</div>
                  <div className="Quantity"> {item.Quantity}</div>
                  <div className="UnitCost">{item.Cost}</div>
                  <div className="TotalCost">{item.Quantity * item.Cost}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="performaEnd">
            <div className="performaCost">
              <div className="performaCostWords">
                <p>
                  <span>Total In Words</span> <span>:</span>{" "}
                  {totalCostInWords()} Rupees Only
                </p>
              </div>
              <div className="performaAmount">
                <div className="performaAmountSet">
                  <p style={{ width: "80px" }}>Sub Total</p>
                  <span>:</span>
                  <p style={{ width: "100px", textAlign: "end" }}>
                    {calculateTotalCost()}
                  </p>
                </div>
                {data.Tax === "SGSTandCGST" && (
                  <>
                    <div className="performaAmountSet">
                      <p style={{ width: "80px" }}>CGST {data.CGST}%</p>
                      <span>:</span>
                      <p style={{ width: "100px", textAlign: "end" }}>
                        {(calculateTotalCost() * data.CGST) / 100}
                      </p>
                    </div>
                    <div className="performaAmountSet">
                      <p style={{ width: "80px" }}>SGST {data.SGST}%</p>
                      <span>:</span>
                      <p style={{ width: "100px", textAlign: "end" }}>
                        {(calculateTotalCost() * data.SGST) / 100}
                      </p>
                    </div>
                    <div className="performaAmountSet">
                      <sub style={{ width: "80px" }}>Total Amount </sub>
                      <span>:</span>
                      <p style={{ width: "100px", textAlign: "end" }}>
                        {(calculateTotalCost() * data.SGST) / 100 +
                          (calculateTotalCost() * data.CGST) / 100 +
                          calculateTotalCost()}
                      </p>
                    </div>
                  </>
                )}
                {data.Tax === "IGST" && (
                  <>
                    <div className="performaAmountSet">
                      <p style={{ width: "80px" }}>IGST {data.IGST}%</p>
                      <span>:</span>
                      <p style={{ width: "100px", textAlign: "end" }}>
                        {" "}
                        {(calculateTotalCost() * data.IGST) / 100}
                      </p>
                    </div>
                    <div className="performaAmountSet">
                      <sub style={{ width: "80px" }}>Total Amount </sub>
                      <span>:</span>
                      <p style={{ width: "100px", textAlign: "end" }}>
                        {(calculateTotalCost() * data.IGST) / 100 +
                          calculateTotalCost()}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="performaEndDetails">
              <div className="performaBankDetails">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <sub>Koios Engineering Solutions PVT Ltd</sub>
                  <sub>ICICI Bank</sub>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  {" "}
                  <p
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    {"    "}
                    <span style={{ width: "120px" }}>IFSC Code</span>:
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    {"    "}
                    <span style={{ width: "120px" }}>Account Number</span>:
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    {"    "}
                    <span style={{ width: "120px" }}>Branch</span>:
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    {"    "}
                    <span style={{ width: "120px" }}>Account Type</span>:
                  </p>
                </div>
              </div>
              <div className="performaPaymentDetails">
                <div className="performaPaymentDetailsLeft">
                  <div className="performaPaymentDetailsHeading">
                    <sub>Terms & Conditions</sub>
                    <span>Payment Terms</span>
                  </div>
                  <div className="performaPaymentDetailsText">
                    {data.PaymentTermsandConditions}
                  </div>
                </div>
                <div className="performaPaymentDetailsRight">
                  <div className="performaSignature">
                    <img src={Signature}></img>
                  </div>
                  <p>Authorised Signatory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="formButton">
        <button onClick={toPDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default PerformaInvoiceKESLayout;
