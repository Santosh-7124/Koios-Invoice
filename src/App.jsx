import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PerformaInvoice from "./components/PerformaInvoice";
import PerformaInvoiceKES from "./components/PerformaInvoiceKES";
import PerformaInvoiceTKS from "./components/PerformaInvoiceTKS";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="PerformaInvoice" element={<PerformaInvoice />} />
          <Route path="PerformaInvoice/KES" element={<PerformaInvoiceKES />} />
          <Route path="PerformaInvoice/TKS" element={<PerformaInvoiceTKS />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
