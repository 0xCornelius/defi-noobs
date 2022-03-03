import React, { useState } from "react";
import AppHeader from "../../../components/app/app-header/app-header";
import SendHeader from "../send-header/send-header.component";
import RecipientInput from "./recipient-input.component";

export default function SendReceipient(props) {
  const [isInvalid, setIsInvalid] = useState(false);
  return (
    <div className="page-container">
      <AppHeader />
      <SendHeader />
      <RecipientInput {...props} setIsInvalid={setIsInvalid} />
      {isInvalid && (
        <div className="invalid-dialog">Recipient address is invalid</div>
      )}
    </div>
  );
}
