import "./index.css";

import React, {StrictMode} from "react";
import {render} from "react-dom";
import App from "./App/App";
import State from "./App/State";

render(
    <StrictMode>
        <State>
            <App />
        </State>
    </StrictMode>,
    document.getElementById("app")
);
