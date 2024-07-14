import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";
import TaxInvoiceKESLayout from "./TaxInvoiceKESLayout"

function TaxInvoiceKES() {
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [billedPhoneNumberValue, billedPhoneNumberSetValue] = useState();
  const [items, setItems] = useState([
    { partName: "", details: [{ detail: "", quantity: "", cost: "" }] },
  ]);

  const [selectedTax, setSelectedTax] = useState("SGSTandCGST");

  const handleTaxChange = (event) => {
    setSelectedTax(event.target.value);
  };

  const [formData, setFormData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    let SGST = "";
    let CGST = "";
    let IGST = "";

    if (selectedTax === "SGSTandCGST") {
      SGST = event.target.elements.SGST.value || "";
      CGST = event.target.elements.CGST.value || "";
    } else if (selectedTax === "IGST") {
      IGST = event.target.elements.IGST.value || "";
    }

    let formData = {
      InvoiceNo: event.target.elements.InvoiceNo.value,
      InvoiceDate: event.target.elements.InvoiceDate.value,
      referenceNumber: event.target.elements.referenceNumber.value,
      billedToCompany: event.target.elements.billedToCompany.value,
      billedToGSTIN: event.target.elements.billedToGSTIN.value,
      billedToPAN: event.target.elements.billedToPAN.value,
      billedToAddress: event.target.elements.billedToAddress.value,
      billedToPhoneNumber: billedPhoneNumberValue,
      items: items,
      Tax: selectedTax,
      SGST: SGST,
      CGST: CGST,
      IGST: IGST,
      PaymentTermsandConditions:
        event.target.elements.PaymentTermsandConditions.value,
    };

    setFormData(formData);
    console.log("Form Data:", formData);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { partName: "", details: [{ detail: "", quantity: "", cost: "" }] },
    ]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);
  };

  const handleAddDetail = (itemIndex) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].details.push({
      detail: "",
      quantity: "",
      cost: "",
    });
    setItems(updatedItems);
  };

  const handleRemoveDetail = (itemIndex, detailIndex) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].details.splice(detailIndex, 1);
    setItems(updatedItems);
  };

  const handleDetailChange = (itemIndex, detailIndex, event) => {
    const { name, value } = event.target;
    const updatedItems = [...items];
    updatedItems[itemIndex].details[detailIndex][name] = value;
    setItems(updatedItems);
  };

  return (
    <div>
      <div className="heading">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>{">"}</span>
          <Link to="/TaxInvoice ">Tax Invoice </Link>
          <span>{">"}</span>
          <p>Koios Engineering Service</p>
        </div>
        <p>Tax Invoice</p>
      </div>
      <form id="PurchaseKES" name="PurchaseKES" onSubmit={handleSubmit}>
        <div className="formContainer">
          <div className="formSection">
            <div className="formSectionHeading">Billed To</div>
            <div className="formSubSection">
              <div className="formInputDiv">
                <label htmlFor="billedToCompany">
                  Company<span>*</span>
                </label>
                <input
                  required
                  type="text"
                  id="billedToCompany"
                  name="billedToCompany"
                  placeholder="Company Here"
                />
              </div>
            </div>
            <div className="formSubSection">
              <div className="formInputDiv">
                <label htmlFor="referenceNumber">
                  Reference Number<span>*</span>
                </label>
                <input
                  required
                  type="text"
                  id="referenceNumber"
                  name="referenceNumber"
                  placeholder="Reference Number"
                />
              </div>
            </div>
            <div className="formSubSection">
              <div className="formInputDiv">
                <label htmlFor="InvoiceNo">
                  Invoice No<span>*</span>
                </label>
                <input
                  required
                  type="text"
                  id="InvoiceNo"
                  name="InvoiceNo"
                  placeholder="0000"
                />
              </div>
              <div className="formInputDiv">
                <label htmlFor="InvoiceDate">
                  Invoice Date<span>*</span>
                </label>
                <input
                  required
                  type="date"
                  id="InvoiceDate"
                  name="InvoiceDate"
                  defaultValue={getTodayDate()}
                />
              </div>
            </div>
            <div className="formSubSection">
              <div className="formInputDiv">
                <label htmlFor="billedToGSTIN">GSTIN</label>
                <input
                  type="text"
                  id="billedToGSTIN"
                  name="billedToGSTIN"
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>
              <div className="formInputDiv">
                <label htmlFor="billedToPAN">PAN</label>
                <input
                  type="text"
                  id="billedToPAN"
                  name="billedToPAN"
                  placeholder="ABCTY1234D"
                />
              </div>
            </div>
            <div className="formSubSection">
              <div className="formInputDiv">
                <label htmlFor="billedToAddress">Address</label>
                <input
                  type="text"
                  id="billedToAddress"
                  name="billedToAddress"
                />
              </div>
              <div className="formInputDiv">
                <label htmlFor="billedToPhoneNumber">Phone Number</label>
                <PhoneInput
                  placeholder="Enter phone number"
                  country="IN"
                  value={billedPhoneNumberValue}
                  onChange={billedPhoneNumberSetValue}
                  id="billedToPhoneNumber"
                />
              </div>
            </div>
          </div>
          <div className="formSection">
            <div className="formSectionHeading">Services</div>
            {items.map((item, index) => (
              <div className="formItems Services" key={index}>
                <div className="formSubSection">
                  <div className="formInputDiv">
                    <label htmlFor={`partName${index}`}>
                      Services<span>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      id={`partName${index}`}
                      name="partName"
                      value={item.partName}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>
                  <div
                    className="formDeleteItem"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="60px"
                      height="60px"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M10 11V17"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 11V17"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 7H20"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                {item.details.map((detail, detailIndex) => (
                  <div className="formSection Details">
                    <div className="formSubSection " key={detailIndex}>
                      <div className="formInputDiv">
                        <label htmlFor={`detail${index}-${detailIndex}`}>
                          Detail<span>*</span>
                        </label>
                        <input
                          required
                          type="text"
                          id={`detail${index}-${detailIndex}`}
                          name="detail"
                          value={detail.detail}
                          onChange={(e) =>
                            handleDetailChange(index, detailIndex, e)
                          }
                        />
                      </div>
                      <div className="formInputDiv">
                        <label htmlFor={`quantity${index}-${detailIndex}`}>
                          Quantity<span>*</span>
                        </label>
                        <input
                          required
                          type="number"
                          id={`quantity${index}-${detailIndex}`}
                          name="quantity"
                          value={detail.quantity}
                          onChange={(e) =>
                            handleDetailChange(index, detailIndex, e)
                          }
                        />
                      </div>
                      <div className="formInputDiv">
                        <label htmlFor={`cost${index}-${detailIndex}`}>
                          Cost<span>*</span>
                        </label>
                        <input
                          required
                          type="number"
                          id={`cost${index}-${detailIndex}`}
                          name="cost"
                          value={detail.cost}
                          onChange={(e) =>
                            handleDetailChange(index, detailIndex, e)
                          }
                        />
                      </div>
                      <div
                        className="formDeleteItem"
                        onClick={() => handleRemoveDetail(index, detailIndex)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="60px"
                          height="60px"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M10 11V17"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 11V17"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4 7H20"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="formCheckBox Complimentary">
                      <p>Complimentary</p>
                      <input
                        type="checkbox"
                        id="Complimentary"
                        name="Complimentary"
                        value="Complimentary"
                      />
                    </div>
                  </div>
                ))}
                <div
                  className="formAddDetail addDetails"
                  onClick={() => handleAddDetail(index)}
                >
                  <p>Add details</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12.75 11.25V6H11.25V11.25H6V12.75H11.25V18H12.75V12.75H18V11.25H12.75Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            ))}
            <div className="formAddItem" onClick={handleAddItem}>
              <p>Add Services</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12.75 11.25V6H11.25V11.25H6V12.75H11.25V18H12.75V12.75H18V11.25H12.75Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <div className="formSection">
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
            <div className="formSubSection">
              <div className="formInputDiv">
                <label htmlFor="PaymentTermsandConditions">
                  Payment Terms & Conditions<span>*</span>
                </label>
                <textarea
                  required
                  id="PaymentTermsandConditions"
                  name="PaymentTermsandConditions"
                />
              </div>
            </div>
          </div>
          <div className="formButton">
            <button type="submit">Generate</button>
          </div>
        </div>
      </form>
      {formData && <TaxInvoiceKESLayout formData={formData} />}
    </div>
  );
}

export default TaxInvoiceKES;
