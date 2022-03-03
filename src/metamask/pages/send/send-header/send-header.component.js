import React from 'react';
import { useNavigate, useLocation } from "react-router";

export default function SendHeader() {

  const navigate = useNavigate();
  const location = useLocation();
  
  const isSendRecipientStep = location.pathname === "/send"
  const title = isSendRecipientStep ? "Send to" : "Send";

  return (
    <div className="send-header">
      <div className="title">{title}</div>
      {isSendRecipientStep &&
      <button className="cancel-button" onClick={() => navigate(-1)}>
        Cancel
      </button>
      } 
    </div>
  );
}
