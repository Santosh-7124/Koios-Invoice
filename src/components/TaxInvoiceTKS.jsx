   import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";
import TaxInvoiceTKSLayout from "./TaxInvoiceTKSLayout";

function TaxInvoiceTKS() {
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [billedPhoneNumberValue, billedPhoneNumberSetValue] = useState();
  const [items, setItems] = useState([
    {
      partName: "",
      details: [{ detail: "", quantity: "0", cost: "0", complimentary: false }],
    },
  ]);

  const [selectedTax, setSelectedTax] = useState("SGSTandCGST");

  const handleTaxChange = (event) => {
    setSelectedTax(event.target.value);
  };

  const [formData, setFormData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = document.getElementById("yourFormId");

    if (form) {
      setTimeout(() => {
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }

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
      showBankDetail: event.target.elements.showBankDetail.checked,
      PaymentTermsandConditions: terms,
    };

    setFormData(formData);
    console.log("Form Data:", formData);
  };

  const [terms, setTerms] = useState([{ terms: "" }]);

  const handleTermsChange = (index, event) => {
    const newTerms = [...terms];
    newTerms[index].terms = event.target.value;
    setTerms(newTerms);
  };

  const handleAddTerms = () => {
    setTerms([...terms, { terms: "" }]);
  };

  const handleRemoveTerms = (index) => {
    setTerms(terms.filter((_, i) => i !== index));
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        partName: "",
        details: [
          { detail: "", quantity: "0", cost: "0", complimentary: false },
        ],
      },
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
      quantity: "0",
      cost: "0",
      complimentary: false,
    });
    setItems(updatedItems);
  };

  const handleRemoveDetail = (itemIndex, detailIndex) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].details.splice(detailIndex, 1);
    setItems(updatedItems);
  };

  const handleDetailChange = (itemIndex, detailIndex, event) => {
    const { name, value, type, checked } = event.target;
    const updatedItems = [...items];

    if (type === "checkbox" && name === "complimentary") {
      updatedItems[itemIndex].details[detailIndex][name] = checked;
      if (checked) {
        updatedItems[itemIndex].details[detailIndex].quantity = 0;
        updatedItems[itemIndex].details[detailIndex].cost = 0;
      }
    } else {
      updatedItems[itemIndex].details[detailIndex][name] = value;
    }

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
          <p>The Koios Studio</p>
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
                <label htmlFor="billedToAddress">Address</label>
                <input
                  type="text"
                  id="billedToAddress"
                  name="billedToAddress"
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
                <div
                  className="formSubSection"
                  style={{ alignItems: "flex-end" }}
                >
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
                {item.details.map((detail, detailIndex) => (
                  <div
                    className="formSection Details"
                    key={`${index}-${detailIndex}`}
                  >
                    <div
                      className="formSubSection"
                      style={{ alignItems: "flex-end" }}
                    >
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
                          min="0"
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
                          min="0"
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
                    <div className="formCheckBox Complimentary">
                      <p>Complimentary</p>
                      <input
                        type="checkbox"
                        id={`complimentary${index}-${detailIndex}`}
                        name="complimentary"
                        checked={detail.complimentary}
                        onChange={(e) =>
                          handleDetailChange(index, detailIndex, e)
                        }
                      />
                    </div>
                  </div>
                ))}
                <div className="formAddDetail addDetails">
                  <div
                    className="formAddButton"
                    onClick={() => handleAddDetail(index)}
                  >
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
                    <p>Add Details</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="formAddItem">
              <div className="formAddButton" onClick={handleAddItem}>
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
                <p>Add Services</p>
              </div>
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
            <div className="formSectionHeading">Bank Details</div>
            <div className="formCheckBox">
              <label htmlFor="showBankDetail">Show Bank Detals</label>
              <input
                type="checkbox"
                id="showBankDetail"
                name="showBankDetail"
                value="showBankDetail"
              />
            </div>
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
          </div>
          <div className="formButton">
            <button type="submit">Generate</button>
          </div>
        </div>
      </form>
      <div id="yourFormId" style={{ paddingTop: "80px" }}>
        {formData && <TaxInvoiceTKSLayout data={formData} />}
      </div>
    </div>
  );
}

export default TaxInvoiceTKS;
