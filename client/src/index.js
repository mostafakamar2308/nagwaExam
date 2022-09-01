import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userR";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const stateStore = configureStore({
  reducer: {
    user: userReducer,
  },
});
root.render(
  <Provider store={stateStore}>
    <App />
  </Provider>
);
