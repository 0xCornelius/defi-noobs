import { SeedCreation } from "./seed-creation/seed-creation";
import { TextBubble } from "../ui/text-bubbles/text-bubbles";
import { useCallback, useEffect, useRef, useState } from "react";
import { SetupQuiz } from "./setup-quiz/setup-quiz";
import { defiNoobsLogoElement, userImage } from "../courses";
import { t } from "i18next";

export const seedCreationSteps = {
  INTRODUCTION: 0,
  PASSWORD_CREATION: 1,
  SHOW_SEED: 2,
  CONFIRM_SEED: 3,
  FINISH: 4,
};

export function SetupCourse() {
  const [currentStep, setCurrentStep] = useState(0);
  const [seedCreationStep, setSeedCreationStep] = useState(0);
  const [allowSeedCreationNextStep, setAllowSeedCreationNextStep] =
    useState(true);
  const [bottomMarginContainer, setBottomMarginContainer] = useState();

  const getMarginBottomContainer = () => {
    const textBubbles = document.querySelectorAll(".text-bubble");
    const lastTextBubble = textBubbles[textBubbles.length - 1];
    const lastTextBubbleHeight = lastTextBubble
      ? lastTextBubble.offsetHeight
      : 0;
    const marginBottomContainer = 830 - lastTextBubbleHeight;
    return marginBottomContainer;
  };

  const { INTRODUCTION, PASSWORD_CREATION, SHOW_SEED, CONFIRM_SEED, FINISH } =
    seedCreationSteps;

  const goToNextSeedCreationStep = () => {
    setSeedCreationStep((prevState) => prevState + 1);
  };

  const goToNextStep = () => {
    setCurrentStep((prevState) => prevState + 1);
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => {
      elementRef.current.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "smooth",
      });
    });
    return <div ref={elementRef} />;
  };

  useEffect(() => {
    setBottomMarginContainer(getMarginBottomContainer());
  });

  const onSetupQuizFinished = () => {
    setAllowSeedCreationNextStep(true);
    goToNextStep();
  };

  useEffect(() => {
    switch (seedCreationStep) {
      case PASSWORD_CREATION:
        goToNextStep();
        setAllowSeedCreationNextStep(false);
        break;
      case SHOW_SEED:
        goToNextStep();
        setAllowSeedCreationNextStep(false);
        break;
      case CONFIRM_SEED:
        goToNextStep();
        break;
      case FINISH:
        goToNextStep();
        setAllowSeedCreationNextStep(false);
        break;
      default:
      // code block
    }
  }, [seedCreationStep, PASSWORD_CREATION, CONFIRM_SEED, SHOW_SEED, FINISH]);

  const steps = [
    <TextBubble
      logo={defiNoobsLogoElement}
      text={
        <div>
          <div>
            {t(
              "Congrats on taking the first step toward a more descentralized future. Let's start our journey with creating your first non-custodial wallet."
            )}{" "}
            {t(
              "This means that you -and only you- can decide how to use and move your funds."
            )}
          </div>
          <div className="mt-2">
            {t('Click on "Create a Wallet" to start.')}
          </div>
        </div>
      }
    />,
    <TextBubble
      logo={defiNoobsLogoElement}
      onClick={() => {
        goToNextStep();
        setAllowSeedCreationNextStep(true);
      }}
      text={
        <div>
          <div>
            {t(
              "First we need to create a password. This password will be used to encrypt your wallet locally so that if someone has access to your computer they can't use your wallet."
            )}
          </div>
        </div>
      }
    />,
    <TextBubble
      logo={defiNoobsLogoElement}
      text={
        <div>
          {t("Remember that your seed phrase is")}{" "}
          <span className="fw-bold">{t("the only")}</span>
          {` ${t("key of your wallet.")} ${t(
            "Anyone with your seed phrase can have access to your funds."
          )}`}
          <div className="mt-2">
            {t(
              "If you forget your password you can always use your seed to recover your funds at any time!"
            )}
          </div>
          <div className="mt-2">
            {t("Now create a password to advance to the next step.")}
          </div>
        </div>
      }
    />,
    <TextBubble
      logo={defiNoobsLogoElement}
      onClick={() => {
        goToNextStep();
      }}
      text={
        <div>
          {t(
            'This is your seed phrase. Most of the time it\'s a list of 12 or 24 words. Anyone with this words can have unrestricted access to this particular "account".'
          )}
        </div>
      }
    />,
    <TextBubble
      logo={defiNoobsLogoElement}
      onClick={() => {
        goToNextStep();
      }}
      text={
        <div>
          {t(
            "If you lose access to your wallet and you lose your seed phrase you will not be able to access your funds and no one will be able to recover your wallet for you. Take care of it."
          )}
        </div>
      }
    />,
    <TextBubble
      logo={defiNoobsLogoElement}
      onClick={() => {
        goToNextStep();
      }}
      text={
        <div>
          {t(
            "That's the thing about self-custody. No one else can steal or freeze your funds but you have to assume the responsability of taking care of your seed."
          )}
        </div>
      }
    />,
    <TextBubble
      logo={defiNoobsLogoElement}
      onClick={() => {
        goToNextStep();
        setAllowSeedCreationNextStep(true);
      }}
      text={
        <div>
          {t(
            "The safest thing is to write your seed phrase on a piece of paper and store it in a secure place."
          )}{" "}
          <span className="fw-bold">
            {t(
              "Never store your seed phrase digitally and never give it to anyone."
            )}
          </span>
          <div className="mt-2">
            {t(
              "You can also write multiple copies of it and distribute it between diferent safe locations."
            )}
          </div>
        </div>
      }
    />,
    <TextBubble
      logo={defiNoobsLogoElement}
      text={
        <div>
          {t(
            'Now grab a piece of paper and write your seed there. When you are ready click "Next".'
          )}
        </div>
      }
    />,
    <TextBubble
      logo={defiNoobsLogoElement}
      text={
        <div>
          {t(
            'Write your seed here in order to confirm that your backup was successful and click on "Next" to continue.'
          )}
        </div>
      }
    />,
    <TextBubble
      logo={defiNoobsLogoElement}
      onClick={() => {
        goToNextStep();
      }}
      text={
        <div>
          {t("Congrats! You just created your first wallet")} ❤️
          <div className="mt-2">
            {t(
              "Before we finish let's do a quick quiz to see if you got all the concepts right."
            )}
          </div>
        </div>
      }
    />,
    <SetupQuiz onSetupQuizFinished={onSetupQuizFinished} />,
    <TextBubble
      logo={defiNoobsLogoElement}
      text={
        <div>
          {t("Nice! I think you are now ready to create your own wallet.")}
          <div className="mt-2">
            {t("Head to")}{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://metamask.io/download/"
            >
              https://metamask.io/download/
            </a>{" "}
            {t("and install your browser extension to start trying it.")}
          </div>
        </div>
      }
    />,
  ];

  return (
    <div className="setup-course d-flex">
      <div className="seed-creation-container">
        <SeedCreation
          currentStep={seedCreationStep}
          goToNextStep={goToNextSeedCreationStep}
          allowNextStep={allowSeedCreationNextStep}
          setCurrentStep={setSeedCreationStep}
        />
      </div>
      <div className="ms-auto course-guide px-5 chat-background w-100">
        <div className="scrollable">
          {Array.from(Array(currentStep + 1).keys()).map((step) => steps[step])}
          <AlwaysScrollToBottom />
          <div style={{ marginBottom: bottomMarginContainer + "px" }}></div>
        </div>
      </div>
    </div>
  );
}
