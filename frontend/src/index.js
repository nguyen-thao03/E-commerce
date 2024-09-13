// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import reportWebVitals from "./reportWebVitals";
// import {Provider} from 'react-redux';
// import Store from './redux/store';

// ReactDOM.render(
//     <Provider store={Store}>
//         <App/>
//     </Provider>,
//     document.getElementById("root")
// );


// reportWebVitals();
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./redux/store";
import "./App.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);

