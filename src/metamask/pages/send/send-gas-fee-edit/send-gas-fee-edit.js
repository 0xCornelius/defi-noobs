import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AdvancedGasControl from "../../../components/app/advanced-gas-control/advanced-gas-control";
import Popover from "../../../components/ui/popover";
import RadioGroup from "../../../components/ui/radio-group";
import {
  calculateGas,
  getDefaultGas,
  HIGH,
  LOW,
  MEDIUM,
} from "../../../helpers/utils/gas-module";

export default function SendGasFeeEdit({
  handleInputData,
  sendFormData,
  defaultSelectedBaseFee,
  defaultSelectedPriorityFee,
  estimatedGasUse,
  gasLimit,
  onClose,
  defaultGasSpeed,
  onSave,
}) {
  const scrollRef = useRef(null);

  const navigate = useNavigate();
  const account = useSelector((state) => state.account);

  const [gasSpeed, setGasSpeed] = useState(defaultGasSpeed);

  const gas = getDefaultGas(gasSpeed);

  const [selectedBaseFee, setSelectedBaseFee] = useState(
    defaultGasSpeed ? gas.baseFee : defaultSelectedBaseFee
  );
  const [selectedPriorityFee, setSelectedPriorityFee] = useState(
    defaultGasSpeed ? gas.priorityFee : defaultSelectedPriorityFee
  );

  const [showAdvancedForm, setShowAdvancedForm] = useState(false);
  
  useEffect(() => {
    if (gasSpeed && gas) {
      setSelectedBaseFee(gas.baseFee);
      setSelectedPriorityFee(gas.priorityFee);
    }
  }, [gas, gasSpeed]);

  useLayoutEffect(() => {
    if (showAdvancedForm && scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [showAdvancedForm]);

  const gasFee = calculateGas(
    gasLimit,
    estimatedGasUse,
    selectedBaseFee,
    selectedPriorityFee
  );

  const onCustomBaseFeeSelected = (customBaseFee) => {
    setGasSpeed(undefined);
    setSelectedBaseFee(customBaseFee)
  } 

   const onCustomPriorityFeeSelected = (customPriorityFee) => {
     setGasSpeed(undefined);
     setSelectedPriorityFee(customPriorityFee);
   }; 

  return (
    <Popover
      title={"Edit priority"}
      className="edit-gas-popover__wrapper"
      onClose={onClose}
      footer={
        <div className="edit-gas-popover-save-button">
          <button
            onClick={() =>
              onSave({
                gasSpeed: gasSpeed,
                baseFee: selectedBaseFee,
                priorityFee: selectedPriorityFee,
              })
            }
            disabled={false}
            className="confirm-button"
          >
            Save
          </button>
        </div>
      }
    >
      <div className="send-gas-fee-edit">
        <div className="gas-cost">
          <div className="estimated-cost">~ {gasFee.estimated} ETH</div>
          <div className="max-cost">
            <span className="label">Max fee: </span>
            <span className="amount">{gasFee.max} ETH</span>
          </div>
        </div>
        <div className="gas-speed-selector">
          <RadioGroup
            name="gas-recommendation"
            options={[
              {
                value: LOW,
                label: "Low",
              },
              {
                value: MEDIUM,
                label: "Medium",
              },
              {
                value: HIGH,
                label: "High",
              },
            ]}
            selectedValue={gasSpeed}
            onChange={setGasSpeed}
          />
        </div>
        <div className="advanced-options">
          <button
            className="advanced-options-button"
            onClick={() => {
              setShowAdvancedForm(!showAdvancedForm);
            }}
          >
            Advanced Options
            {showAdvancedForm ? (
              <i className="fa fa-caret-up"></i>
            ) : (
              <i className="fa fa-caret-down"></i>
            )}
          </button>
          {showAdvancedForm && (
            <AdvancedGasControl
              gasLimit={gasLimit}
              baseFee={selectedBaseFee}
              setBaseFee={onCustomBaseFeeSelected}
              priorityFee={selectedPriorityFee}
              setPriorityFee={onCustomPriorityFeeSelected}
            />
          )}
        </div>
        <div ref={scrollRef} className="edit-gas-display__scroll-bottom" />
      </div>
    </Popover>
  );
}
