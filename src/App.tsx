import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login";
import Posts from "./components/posts";
import { Provider, useSelector } from "react-redux";
import { createStore } from "redux";
import AuthReducer from "./redux/reducer";

const store = createStore(AuthReducer);

const RouteComponent = () => {
  const isSignout = useSelector((state: any) => state.isSignout);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </Router>
    </div>
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
