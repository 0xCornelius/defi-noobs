import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefiNoobsLogo from "../../../src/images/logo/defi-noobs-logo.png";
import { TextBubble } from "../ui/text-bubbles/text-bubbles";
import { NoGasStep } from "./no-gas-step/no-gas-step";
import { t } from "i18next";

export function StarterCourse({ setMetamaskAvailable }) {
  const account = useSelector((state) => state.account);

  const [userAddressInputed, setUserAddressInputed] = useState(false);

  const dispatch = useDispatch();

  const defiNoobsLogoElement = (
    <img className="logo" src={DefiNoobsLogo} alt="" />
  );

  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = (onlyAtStep) => {
    if (onlyAtStep === undefined || onlyAtStep === currentStep) {
      setCurrentStep((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    setMetamaskAvailable(true);
    dispatch({ type: "metamask/emptyAccount" });
    return () => setMetamaskAvailable(false);
  }, [setMetamaskAvailable, dispatch]);

  const onChangeUserAddress = (addressInput) => {
    if (!userAddressInputed && addressInput === account.address) {
      setTimeout(() => {
        dispatch({
          type: "metamask/updateAssetBalance",
          payload: { asset: "DAI", change: +200 },
        });
        setUserAddressInputed(true);
        goToNextStep();
      }, 0);
    }
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    });
    return <div ref={elementRef} />;
  };

  const userImage = (
    <div className="user-text-bubble">
      <div className="label font-weight-bold d-flex justify-content-center align-items-center text-white">
        YOU
      </div>
    </div>
  );

  const steps = [
    <TextBubble
      logo={defiNoobsLogoElement}
      onClick={() => goToNextStep(0)}
      text={
        <div>
          <div>
            {t(
              "Now that you are your own bank we can start learning to transact with it."
            )}
          </div>
          <div className="mt-2">
            {t(
              "You can click on the Metamask logo at any time to open your wallet."
            )}
          </div>
        </div>
      }
    />,
    <div>
      <TextBubble
        logo={defiNoobsLogoElement}
        text={
          <div>
            {t(
              "Let's start by learning how to recieve money. Can you give me your address so I can send you some tokens?"
            )}
            <div className="mt-2">
              {t(
                "Remember that the same address is used to receive any token."
              )}
            </div>
          </div>
        }
      />
      <TextBubble
        logo={userImage}
        side="right"
        text={
          <div>
            <input
              disabled={userAddressInputed}
              className="w-100  form-control"
              type="text"
              placeholder={t("Input your public address (0x)")}
              onChange={(event) => onChangeUserAddress(event.target.value)}
            />
          </div>
        }
      />
    </div>,
    <NoGasStep
      goToNextStep={goToNextStep}
      defiNoobsLogoElement={defiNoobsLogoElement}
      userImage={userImage}
    />,
  ];

  return (
    <div className="starter-course-container chat-background">
      <div className="starter-course px-5 mx-auto" id="starter-course">
        {Array.from(Array(currentStep + 1).keys()).map((step) => steps[step])}
        <AlwaysScrollToBottom />
      </div>
    </div>
  );
}
