import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Purchase from "./components/Purchase";
import PurchaseKES from "./components/PurchaseKES";
import PurchaseTKS from "./components/PurchaseTKS";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="purchase/KES" element={<PurchaseKES />} />
          <Route path="purchase/TKS" element={<PurchaseTKS />} />
          <Route path="*" element={<Purchase />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
