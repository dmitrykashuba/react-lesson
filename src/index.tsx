import "./index.css";

import {StrictMode} from "react";
import {render} from "react-dom";
import App from "./App/App";
import GlobalState from "./App/GlobalState";

render(
    <StrictMode>
        <GlobalState>
            <App />
        </GlobalState>
    </StrictMode>,
    document.getElementById("app")
);
