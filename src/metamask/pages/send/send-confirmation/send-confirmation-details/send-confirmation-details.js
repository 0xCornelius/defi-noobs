import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  calculateGas, erc20Transfer,
  ethTransfer,
  getDefaultGas,
  MEDIUM
} from "../../../../helpers/utils/gas-module.js";
import SendGasFeeEdit from "../../send-gas-fee-edit/send-gas-fee-edit.js";

export default function SendConfirmationDetails({
  sendFormData,
  setGasFeeSelected,
}) {
  const account = useSelector((state) => state.account);
  const [gasSpeed, setGasSpeed] = useState(MEDIUM);

  const gas = getDefaultGas(gasSpeed);

  const [selectedBaseFee, setSelectedBaseFee] = useState(gas.baseFee);
  const [selectedPriorityFee, setSelectedPriorityFee] = useState(
    gas.priorityFee
  );
  const [showEditGas, setShowEditGas] = useState(false);

  const isNativeTransfer = sendFormData.selectedAsset === "ETH";

  const gasUsage = isNativeTransfer ? ethTransfer : erc20Transfer;

  useEffect(() => {
    if (gasSpeed && gas) {
      setSelectedBaseFee(gas.baseFee);
      setSelectedPriorityFee(gas.priorityFee);
    }
  }, [gas, gasSpeed, setSelectedBaseFee, setSelectedPriorityFee]);

  const { limit, estim } = gasUsage;

  const gasFee = useMemo(
    () => calculateGas(limit, estim, selectedBaseFee, selectedPriorityFee),
    [limit, estim, selectedBaseFee, selectedPriorityFee]
  );

  useEffect(() => {
    setGasFeeSelected(gasFee);
  }, [gasFee, setGasFeeSelected]);

  const onSave = ({ gasSpeed, baseFee, priorityFee }) => {
    if (!gasSpeed) {
      setSelectedBaseFee(baseFee);
      setSelectedPriorityFee(priorityFee);
    }
    setGasSpeed(gasSpeed);
    setShowEditGas(false);
  };

  const total = {
    total: isNativeTransfer
      ? `${gasFee.estimated * 1 + sendFormData.sendAmount * 1} ETH`
      : `${sendFormData.sendAmount} ${sendFormData.selectedAsset} + ${gasFee.estimated} ETH`,
    maxAmount: isNativeTransfer
      ? `${gasFee.max * 1 + sendFormData.sendAmount * 1} ETH`
      : `${sendFormData.sendAmount} ${sendFormData.selectedAsset} + ${gasFee.max} ETH`,
  };

  return (
    <div className="send-confirmation-details">
      {showEditGas && (
        <SendGasFeeEdit
          defaultSelectedBaseFee={selectedBaseFee}
          defaultSelectedPriorityFee={selectedPriorityFee}
          estimatedGasUse={gasUsage.estim}
          gasLimit={gasUsage.limit}
          onClose={() => setShowEditGas(false)}
          defaultGasSpeed={gasSpeed}
          setGasSpeed={setGasSpeed}
          onSave={onSave}
        />
      )}
      <div className="edit">
        <button onClick={() => setShowEditGas(true)} className="edit-button">
          Edit
        </button>
      </div>
      <div className="details-rows">
        <div className="detail-item">
          <div className="detail-item-row">
            <div className="detail-item-label bold">Estimated gas fee</div>
            <div className="detail-item-value">
              <div className="estimated-gas-amount bold">
                {gasFee.estimated} ETH
              </div>
            </div>
          </div>
          <div className="detail-item-row">
            <div className="detail-item-lable"></div>
            <div className="detail-item-value">
              <div className="max-fee-value">
                <div className="max-fee-label bold">Max fee:</div>
                <div className="max-fee-amount">{gasFee.max} ETH</div>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-item">
          <div className="detail-item-row">
            <div className="detail-item-label bold">Total</div>
            <div className="detail-item-value">
              <div className="total-amount bold">{total.total}</div>
            </div>
          </div>
          <div className="detail-item-row">
            <div className="detail-item-label-small">Amount + gas fee</div>
            <div className="detail-item-value">
              <div className="max-fee-value">
                <div className="max-fee-label bold">Max amount:</div>
                <div className="max-fee-amount">{total.maxAmount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
