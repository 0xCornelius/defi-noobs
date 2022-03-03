import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GasCourse } from "./gas/gas";
import { CoursesHome } from "./home/courses-home";
import { SetupCourse } from "./setup/setup";
import { StarterCourse } from "./starter/starter";
import DefiNoobsLogo from "../images/logo/defi-noobs-logo.png";

export const userImage = (
  <div className="user-text-bubble">
    <div className="label font-weight-bold d-flex justify-content-center align-items-center text-white">
      YOU
    </div>
  </div>
);

export const defiNoobsLogoElement = (
  <img className="logo" src={DefiNoobsLogo} alt="" />
);

export function Courses({ setMetamaskAvailable }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<CoursesHome setMetamaskAvailable={setMetamaskAvailable} />}
        />
        <Route
          path="starter/*"
          element={
            <StarterCourse setMetamaskAvailable={setMetamaskAvailable} />
          }
        />
        <Route
          path="gas/*"
          element={<GasCourse setMetamaskAvailable={setMetamaskAvailable} />}
        />
        <Route
          path="setup/*"
          element={<SetupCourse setMetamaskAvailable={setMetamaskAvailable} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
