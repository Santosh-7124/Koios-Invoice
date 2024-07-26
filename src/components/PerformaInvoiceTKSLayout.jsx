import React from "react";
import TKSLogo from "../assets/KESLogo.png";
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

const PerformaInvoiceTKSLayout = ({ data }) => {
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
        <div className="performaDetails">
          <div
            className="performaDetailsDateAndNumber"
            style={{ background: "#FFF5D9" }}
          >
            <p className="p">Performa Invoice</p>
            <div className="performaDetailsNumber">
              <p>
                <span>
                  <sub>Date</sub>:
                </span>
                {formatDate(data.piDate)}
              </p>
              <p>
                <span>
                  <sub>PI No</sub>:
                </span>{" "}
                {data.piNo}
              </p>
              <p>
                <span>
                  <sub>Reference</sub>:
                </span>
                {data.referenceNumber}
              </p>
              <p>
                <span>
                  <sub>Lead Time</sub>:
                </span>
                {data.leadTime}
              </p>
              <p>
                <span>
                  <sub>Place of Supply</sub>:
                </span>
                {data.placeOfSupply}
              </p>
            </div>
          </div>
        </div>
        <div className="performaHeading" style={{ border: "none" }}>
          <div className="performaHeadingContainer">
            <div className="performaHeadingLogo">
              <img src={TKSLogo}></img>
            </div>
            <div className="performaHeadingInfo">
              <sub style={{ textTransform: "uppercase" }}>
                Koios SOFTWARE Solutions PVT Ltd
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
          <div
            className="performaDetailsContainer"
            style={{ borderTop: "1px solid rgba(17, 17, 17, 0.10)" }}
          >
            <div
              className="performaDetailsSet"
              style={{
                background: "#fff",
                minHeight: "auto",
              }}
            >
              <sub>Billed To :</sub>
              <div className="performaDetailsSetContainer">
                <div className="set">
                  <p>{data.billedToCompany}</p>
                  {data.billedToAddress && <span>{data.billedToAddress}</span>}
                  <div className="performaDetailsNumber">
                    {data.billedToGSTIN && (
                      <p>
                        <span>
                          <sub>GSTIN</sub>:
                        </span>
                        {data.billedToGSTIN}
                      </p>
                    )}
                    {data.billedToPAN && (
                      <p>
                        <span>
                          <sub>PAN No</sub>:
                        </span>
                        {data.billedToPAN}
                      </p>
                    )}
                    {data.billedToPhoneNumber && (
                      <p>
                        <span>
                          <sub>Mobile</sub>:
                        </span>
                        {data.billedToPhoneNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="performaDetailsSet"
              style={{
                background: "#fff",
                minHeight: "auto",
              }}
            >
              <sub>Shipped To :</sub>
              <div className="performaDetailsSetContainer">
                <div className="set">
                  <p>{data.shippedToCompany}</p>
                  {data.shippedToAddress && (
                    <span>{data.shippedToAddress}</span>
                  )}
                  <div className="performaDetailsNumber">
                    {data.shippedToGSTIN && (
                      <p>
                        <span>
                          <sub>GSTIN</sub>:
                        </span>
                        {data.shippedToGSTIN}
                      </p>
                    )}
                    {data.shippedToPAN && (
                      <p>
                        <span>
                          <sub>PAN No</sub>:
                        </span>
                        {data.shippedToPAN}
                      </p>
                    )}
                    {data.shippedToPhoneNumber && (
                      <p>
                        <span>
                          <sub>Mobile</sub>:
                        </span>
                        {data.shippedToPhoneNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>
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
          <div
            className="performaTableContainer"
            style={{ background: "rgba(255, 191, 0, 0.10)" }}
          >
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
        <div className="performaCost">
          <div className="performaCostWords">
            <p>
              <span>Total In Words</span> <span>:</span>
            </p>
            <p style={{ paddingTop: "8px" }}>
              {totalCostInWords()} Rupees Only
            </p>
          </div>
          <div className="performaAmount" style={{ paddingRight: "20px" }}>
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
        <div className="performaBankDetails">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <sub>Koios Software Solutions PVT Ltd</sub>
            <sub>ICICI Bank</sub>
          </div>
          <div className="performaHeadingInfoSub">
            <div className="performaDetailsNumber">
              <p>
                <span>
                  <sub>IFSC Code</sub>:
                </span>
                ICIC0004405
              </p>
              <p>
                <span>
                  <sub>Account Number</sub>:
                </span>
                440505000387
              </p>
              <p>
                <span>
                  <sub>Account Type</sub>:
                </span>
                Current Account
              </p>
              <p>
                <span>
                  <sub>Branch</sub>:
                </span>
                Kanakapura Road
              </p>
            </div>
          </div>
        </div>
        <div className="performaPaymentDetails">
          <div className="performaPaymentDetailsLeft">
            <div className="performaPaymentDetailsHeading">
              <sub>Terms & Conditions</sub>
              <span>Payment Terms</span>
            </div>
            <ol className="performaPaymentDetailsText">
              {data.PaymentTermsandConditions.map((term, index) => (
                <li key={index}>{term.terms}</li>
              ))}
            </ol>
          </div>
          <div className="performaPaymentDetailsRight">
            <p>Authorised Signatory</p>
          </div>
        </div>
      </div>
      <div className="formButton">
        <button onClick={toPDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default PerformaInvoiceTKSLayout;
