import { useEffect, useRef, useState } from "react";

export function TextBubble({ logo, text, side = "left", onClick }) {
  const [contentHeight, setContentHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setContentHeight(ref.current.clientHeight);
  }, [contentHeight]);

  const bubbleContent = (
    <div className={`bubble bubble-bottom-${side}`}>
      {text}
      {onClick && (
        <div className="mr-2">
          <button
            className="ms-auto d-flex bg-transparent text-white"
            onClick={onClick}
          >
            <i className="fa-solid fa-angles-down"></i>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className={`text-bubble ${side}`} style={{ marginTop: 50 + "px" }}>
      <div className={`bubble-container`} ref={ref}>
        {bubbleContent}
      </div>
      {/* <div className={classNames("logo mt-4", { "me-5": isRightSide })}>
        {logo}
      </div> */}
    </div>
  );
}
