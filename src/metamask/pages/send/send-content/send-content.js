import classNames from "classnames";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AppHeader from "../../../components/app/app-header/app-header";
import Identicon from "../../../components/ui/identicon/identicon.component";
import SendHeader from "../send-header/send-header.component";

export default function SendContent({ handleInputData, sendFormData }) {

  const { recipient } = sendFormData;
  const account = useSelector((state) => state.account);
  const amount = sendFormData.sendAmount;
  const [isValidAmount, setIsValidAmount] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const selectedAsset =
    sendFormData.selectedAsset === "ETH"
      ? account.eth
      : account.assets[sendFormData.selectedAsset];

  const defaultAsset = account.eth;    

  const lengthInNumbers = (value) => {
    const pointSub = value.includes(".") ? -0.5 : 0;
    return value.length + pointSub;
  };

  const navigate = useNavigate();

  const onChangeAmount = (newAmount) => {
    const isValidAmount = newAmount <= selectedAsset.balance;
    setIsValidAmount(isValidAmount);
    handleInputData("sendAmount", newAmount);
  };

  const handleAssetChange = (newSelectedAsset) => {
    handleInputData("selectedAsset", newSelectedAsset);
    setShowDropdown(false);
  };

  const renderAsset = (
    { logo, name, balance },
    insideDropdown = false,
    customOnClick
  ) => (
    <div
      className={classNames("send-content__form-asset", {
        "asset-dropdown__asset": insideDropdown,
      })}
      onClick={customOnClick || (insideDropdown && (() => handleAssetChange(name)))}
    >
      <div className="send-content__form-asset-icon">
        <Identicon diameter={32} image={logo} imageBorder />
      </div>
      <div className="send-content__form-asset-data">
        <div className="send-content__form-asset-symbol">{name}</div>
        <div className="send-content__form-asset-balance">
          <span className="send-content__form-asset-balance-label">
            Balance:
          </span>
          <div className="send-content__form-asset-balance-amount">
            <span className="send-content__form-asset-balance-number">
              {balance}
            </span>
            <span className="send-content__form-asset-balance-suffix">
              {name}
            </span>
          </div>
        </div>
      </div>
      {!insideDropdown && (
        <i className="fa fa-caret-down fa-lg send-v2__asset-dropdown__caret" />
      )}
    </div>
  );

  const renderTokenDropdown = (selectedAsset, defaultAsset, otherAssets) => {
    const otherAssetsList = Object.values(otherAssets);

    return (
      <div className="asset-dropdown">
        {renderAsset(selectedAsset, false, () => setShowDropdown(true))}
        {otherAssetsList.length > 0
          ? renderAssetDropdown(defaultAsset, otherAssetsList)
          : null}
      </div>
    );
  };

  const renderAssetDropdown = (
    defaultAsset,
    otherAssets,
    renderDefault = true
  ) => {
    const otherAssetsList = Object.values(otherAssets);

    return (
      showDropdown && (
        <div>
          <div
            className="asset-dropdown__close-area"
            onClick={() => setShowDropdown(false)}
          />
          <div className="asset-dropdown__list">
            {renderDefault && renderAsset(defaultAsset, true)}
            {otherAssetsList.map((token) => renderAsset(token, true))}
          </div>
        </div>
      )
    );
  };

  return (
    <div className="send-content">
      <AppHeader />
      <SendHeader />
      <div className="send-content__header">
        <div className="recipient-address__wrapper">
          <div className="recipient-address__status-icon icon"></div>
          <div className="recipient-address__text">{recipient}</div>
          <div className="recipient-address__close-icon icon"></div>
        </div>
      </div>
      <div className="send-content__form">
        <div className="send-content__form-row">
          <div className="send-content__form-label">Asset:</div>
          <div className="send-content__form-field">
            {renderTokenDropdown(selectedAsset, defaultAsset, account.assets)}
          </div>
        </div>
        <div className="send-content__form-row">
          <div className="send-content__form-label">Amount:</div>
          <div className="send-content__form-field-container">
            <div
              className={classNames("send-content__form-field", {
                invalid: !isValidAmount,
              })}
            >
              <div className="send-content__form-amount no-arrows">
                <input
                  style={{
                    width: `${(amount ? lengthInNumbers(amount) : 1) + 1.5}ch`,
                  }}
                  className="send-content__form-amount-input"
                  type="number"
                  placeholder="0"
                  dir="auto"
                  onChange={(event) => onChangeAmount(event.target.value)}
                  value={amount}
                />
                <div>{selectedAsset.name}</div>
              </div>
            </div>
            {!isValidAmount && (
              <div className="send-content__form-amount-input-invalid">
                Insufficient funds.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="send-content__footer">
        <footer>
          <button
            onClick={() => navigate("/")}
            className="send-content__footer-cancel"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate("confirm")}
            disabled={!isValidAmount || !sendFormData.sendAmount}
            className="send-content__footer-next"
          >
            Next
          </button>
        </footer>
      </div>
    </div>
  );
}
