import { useEffect, useState } from "react";
import PlusSign from "../../../images/thin-plus.svg";
import { seedCreationSteps } from "../setup";
import { t } from "i18next";
import { useNavigate } from "react-router";

export function SeedCreation({
  currentStep,
  goToNextStep,
  allowNextStep,
  setCurrentStep,
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [validBackup, setValidBackup] = useState(false);

  const navigate = useNavigate();

  const { INTRODUCTION, PASSWORD_CREATION, SHOW_SEED, CONFIRM_SEED, FINISH } =
    seedCreationSteps;

  const seed =
    "combine already sorry loan tuition evidence initial smart bottom dentist debate invalid";

  useEffect(() => {
    setPasswordsMatch(password.length >= 8 && password === confirmPassword);
  }, [password, confirmPassword, setPasswordsMatch]);

  const onSeedBackupChange = (seedBackup) => {
    if (seedBackup.trim() === seed) setValidBackup(true);
  };

  const steps = [
    <div className="first-step text-center mx-auto">
      <div className="title">
        <h2>{t("New?")}</h2>
      </div>
      <div className="create-wallet-container mt-5 border border-secondary rounded py-5 m-auto">
        <div className="plus-sign">
          <img src={PlusSign} alt="" />
        </div>
        <div className="card-title mt-3">
          <h5>{t("Yes, let's get set up!")}</h5>
        </div>
        <div className="card-description text-muted mt-3">
          {t("This will create a new wallet and Secret Recovery Phrase")}
        </div>
        <button
          onClick={() => {
            setCurrentStep(PASSWORD_CREATION);
          }}
          className="create-wallet-button mt-5"
        >
          {t("Create a Wallet")}
        </button>
      </div>
    </div>,
    <div className="second-step mt-3 ms-5">
      <div className="title">
        <h1>{t("Create a Password")}</h1>
      </div>
      <div className="create-wallet-container mt-3 py-3">
        <div className="form-group">
          <label className="mb-2" for="exampleInputPassword1">
            {t("New password (min 8 chars)")}
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-group mt-4">
          <label className="mb-2" for="exampleInputPassword1">
            {t("Confirm password")}
          </label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <button
          disabled={!(allowNextStep && passwordsMatch)}
          onClick={() => {
            setCurrentStep(SHOW_SEED);
          }}
          className="create-wallet-button mt-5"
        >
          {t("Create")}
        </button>
      </div>
    </div>,
    <div className="third-step mt-3 ms-5">
      <div className="title">
        <h1>{t("Secret Recovery Phrase")}</h1>
      </div>
      <div className="create-wallet-container py-3">
        <div className="text-center seed-text border border-secondary rounded m-auto p-3">
          {seed}
        </div>
        <button
          disabled={!allowNextStep}
          onClick={() => {
            setCurrentStep(CONFIRM_SEED);
          }}
          className="create-wallet-button mt-5"
        >
          {t("Next")}
        </button>
      </div>
    </div>,
    <div className="forth-step mt-3 ms-5">
      <div className="title text-center">
        <h1>{t("Confirm your")}</h1>
        <h1>{t("Secret Recovery Phrase")}</h1>
      </div>
      <h6>
        {t("Please select each phrase in order to make sure it is correct.")}
      </h6>
      <div className="create-wallet-container py-3">
        <textarea
          className="form-control seed-backup-input text-center seed-text border border-secondary rounded m-auto p-3"
          rows="2"
          onChange={(event) => onSeedBackupChange(event.target.value)}
        ></textarea>
        <button
          disabled={!validBackup}
          onClick={() => {
            setCurrentStep(FINISH);
          }}
          className="create-wallet-button mt-5"
        >
          {t("Next")}
        </button>
      </div>
    </div>,
    <div className="fifth-step mt-3 ms-5">
      <div className="title mb-5">
        <h1>🎉</h1>
        <h1>{t("Congratulations")}</h1>
      </div>
      <h6>
        {t(
          "You passed the test - keep your Secret Recovery Phrase safe, it's your responsibility!"
        )}
        <div className="mt-4 mb-4 fw-bold">
          {t("Tips on storing it safely")}
        </div>
        <ul className="p-0">
          <li className="mt-2"> • {t("Save a backup in multiple places.")}</li>
          <li className="mt-2">
            {" "}
            • {t("Never share the phrase with anyone.")}
          </li>
          <li className="mt-2">
            •{" "}
            {t(
              "Be careful of phishing! No one will spontaneously ask for your Secret Recovery Phrase."
            )}
          </li>
        </ul>
      </h6>
      <div className="py-3">
        <button
          disabled={!allowNextStep}
          onClick={() => navigate("/")}
          className="create-wallet-button me-5"
        >
          {t("Go back to courses")}
          <i class="fa-solid fa-house align-middle ms-2"></i>
        </button>
        <button
          disabled={!allowNextStep}
          onClick={() => navigate("/starter")}
          className="create-wallet-button"
        >
          {t("Continue to starter course")}
          <i class="fa-solid fa-arrow-right align-middle ms-2"></i>
        </button>
      </div>
    </div>,
  ];

  return <div className="seed-creation mx-auto">{steps[currentStep]}</div>;
}
