import "@yiisoft/yii-dev-toolbar/wdyr";

import reportWebVitals from "@yiisoft/yii-dev-toolbar/reportWebVitals";
import React from "react";
import ReactDOM from "react-dom/client";
import "@yiisoft/yii-dev-toolbar/index.css";
import App from "@yiisoft/yii-dev-toolbar/App";

(function ToolbarWidget(scope) {
  scope["ToolbarWidget"] = {
    init: function(selector, options) {
      const container = document.querySelector(selector);

      const root = ReactDOM.createRoot(container);
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
  };
})(window);

/**
 * For local purposes only
 */
const widgetDivs = document.querySelectorAll("#yii-dev-toolbar");
widgetDivs.forEach((div) => {
  const root = ReactDOM.createRoot(document.getElementById(div.id) as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
