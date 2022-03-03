import { useState } from "react";
import { Courses } from "../courses/courses";
import MetamaskLogo from "../images/logo/metamask-fox.svg";
import Metamask from "../metamask/metamask";

export function Browser({ metamask }) {
  const [url, setUrl] = useState("www.definoobs.com");
  const [showMetamask, setShowMetamask] = useState(false);
  const [ metamaskAvailable, setMetamaskAvailable ] = useState(false);

  return (
    <div className="browser">
      <div className="top-bar">
        <div className="address-bar">
          <input
            className=""
            type="text"
            placeholder={"Type a URL"}
            defaultValue={url}
          />
        </div>
        {metamaskAvailable && (
          <div className="metamask-logo-container">
            <div>
              <img
                src={MetamaskLogo}
                onClick={() => setShowMetamask(!showMetamask)}
                className="metamask-logo"
                alt=""
              />
            </div>
            {showMetamask && (
              <div className="metamask-container">
                <Metamask setShowMetamask={setShowMetamask} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="content">
        <Courses setMetamaskAvailable={setMetamaskAvailable} />
      </div>
    </div>
  );
}
