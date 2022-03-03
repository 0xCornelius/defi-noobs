import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { shortenAddress } from "../../../../helpers/utils/util";

import copyToClipboard from "copy-to-clipboard";
import Tooltip from "../../../../components/ui/tooltip";
import "react-tippy/dist/tippy.css";

export default function SendConfirmationHeader({ sendFormData }) {
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const [senderCopied, setSenderCopied] = useState(false);
  const [recipientCopied, setRecipientCopied] = useState(false);
  return (
    <div className="send-confirmation-header">
      <div className="edit">
        <div className="caret-left" />
        <button onClick={() => navigate(-1)} className="edit-button">
          Edit
        </button>
      </div>
      <div className="transaction-parties">
        <div className="transaction-sender transaction-party">
          <Tooltip
            wrapperClassName="selected-account__tooltip-wrapper"
            position="bottom"
            title={senderCopied ? "Copied!" : "Copy to clipboard"}
          >
            <button
              className="selected-account__clickable"
              onClick={() => {
                setSenderCopied(true);
                setTimeout(() => setSenderCopied(false), 1000 * 3);
                copyToClipboard(account.address);
              }}
            >
              <div className="sender-to-recipient__sender-icon"></div>
              {shortenAddress(account.address)}
            </button>
          </Tooltip>
        </div>
        <div className="transaction-direction-arrow">
          <div className="arrow-circle">
            <div className="arrow-icon" />
          </div>
        </div>
        <div className="transaction-recipient transaction-party">
          <Tooltip
            wrapperClassName="selected-account__tooltip-wrapper"
            position="bottom"
            title={recipientCopied ? "Copied!" : "Copy to clipboard"}
          >
            <button
              className="selected-account__clickable"
              onClick={() => {
                setRecipientCopied(true);
                setTimeout(() => setRecipientCopied(false), 1000 * 3);
                copyToClipboard(account.address);
              }}
            >
              {shortenAddress(sendFormData.recipient)}
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
