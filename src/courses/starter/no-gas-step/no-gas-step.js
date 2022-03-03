import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CopyAddress } from "../../../helpers/copy-address/copy-address";
import { TextBubble } from "../../ui/text-bubbles/text-bubbles";
import { t } from "i18next";

export function NoGasStep({ goToNextStep, defiNoobsLogoElement, userImage }) {
  const vitalik = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [clickedDone, setClickedDone] = useState(false);
  const [clickedCant, setClickedCant] = useState(false);
  const [daiReceived, setDaiReceived] = useState();

  const daiBalance = useSelector(
    (state) => state.account.assets["DAI"].balance
  );
  const prevDaiBalance = useRef();

  useEffect(() => {
    if (clickedCant && !daiReceived) {
      setDaiReceived(prevDaiBalance.current - daiBalance);
      prevDaiBalance.current = daiBalance;
    }
  }, [daiBalance, clickedCant, daiReceived]);

  useEffect(() => {
    if (clickedCant) {
      dispatch({
        type: "metamask/updateAssetBalance",
        payload: { asset: "ETH", change: +0.5 },
      });
    }
  }, [clickedCant, dispatch]);

  useEffect(() => {
    if (clickedDone) {
      //I have no idea why I need to call dispatch with an event to "refresh" so that it autoscrolls to the bottom.
      dispatch({
        type: "metamask/updateAssetBalance",
        payload: { asset: "ETH", change: 0 },
      });
    }
  }, [clickedDone, dispatch]);

  return (
    <div className="no-gas-step">
      <TextBubble
        logo={defiNoobsLogoElement}
        text={
          <div>
            <div>
              {t(
                "Good job! Check your wallet, you should have 200 DAI more in your balance!"
              )}
            </div>
            <div className="mt-2">
              {t("Now let's learn to send some money.")}
              <div className="d-flex mt-2">
                <span className="me-2">{t("Send 100 DAI to")}</span>
                <CopyAddress
                  asText={true}
                  withShortAddress={true}
                  address={vitalik}
                />
              </div>
              <div className="mt-2 small">{t("Hint: Click on Send, then input my address and select DAI as asset")}</div>
            </div>
          </div>
        }
      />
      <TextBubble
        logo={userImage}
        side="right"
        text={
          <div className="text-center row px-4">
            <div className="col">
              <button
                onClick={() => setClickedDone(true)}
                type="button"
                className="btn btn-primary w-100"
                disabled={clickedDone || clickedCant}
              >
                {t("Done")}
              </button>
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => setClickedCant(true)}
                disabled={clickedDone || clickedCant}
              >
                {t("I can't")}
              </button>
            </div>
          </div>
        }
      />
      {clickedDone && (
        <div>
          <TextBubble
            logo={defiNoobsLogoElement}
            text={
              <div>
                {t(
                  "Are you sure? I don't see anything in my wallet. Can you check again?"
                )}
              </div>
            }
          />
          <TextBubble
            logo={userImage}
            side="right"
            text={
              <div className="text-center row px-4">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-secondary w-50"
                    onClick={() => setClickedCant(true)}
                    disabled={clickedCant}
                  >
                    {t("I can't")}
                  </button>
                </div>
              </div>
            }
          />
        </div>
      )}
      {clickedCant && (
        <div>
          <TextBubble
            logo={defiNoobsLogoElement}
            text={
              <div>
                {t(
                  "Oh right! You don't own any ETH. In the Ethereum network you have to pay a fee for every transaction and that fee has to be paid in ETH."
                )}
                <div className="mt-2">
                  {t(
                    "Let me send you some ETH so you can pay fees. Check your wallet, you should have 0.5 ETH more to your balance!"
                  )}
                </div>
              </div>
            }
          />
          <TextBubble
            logo={defiNoobsLogoElement}
            text={
              <div>
                <div>{t("Can you try again and send me the 100 DAI?")}</div>
                <div className="d-flex mt-2">
                  <span className="me-2">{t("Here is my address")}</span>
                  <CopyAddress
                    asText={true}
                    withShortAddress={true}
                    address={vitalik}
                  />
                </div>
              </div>
            }
          />
        </div>
      )}
      {daiReceived > 0 && (
        <div>
          <TextBubble
            logo={defiNoobsLogoElement}
            text={
              <div>
                {daiReceived > 100
                  ? t("How generous of you! You sent me {{amount}} DAI", {
                      amount: daiReceived,
                    })
                  : daiReceived < 100
                  ? t(
                      "Hey! I said 100 you cheapskate. You sent me only {{amount}} DAI!",
                      { amount: daiReceived }
                    )
                  : t("Just received it. You did great!")}
                <div className="mt-2">
                  {t(
                    "That's it! You now know the basic functions of a wallet. Next step is learning what gas is and how it works."
                  )}
                  <button
                    onClick={() => navigate("/")}
                    className="back-to-courses-button btn-primary mt-3"
                  >
                    {t("Click here to return to courses.")}
                    <i class="fa-solid fa-house align-middle ms-2"></i>
                  </button>
                </div>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}
