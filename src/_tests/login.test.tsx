import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Enzyme from "enzyme";
import LoginPage from "../views/login/login";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
const { createMemoryHistory } = require("history");
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

Enzyme.configure({ adapter: new Adapter() });

describe("Login page tests", () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let history = createMemoryHistory();
  let wrapper: RenderResult;
  let store = mockStore(initialState);
  wrapper = render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <LoginPage />
      </Router>
    </Provider>
  );
  it("snapshot login view", async () => {
    expect(wrapper).toMatchSnapshot();
  });
});
