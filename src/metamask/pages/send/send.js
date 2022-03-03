import React, { useState } from "react";
import { Route, Routes } from "react-router";
import SendConfirmation from "./send-confirmation/send-confirmation";
import SendContent from "./send-content/send-content";
import SendHeader from "./send-header/send-header.component";
import SendReceipient from "./send-recipient/send-recipient.component";

export default function SendPage() {
  const [sendFormData, setSendFormData] = useState({
    selectedAsset: "ETH",
  });

  const handleInputData = (name, value) => {
    setSendFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="page-container">
      <Routes>
        <Route
          path="/"
          element={
            <SendReceipient
              sendFormData={sendFormData}
              handleInputData={handleInputData}
            />
          }
        />
        <Route
          path="/:id"
          element={
            <SendContent
              sendFormData={sendFormData}
              handleInputData={handleInputData}
            />
          }
        />
        <Route
          path="/:id/confirm"
          element={
            <SendConfirmation
              sendFormData={sendFormData}
              handleInputData={handleInputData}
            />
          }
        />
      </Routes>
    </div>
  );
}
