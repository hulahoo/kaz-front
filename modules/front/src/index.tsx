import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app/App";
import {CubaAppProvider} from "@cuba-platform/react";
import {BrowserRouter, HashRouter, Route} from "react-router-dom";
import "antd/dist/antd.min.css";
import "@cuba-platform/react/dist/index.min.css";
import "./index.css";
import {antdLocaleMapping, messagesMapping} from "./i18n/i18nMappings";
import "moment/locale/ru";
import {Provider} from "mobx-react";
import {cubaREST, rootStore} from "./app/store";

ReactDOM.render(
  <Provider rootStore={rootStore}>
    <CubaAppProvider
      cubaREST={cubaREST}
      messagesMapping={messagesMapping}
      antdLocaleMapping={antdLocaleMapping}
    >
      <BrowserRouter basename="/kzm-front">
        <Route component={App}/>
      </BrowserRouter>
    </CubaAppProvider>
  </Provider>,
  document.getElementById("root") as HTMLElement
);