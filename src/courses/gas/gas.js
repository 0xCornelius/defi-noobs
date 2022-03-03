import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefiNoobsLogo from "../../../src/images/logo/defi-noobs-logo.png";
import { TextBubble } from "../ui/text-bubbles/text-bubbles";
import { t } from "i18next";

import LegacyGas from "../../images/legacy_gas.png";
import EIP1559Gas from "../../images/EIP1559_gas.png";
import { CopyAddress } from "../../helpers/copy-address/copy-address";

export function GasCourse({ setMetamaskAvailable }) {
  const account = useSelector((state) => state.account);

  const dispatch = useDispatch();

  const vitalik = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";

  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = (onlyAtStep) => {
    if (onlyAtStep === undefined || onlyAtStep === currentStep) {
      setCurrentStep((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    setMetamaskAvailable(true);
    dispatch({ type: "metamask/emptyAccount" });
    dispatch({ type: "metamask/typicalAccount" });
    return () => setMetamaskAvailable(false);
  }, [setMetamaskAvailable, dispatch]);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    });
    return <div ref={elementRef} />;
  };

  const steps = [
    <TextBubble
      onClick={() => goToNextStep(0)}
      text={
        <div>
          {t(
            "Now that you learned the basic functions of a wallet let's understand how transaction fees work on the Ethereum blockchain."
          )}
        </div>
      }
    />,
    <TextBubble
      onClick={() => goToNextStep(1)}
      text={
        <div>
          {t(
            "Every time you interact with a blockchain you need to pay for fees for the computational effort required to do what you asked it to do."
          )}
          <div className="mt-2">
            {t(
              "This fees are paid in ETH and depend on the complexion of your transactions. Sending ETH is the cheapest transaction but interacting with smart contracts can be expensive."
            )}
          </div>
          <div className="mt-2 small">
            {t(
              "Gas: unit of measure for the amount of computational effort required to execute a sepecific transaction."
            )}
          </div>
        </div>
      }
    />,
    <TextBubble
      onClick={() => goToNextStep(2)}
      text={
        <div>
          {t(
            "There are two different versions for paying for transactions. Legacy transactions and EIP-1559 transactions."
          )}
          <div className="mt-2">{t("Let's learn how both of these work.")}</div>
        </div>
      }
    />,
    <TextBubble
      onClick={() => goToNextStep(3)}
      text={
        <div>
          {t("For legacy transactions you need two numbers:")}
          <div className="mt-2">
            {t(
              "Gas limit: Maximum amount of gas units your transaction can take (you shouldn't change this value most of the time)"
            )}
          </div>
          <div className="mt-2">
            {t(
              "Gas price: The amount of ETH you are willing to pay for each unit of gas."
            )}
          </div>
        </div>
      }
    />,
    <TextBubble
      onClick={() => goToNextStep(4)}
      text={
        <div>
          {t(
            "So with this, your max transaction spending results from multiplying your gas limit by your gas price. And this fee goes directly to the miners."
          )}
          <div className="mt-2">
            {t(
              "Transactions are usually executed in order by their gas price. The more you pay the earlier your transaction will be executed. If you don't have any rush you can lower your gas price and just wait."
            )}
          </div>
          <div className="mt-2 small">
            {t(
              "Take into consideration that some transactions are time sensitive and if it takes too long they can fail."
            )}
          </div>
        </div>
      }
    />,
    <TextBubble
      onClick={() => goToNextStep(5)}
      text={
        <div>
          {t("Here is an example on sending ETH with a legacy transaction:")}
          <img className="legacy-gas-image mt-2" src={LegacyGas} alt="" />
          <div className="mt-2">
            {t("And that's it for legacy transactions!")}
          </div>
        </div>
      }
    />,
    <TextBubble
      onClick={() => goToNextStep(6)}
      text={
        <div>
          {t(
            "Now let's go to EIP-1559 transactions. This mechanism was introduced to make transaction fees more predictable"
          )}
          <div className="mt-2">
            {t(
              "With EIP-1159 we separate the gas price into two numbers, base fee and tip."
            )}
          </div>
        </div>
      }
    />,
    <TextBubble
      onClick={() => goToNextStep(7)}
      text={
        <div>
          <div>
            {t(
              "The base fee is determined by how crowded was the blockchain for the last couple of minutes and is adjusted accordingly. This part of the fees is burned and doesn't go to the miner."
            )}
            🔥
          </div>
          <div className="mt-2">
            {t(
              "The tip (priority fee) is paid to the miner. The higher your priority fee the more chances you have for your transaction to be done soon."
            )}
          </div>
        </div>
      }
    />,
    <TextBubble
      onClick={() => goToNextStep(8)}
      text={
        <div>
          {t(
            "So in EIP-1559 your fee is calculated by multiplying the gas limit by (base fee + tip)"
          )}
          <div className="mt-2">
            <span>{t("Try sending something to ")}</span>
            <CopyAddress
              customClass={"d-inline-block"}
              asText={true}
              withShortAddress={true}
              address={vitalik}
            />
            <span>
              {t(
                " and experimenting with changing the base fee or tip to see how your fee changes."
              )}
            </span>
          </div>
          <div className="small mt-2">
            {t(
              'Hint: After selecting the asset and clicking "next" click on the edit button on top of the estimated gas fee.'
            )}
          </div>
        </div>
      }
    />,
  ];

  return (
    <div className="gas-course-container chat-background">
      <div className="gas-course px-5 mx-auto" id="gas-course">
        {Array.from(Array(currentStep + 1).keys()).map((step) => steps[step])}
        <AlwaysScrollToBottom />
      </div>
    </div>
  );
}
