import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-regular-svg-icons";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/react-fontawesome";
import EventEmitter from "events";
import { useEffect, useState } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home.component";
import SendPage from "./pages/send/send";

function Metamask({ setShowMetamask }) {
  const [eventEmitter] = useState(new EventEmitter());

  useEffect(() => {
    return () => setShowMetamask(false);
  });

  return (
    <div className="metamask">
      {/* <Mascot animationEventEmitter={eventEmitter} width="120" height="120" /> */}
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="send/*" element={<SendPage />} />
        </Routes>
      </MemoryRouter>
      <div id="popover-content"></div>
    </div>
  );
}

export default Metamask;
