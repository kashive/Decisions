import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
// import "rsuite/dist/styles/rsuite-default.css";
import "./styles/rsuite.less";

// Require Font Awesome.
import "font-awesome/css/font-awesome.css";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./redux/store";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
