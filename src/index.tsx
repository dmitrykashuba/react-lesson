import "./index.css";

import {StrictMode} from "react";
import {render} from "react-dom";
import App from "./App/App";
import Injectables from "./App/Injectables";

render(
    <StrictMode>
        <Injectables>
            <App />
        </Injectables>
    </StrictMode>,
    document.getElementById("app")
);
