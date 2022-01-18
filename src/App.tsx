import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login";
import PostList from "./components/posts";

function App() {
  return (
    <div className="App">
      <h1>Post Order React App</h1>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/posts" element={<PostList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
