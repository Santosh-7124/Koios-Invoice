import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";
import PerformaInvoiceTKSLayout from "./PerformaInvoiceTKSLayout";
function PerformaInvoiceTKS() {
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [placeOfSupply, setPlaceOfSupply] = useState("Bengaluru");

  const handleChange = (event) => {
    setPlaceOfSupply(event.target.value);
  };

  const [shippedPhoneNumberValue, shippedPhoneNumberSetValue] = useState();
  const [billedPhoneNumberValue, billedPhoneNumberSetValue] = useState();
  const [items, setItems] = useState([
    { partName: "", HSNCode: "", Quantity: "", Cost: "" },
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

    let shippedToCompany = "";
    let shippedToGSTIN = "";
    let shippedToPAN = "";
    let shippedToAddress = "";
    let shippedToPhoneNumber = "";

    if (event.target.elements.shippedToDefault.checked) {
      shippedToCompany = "Koios Software Solutions PVT Ltd";
      shippedToGSTIN = "22AAAAA1234A1Z7";
      shippedToPAN = "QHYUN1234T";
      shippedToAddress =
        "No.315/64, Mallasandra village , off holiday village road, Thalaghattapura, Bangalore, Bangalore South, Karnataka, India, 560109";
      shippedToPhoneNumber = "+911234567890";
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
      piNo: event.target.elements.piNo.value,
      piDate: event.target.elements.piDate.value,
      leadTime: event.target.elements.leadTime.value,
      referenceNumber: event.target.elements.referenceNumber.value,
      placeOfSupply: event.target.elements.placeOfSupply.value,
      billedToCompany: event.target.elements.billedToCompany.value,
      billedToGSTIN: event.target.elements.billedToGSTIN.value,
      billedToPAN: event.target.elements.billedToPAN.value,
      billedToAddress: event.target.elements.billedToAddress.value,
      billedToPhoneNumber: billedPhoneNumberValue,
      shippedToCompany: event.target.elements.shippedToCompany.value,
      shippedToGSTIN: event.target.elements.shippedToGSTIN.value,
      shippedToPAN: event.target.elements.shippedToPAN.value,
      shippedToAddress: event.target.elements.shippedToAddress.value,
      shippedToPhoneNumber: shippedPhoneNumberValue,
      shippedToDefault: event.target.elements.shippedToDefault.checked,
      items: items,
      Tax: selectedTax,
      SGST: SGST,
      CGST: CGST,
      IGST: IGST,
      PaymentTermsandConditions: terms,
    };

    if (event.target.elements.shippedToDefault.checked) {
      formData.shippedToCompany = shippedToCompany;
      formData.shippedToGSTIN = shippedToGSTIN;
      formData.shippedToPAN = shippedToPAN;
      formData.shippedToAddress = shippedToAddress;
      formData.shippedToPhoneNumber = shippedToPhoneNumber;
    }
    setFormData(formData);
    console.log("Form Data:", formData);
  };

  const [terms, setTerms] = useState([{ terms: "" }]);

  // Function to handle change in terms input field
  const handleTermsChange = (index, event) => {
    const newTerms = [...terms];
    newTerms[index].terms = event.target.value;
    setTerms(newTerms);
  };

  // Function to handle adding new terms
  const handleAddTerms = () => {
    setTerms([...terms, { terms: "" }]);
  };

  // Function to handle removing terms
  const handleRemoveTerms = (index) => {
    setTerms(terms.filter((_, i) => i !== index));
  };

  const handleAddItem = () => {
    setItems([...items, { partName: "", HSNCode: "", Quantity: "", Cost: "" }]);
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

  return (
    <div>
      <div className="heading">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>{">"}</span>
          <Link to="/PerformaInvoice ">Performa Invoice </Link>
          <span>{">"}</span>
          <p>The Koios Studio</p>
        </div>
        <p>Performa Invoice</p>
      </div>
      <form id="PurchaseKES" name="PurchaseKES" onSubmit={handleSubmit}>
        <div className="formContainer">
          <div className="formSection">
            <div className="formSubSection">
              <div className="formInputDiv">
                <label htmlFor="piNo">
                  PI No<span>*</span>
                </label>
                <input
                  required
                  type="text"
                  id="piNo"
                  name="piNo"
                  placeholder="Enter PI No"
                />
              </div>
              <div className="formInputDiv">
                <label htmlFor="piDate">
                  PI Date<span>*</span>
                </label>
                <input
                  required
                  type="date"
                  id="piDate"
                  name="piDate"
                  defaultValue={getTodayDate()}
                />
              </div>
              <div className="formInputDiv">
                <label htmlFor="leadTime">
                  Lead Time<span>*</span>
                </label>
                <input
                  required
                  type="text"
                  id="leadTime"
                  name="leadTime"
                  placeholder="Enter Lead Time"
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
              <div className="formInputDiv">
                <label htmlFor="placeOfSupply">Place of Supply</label>
                <input
                  type="text"
                  id="placeOfSupply"
                  name="placeOfSupply"
                  value={placeOfSupply}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
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
                <label htmlFor="billedToPhoneNumber">
                  Phone Number<span>*</span>
                </label>
                <PhoneInput
                  placeholder="Enter phone number"
                  country="IN"
                  value={billedPhoneNumberValue}
                  required
                  onChange={billedPhoneNumberSetValue}
                  id="billedToPhoneNumber"
                />
              </div>
            </div>
          </div>
          <div className="formSection">
            <div className="formSectionHeading">Shipped To</div>
            <div className="formSubSection">
              <div className="formInputDiv">
                <label htmlFor="shippedToCompany">Company</label>
                <input
                  type="text"
                  id="shippedToCompany"
                  name="shippedToCompany"
                  placeholder="Company Here"
                />
              </div>
            </div>
            <div className="formSubSection">
              <div className="formInputDiv">
                <label htmlFor="shippedToAddress">Address</label>
                <input
                  type="text"
                  id="shippedToAddress"
                  name="shippedToAddress"
                />
              </div>
            </div>
            <div className="formSubSection">
              <div className="formInputDiv">
                <label htmlFor="shippedToGSTIN">GSTIN</label>
                <input
                  type="text"
                  id="shippedToGSTIN"
                  name="shippedToGSTIN"
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>
              <div className="formInputDiv">
                <label htmlFor="shippedToPAN">PAN</label>
                <input
                  type="text"
                  id="shippedToPAN"
                  name="shippedToPAN"
                  placeholder="ABCTY1234D"
                />
              </div>
              <div className="formInputDiv">
                <label htmlFor="shippedToPhoneNumber">Phone Number</label>
                <PhoneInput
                  placeholder="Enter phone number"
                  country="IN"
                  value={shippedPhoneNumberValue}
                  onChange={shippedPhoneNumberSetValue}
                  id="shippedToPhoneNumber"
                />
              </div>
            </div>
            <div className="formCheckBox">
              <label htmlFor="shippedToDefault">Default</label>
              <input
                type="checkbox"
                id="shippedToDefault"
                name="shippedToDefault"
                value="shippedToDefault"
              />
            </div>
          </div>
          <div className="formSection">
            <div className="formSectionHeading">Items</div>
            {items.map((item, index) => (
              <div className="formItems" key={index}>
                <div
                  className="formSubSection"
                  style={{ alignItems: "flex-end" }}
                >
                  <div className="formInputDiv">
                    <label htmlFor={`partName${index}`}>
                      Part Name<span>*</span>
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
                <div className="formSubSection">
                  <div className="formInputDiv">
                    <label htmlFor={`HSNCode${index}`}>HSN Code</label>
                    <input
                      type="text"
                      id={`HSNCode${index}`}
                      name="HSNCode"
                      value={item.HSNCode}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>
                  <div className="formInputDiv">
                    <label htmlFor={`Quantity${index}`}>
                      Quantity<span>*</span>
                    </label>
                    <input
                      required
                      type="number"
                      id={`Quantity${index}`}
                      name="Quantity"
                      value={item.Quantity}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>
                  <div className="formInputDiv">
                    <label htmlFor={`Cost${index}`}>
                      Cost<span>*</span>
                    </label>
                    <input
                      required
                      type="number"
                      id={`Cost${index}`}
                      name="Cost"
                      value={item.Cost}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="formAddItem" onClick={handleAddItem}>
              <div className="formAddButton">
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
                <p>Add Items</p>
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
        {formData && <PerformaInvoiceTKSLayout data={formData} />}
      </div>
    </div>
  );
}

export default PerformaInvoiceTKS;
