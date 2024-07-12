import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";
import PerformaInvoiceKESLayout from "./PerformaInvoiceKESLayout";

function PerformaInvoiceKES() {
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
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

    let shippedToCompany = "";
    let shippedToGSTIN = "";
      let shippedToPAN = "";
    let shippedToAddress = "";
    let shippedToPhoneNumber = "";

    if (event.target.elements.shippedToDefault.checked) {
      shippedToCompany = "Koios Engineering Solutions PVT Ltd";
      shippedToGSTIN = "22AAAAA1234A1Z7";
      shippedToPAN = "QHYUN1234T";
      shippedToAddress =
        "No. 57/D, Balaji Layout, Vajarahalli, Near 100ft road, off Knakapura main road Thalaghattapura,Bangalore South, Bangalore - 560109.";
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
      PaymentTermsandConditions:
        event.target.elements.PaymentTermsandConditions.value,
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
          <p>Koios Engineering Service</p>
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
                  placeholder="Bengaluru"
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
                <div className="formSubSection">
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
                        d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="formSubSection">
                  <div className="formInputDiv">
                    <label htmlFor={`HSNCode${index}`}>
                      HSN Code<span>*</span>
                    </label>
                    <input
                      required
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
              <p>Add Items</p>
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
            {/* Conditional rendering based on selectedTax */}
            {selectedTax === "SGSTandCGST" && (
              <div className="formSubSection SGSTandCGST">
                <div className="formInputDiv">
                  <label htmlFor="SGST">
                    SGST in %<span>*</span>
                  </label>
                  <input required type="number" id="SGST" name="SGST" defaultValue={9} />
                </div>
                <div className="formInputDiv">
                  <label htmlFor="CGST">CGST in %<span>*</span></label>
                  <input required type="number" id="CGST" name="CGST" defaultValue={9} />
                </div>
              </div>
            )}
            {selectedTax === "IGST" && (
              <div className="formSubSection IGST">
                <div className="formInputDiv">
                  <label htmlFor="IGST">IGST in %<span>*</span></label>
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
      {formData && <PerformaInvoiceKESLayout data={formData} />}
    </div>
  );
}

export default PerformaInvoiceKES;
