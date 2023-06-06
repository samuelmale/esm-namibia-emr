import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ExtensionSlot, attach, useSession } from "@openmrs/esm-framework";

export default function Root() {
  return (
    <BrowserRouter basename={window["getOpenmrsSpaBase"]()}>
      <Routes>
        <Route
          path="/namibia-home"
          element={<ExtensionSlot name="namibia-home-dashboard" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
