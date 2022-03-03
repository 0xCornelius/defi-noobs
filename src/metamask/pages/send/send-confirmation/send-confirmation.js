import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Identicon from "../../../components/ui/identicon/identicon.component";
import LoadingScreen from "../../../components/ui/loading-screen/loading-screen";
import SendConfirmationDetails from "./send-confirmation-details/send-confirmation-details";
import SendConfirmationHeader from "./send-confirmation-header/send-confirmation-header";
import alertRed from "../../../../images/alert-red.svg";

export default function SendConfirmation({ handleInputData, sendFormData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const [loading, setLoading] = useState(false);
  const isNativeTransfer = sendFormData.selectedAsset === "ETH";
  const selectedAsset = isNativeTransfer
    ? account.eth
    : account.assets[sendFormData.selectedAsset];
  const [gasFeeSelected, setGasFeeSelected] = useState({
    max: 0,
    estimated: 0,
  });

  const onConfirmSend = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch({
        type: "metamask/updateAssetBalance",
        payload: {
          asset: sendFormData.selectedAsset,
          change: -sendFormData.sendAmount,
        },
      });

      dispatch({
        type: "metamask/updateETHBalance",
        payload: {
          change: -gasFeeSelected.estimated,
        },
      });
      navigate("/");
    }, 2000);
  };

  const isInsufficientBalance = () => {
    const spendAmount = isNativeTransfer
      ? sendFormData.sendAmount * 1 + gasFeeSelected.max * 1
      : gasFeeSelected.max * 1;
    return account.eth.balance < spendAmount;
  };

  return (
    <div className="send-confirmation">
      {loading && <LoadingScreen />}
      <SendConfirmationHeader sendFormData={sendFormData} />
      <div className="action-summary">
        <div className="action-row">
          <div className="action">Transfer</div>
        </div>
        <div className="amount-row">
          <Identicon diameter={32} image={selectedAsset.logo} imageBorder />
          <div className="amount">
            {sendFormData.sendAmount} {sendFormData.selectedAsset}
          </div>
        </div>
      </div>
      <SendConfirmationDetails
        sendFormData={sendFormData}
        gasFeeSelected={gasFeeSelected}
        setGasFeeSelected={setGasFeeSelected}
      />
      {!loading && isInsufficientBalance() && (
        <div className="insufficient-funds-error">
          <div className="error-message">
            <img className="alert-icon" src={alertRed} alt=""></img>
            Insufficient funds.
          </div>
        </div>
      )}
      <div className="send-confirmation__footer">
        <footer>
          <button onClick={() => navigate("/")} className="reject-button">
            Reject
          </button>
          <button
            onClick={onConfirmSend}
            disabled={isInsufficientBalance()}
            className="confirm-button"
          >
            Confirm
          </button>
        </footer>
      </div>
    </div>
  );
}
