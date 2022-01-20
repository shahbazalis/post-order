import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login";
import PostList from "./components/posts";
import { Provider, useSelector } from "react-redux";
import { createStore } from "redux";
import AuthReducer from "./redux/reducer";

const store = createStore(AuthReducer);

const RouteComponent = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/posts" element={<PostList />} />
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
