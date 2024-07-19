import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PerformaInvoice from "./components/PerformaInvoice";
import PerformaInvoiceKES from "./components/PerformaInvoiceKES";
import PerformaInvoiceTKS from "./components/PerformaInvoiceTKS";
import TaxInvoice from "./components/TaxInvoice";
import TaxInvoiceKES from "./components/TaxInvoiceKES";
import TaxInvoiceTKS from "./components/TaxInvoiceTKS";

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
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
