import { useState } from "react";
import "./App.scss";
import EventEmitter from "events";
import { createStore } from "redux";
import { rootReducer } from "./metamask/reducers/rootReducer";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/react-fontawesome";
import "@fortawesome/free-regular-svg-icons";
import "@fortawesome/free-solid-svg-icons";
import { Browser } from "./browser/browser";
import { Provider } from "react-redux";

function App() {
  // const [eventEmitter] = useState(new EventEmitter());

  let store = createStore(rootReducer);

  return (
    <div className="App">
      <Provider store={store}>
        {/* <Mascot animationEventEmitter={eventEmitter} width="120" height="120" /> */}
        <Browser />
      </Provider>
    </div>
  );
}

export default App;
