import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { defiNoobsLogoElement, userImage } from "../courses";
import { TextBubble } from "../ui/text-bubbles/text-bubbles";
import { t } from "i18next";

export function QuizStep({ question, options, onCorrect, onQuizFinished }) {
  const [userAnswers, setUserAnswers] = useState([]);
  const [userWasCorrect, setUserWasCorrect] = useState(false);
  const [userReadQuestion, setUserReadQuestion] = useState(false);

  const addUserAnswer = (answer) => {
    setUserWasCorrect(options[answer].isCorrectAnswer);
    setUserAnswers((prevValue) => [...prevValue, answer]);
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    });
    return <div ref={elementRef} />;
  };

  return (
    <div className="quiz-step">
      <TextBubble
        logo={defiNoobsLogoElement}
        onClick={() => {
          !userReadQuestion && setUserReadQuestion(true);
        }}
        text={<div>{t(question)}</div>}
      />
      {userReadQuestion && (
        <TextBubble
          logo={userImage}
          side="right"
          text={
            <div>
              {Object.values(options).map((option) => {
                const optionAnswered =
                  userWasCorrect || userAnswers.includes(option.id);
                const buttonClass = !optionAnswered
                  ? "btn-primary"
                  : options[option.id].isCorrectAnswer
                  ? "btn-success"
                  : "btn-danger";
                return (
                  <button
                    key={option.id}
                    disabled={userWasCorrect || userAnswers.includes(option.id)}
                    id={option.id}
                    onClick={() => {
                      addUserAnswer(option.id);
                    }}
                    type="button"
                    className={classNames(
                      "btn w-100 user-answer-button",
                      buttonClass
                    )}
                  >
                    {t(option.text)}
                  </button>
                );
              })}
            </div>
          }
        />
      )}
      {userWasCorrect && (
        <TextBubble
          logo={defiNoobsLogoElement}
          onClick={() => onQuizFinished()}
          text={<div>{t(onCorrect)}</div>}
        />
      )}
      <AlwaysScrollToBottom />
    </div>
  );
}
