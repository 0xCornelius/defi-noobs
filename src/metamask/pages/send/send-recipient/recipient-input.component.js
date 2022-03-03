import React, { useState } from "react";
import classnames from "classnames";

import { isValidHexAddress } from "../../../helpers/utils/hexstring-utils";
import { useNavigate } from "react-router";

export default function RecipientInput({ setIsInvalid, handleInputData }) {
  const [recipient, setRecipient] = useState("");
  const [checkTimeout, setCheckTimeout] = useState();
  const hasSelectedAddress = false;
  const navigate = useNavigate();

  function onChange(newRecipient) {
    clearTimeout(checkTimeout);
    setRecipient(newRecipient);
    const isValidAddress = isValidHexAddress(newRecipient, {
      mixedCaseUseChecksum: true,
    });
    if (!isValidAddress) {
      setCheckTimeout(
        setTimeout(() => {
          setIsInvalid(true);
        }, 2000)
      );
    } else {
      setIsInvalid(false);
      navigate(`/send/${newRecipient}`);
      handleInputData("recipient", newRecipient);
    }
  }

  return (
    <div className={classnames("recipient-input")}>
      <div
        className={classnames("recipient-input__wrapper", {
          "recipient-input__wrapper__status-icon--error": false,
          "recipient-input__wrapper__status-icon--valid": false,
          "recipient-input__wrapper--valid": hasSelectedAddress,
        })}
      >
        <div
          className={classnames("recipient-input__wrapper__status-icon", {
            "recipient-input__wrapper__status-icon--valid": hasSelectedAddress,
          })}
        />
        {hasSelectedAddress ? (
          <>
            <div className="recipient-input__wrapper__input recipient-input__wrapper__input--selected">
              <div className="recipient-input__selected-input__title">
                {recipient}
              </div>
              {
                <div className="recipient-input__selected-input__subtitle">
                  {recipient}
                </div>
              }
            </div>
            <div
              className="recipient-input__wrapper__action-icon recipient-input__wrapper__action-icon--erase"
              onClick={this.props.onReset}
            />
          </>
        ) : (
          <>
            <input
              className="recipient-input__wrapper__input"
              type="text"
              dir="auto"
              placeholder={"Public address (0x)"}
              onChange={(event) => onChange(event.target.value)}
              spellCheck="false"
              value={recipient}
              autoFocus
              data-testid="recipient-input"
            />
          </>
        )}
      </div>
    </div>
  );
}
