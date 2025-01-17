import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PerformaInvoice from "./components/PerformaInvoice";
import PerformaInvoiceKES from "./components/PerformaInvoiceKES";
import PerformaInvoiceTKS from "./components/PerformaInvoiceTKS";
import TaxInvoice from "./components/TaxInvoice";
import TaxInvoiceKES from "./components/TaxInvoiceKES";
import TaxInvoiceTKS from "./components/TaxInvoiceTKS";
import QuotationInvoice from "./components/QuotationInvoice";
import QuotationInvoiceKES from "./components/QuotationInvoiceKES";
import QuotationInvoiceTKS from "./components/QuotationInvoiceTKS";
import PurchaseOrder from "./components/PurchaseOrder";
import PurchaseOrderKES from "./components/PurchaseOrderKES";
import PurchaseOrderTKS from "./components/PurchaseOrderTKS";
import DeliveryChallan from "./components/DeliveryChallan";
import DeliveryChallanKES from "./components/DeliveryChallanKES";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="PerformaInvoice" element={<PerformaInvoice />} />
          <Route path="PerformaInvoice/KES" element={<PerformaInvoiceKES />} />
          <Route path="PerformaInvoice/TKS" element={<PerformaInvoiceTKS />} />
          <Route path="TaxInvoice" element={<TaxInvoice />} />
          <Route path="TaxInvoice/KES" element={<TaxInvoiceKES />} />
          <Route path="TaxInvoice/TKS" element={<TaxInvoiceTKS />} />
          <Route path="QuotationInvoice" element={<QuotationInvoice />} />
          <Route
            path="QuotationInvoice/KES"
            element={<QuotationInvoiceKES />}
          />
          <Route
            path="QuotationInvoice/TKS"
            element={<QuotationInvoiceTKS />}
          />
          <Route path="PurchaseOrder" element={<PurchaseOrder />} />
          <Route path="PurchaseOrder/KES" element={<PurchaseOrderKES />} />
          <Route path="PurchaseOrder/TKS" element={<PurchaseOrderTKS />} />
          <Route path="DeliveryChallan" element={<DeliveryChallan />} />
          <Route path="DeliveryChallan/KES" element={<DeliveryChallanKES />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{
  /* <div className="formSection">
            <div className="formSectionHeading">Tax</div>
            <div className="formSubSection">
              <div className="formInputDiv">
                <label htmlFor="Tax">Taxes</label>
                <select
                  name="Tax"
                  id="Tax"
                  value={selectedTax}
                  onChange={handleTaxChange}
                >
                  <option value="SGSTandCGST">SGST + CGST</option>
                  <option value="IGST">IGST</option>
                </select>
              </div>
            </div>
            {selectedTax === "SGSTandCGST" && (
              <div className="formSubSection SGSTandCGST">
                <div className="formInputDiv">
                  <label htmlFor="SGST">
                    SGST in %<span>*</span>
                  </label>
                  <input
                    required
                    type="number"
                    id="SGST"
                    name="SGST"
                    defaultValue={9}
                  />
                </div>
                <div className="formInputDiv">
                  <label htmlFor="CGST">
                    CGST in %<span>*</span>
                  </label>
                  <input
                    required
                    type="number"
                    id="CGST"
                    name="CGST"
                    defaultValue={9}
                  />
                </div>
              </div>
            )}
            {selectedTax === "IGST" && (
              <div className="formSubSection IGST">
                <div className="formInputDiv">
                  <label htmlFor="IGST">
                    IGST in %<span>*</span>
                  </label>
                  <input
                    required
                    type="number"
                    id="IGST"
                    name="IGST"
                    defaultValue={18}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="formSection">
            {terms.map((termscondition, termsconditionIndex) => (
              <div
                className="formSubSection"
                style={{ alignItems: "flex-end" }}
                key={termsconditionIndex}
              >
                <div className="formInputDiv">
                  <label
                    htmlFor={`PaymentTermsandConditions-${termsconditionIndex}`}
                  >
                    Payment Terms & Conditions<span>*</span>
                  </label>
                  <input
                    required
                    id={`PaymentTermsandConditions-${termsconditionIndex}`}
                    name="PaymentTermsandConditions"
                    value={termscondition.terms}
                    onChange={(e) => handleTermsChange(termsconditionIndex, e)}
                  />
                </div>
                <div
                  className="formDeleteItem"
                  onClick={() => handleRemoveTerms(termsconditionIndex)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M20.25 4.5H16.5V3.75C16.5 3.15326 16.2629 2.58097 15.841 2.15901C15.419 1.73705 14.8467 1.5 14.25 1.5H9.75C9.15326 1.5 8.58097 1.73705 8.15901 2.15901C7.73705 2.58097 7.5 3.15326 7.5 3.75V4.5H3.75C3.55109 4.5 3.36032 4.57902 3.21967 4.71967C3.07902 4.86032 3 5.05109 3 5.25C3 5.44891 3.07902 5.63968 3.21967 5.78033C3.36032 5.92098 3.55109 6 3.75 6H4.5V19.5C4.5 19.8978 4.65804 20.2794 4.93934 20.5607C5.22064 20.842 5.60218 21 6 21H18C18.3978 21 18.7794 20.842 19.0607 20.5607C19.342 20.2794 19.5 19.8978 19.5 19.5V6H20.25C20.4489 6 20.6397 5.92098 20.7803 5.78033C20.921 5.63968 21 5.44891 21 5.25C21 5.05109 20.921 4.86032 20.7803 4.71967C20.6397 4.57902 20.4489 4.5 20.25 4.5ZM9 3.75C9 3.55109 9.07902 3.36032 9.21967 3.21967C9.36032 3.07902 9.55109 3 9.75 3H14.25C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75V4.5H9V3.75ZM18 19.5H6V6H18V19.5ZM10.5 9.75V15.75C10.5 15.9489 10.421 16.1397 10.2803 16.2803C10.1397 16.421 9.94891 16.5 9.75 16.5C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75V9.75C9 9.55109 9.07902 9.36032 9.21967 9.21967C9.36032 9.07902 9.55109 9 9.75 9C9.94891 9 10.1397 9.07902 10.2803 9.21967C10.421 9.36032 10.5 9.55109 10.5 9.75ZM15 9.75V15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5C14.0511 16.5 13.8603 16.421 13.7197 16.2803C13.579 16.1397 13.5 15.9489 13.5 15.75V9.75C13.5 9.55109 13.579 9.36032 13.7197 9.21967C13.8603 9.07902 14.0511 9 14.25 9C14.4489 9 14.6397 9.07902 14.7803 9.21967C14.921 9.36032 15 9.55109 15 9.75Z"
                      fill="white"
                    />
                  </svg>
                  <p>Remove</p>
                </div>
              </div>
            ))}
            <div className="formAddItem">
              <div className="formAddButton" onClick={handleAddTerms}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12.75 11.25V6H11.25V11.25H6V12.75H11.25V18H12.75V12.75H18V11.25H12.75Z"
                    fill="white"
                  />
                </svg>
                <p>Add Terms</p>
              </div>
            </div>
          </div> */
}
