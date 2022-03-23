import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/login";
import Posts from "./views/posts";
import { Provider } from "react-redux";
import { createStore } from "redux";
import AuthReducer from "./store/reducer";

const store = createStore(AuthReducer);

const RouteComponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </Router>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RouteComponent />
    </Provider>
  );
};

export default App;
