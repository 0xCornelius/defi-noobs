import { useState } from "react";
import { useDispatch } from "react-redux";
import { defiNoobsLogoElement, userImage } from "../../courses";
import { QuizStep } from "../../quiz-step/quiz-step";
import { TextBubble } from "../../ui/text-bubbles/text-bubbles";

export function SetupQuiz({onSetupQuizFinished}) {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();

  const goToNextStep = () => {
    setTimeout(() => {
      dispatch({
        type: "metamask/updateAssetBalance",
        payload: { asset: "DAI", change: +200 },
      });
      setCurrentStep((prevState) => prevState + 1);
    }, 0);
  };

  const steps = [
    <QuizStep
      question="What happens if you send someone else your seed phrase?"
      options={{
        onlyRecieve: {
          id: "onlyRecieve",
          text: "They will only be able to send me money",
        },
        canSteal: {
          id: "canSteal",
          text: "They will have full access to my account and can steal my money",
          isCorrectAnswer: true,
        },
        needPassword: {
          id: "needPassword",
          text: "They will need my password to move funds",
        },
      }}
      onCorrect="Nice! For receiving you need to send people your address (public key) and your password only protects your 
      local installation so someone with your seed would be able to steal from you without a password."
      onQuizFinished={goToNextStep}
    />,
    <QuizStep
      question="How should you save your seed phrase?"
      options={{
        saveOffline: {
          id: "saveOffline",
          text: "Only offline written with pen and paper",
          isCorrectAnswer: true,
        },
        dontNeed: {
          id: "dontNeed",
          text: "I don't need to backup my seed phrase. I can ask support to recover it",
        },
        whatsapp: {
          id: "whatsapp",
          text: "Sending it on a Whatsapp message so I don't lose it",
        },
      }}
      onCorrect="You should always backup your seed phrase and with pen and paper. No one can recover it for you and if you put it online a hacker has more chances to get to it!"
      onQuizFinished={onSetupQuizFinished}
    />,
  ];
  return (
    <div className="setup-quiz">
      {Array.from(Array(currentStep + 1).keys()).map((step) => steps[step])}
    </div>
  );
}
