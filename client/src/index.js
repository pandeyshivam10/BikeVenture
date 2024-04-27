import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import "firebase/analytics";
import { Provider } from "react-redux";
import { initializeApp } from "firebase/app";

// Your Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAHvYwiFnCXxHG9jRPxEkALXG8uKzpkUYg",
  authDomain: "bikeventure-eafc5.firebaseapp.com",
  projectId: "bikeventure-eafc5",
  storageBucket: "bikeventure-eafc5.appspot.com",
  messagingSenderId: "170398372998",
  appId: "1:170398372998:web:fc787c74789a13765d2d07",
  measurementId: "G-7QQE3QVFF9",
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
