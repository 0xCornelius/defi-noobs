import React from "react";

export default function AdvancedGasControl({
  gasLimit,
  priorityFee,
  setPriorityFee,
  baseFee,
  setBaseFee,
}) {
  const onPriorityFeeChange = (newPriorityFee) => {
    setBaseFee(baseFee + (priorityFee - newPriorityFee));
    setPriorityFee(newPriorityFee);
  };

  const onBaseFeeChange = (newBaseFee) => {
    setBaseFee(newBaseFee - priorityFee);
  };

  return (
    <div className="advanced-gas-control">
      <div className="gas-limit form-field">
        <div className="label">Gas Limit</div>
        <div className="input-value">
          <input
            type="number"
            placeholder="0"
            dir="auto"
            disabled
            value={gasLimit}
          />
        </div>
      </div>
      <div className="priority-fee form-field">
        <div className="label">Max priority fee</div>
        <div className="input-value force-arrows">
          <input
            type="number"
            placeholder="0"
            dir="auto"
            onChange={(event) => onPriorityFeeChange(event.target.value)}
            value={priorityFee}
          />
        </div>
      </div>
      <div className="max-fee form-field">
        <div className="label">Max fee</div>
        <div className="input-value force-arrows">
          <input
            type="number"
            placeholder="0"
            dir="auto"
            onChange={(event) => onBaseFeeChange(event.target.value)}
            value={Number(baseFee) + Number(priorityFee)}
          />
        </div>
      </div>
    </div>
  );
}
