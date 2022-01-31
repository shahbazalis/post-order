import React from "react";
import { render, RenderResult, } from "@testing-library/react";
import Enzyme from "enzyme";
import LoginPage from "../views/login";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
const { createMemoryHistory } = require("history");
import { Router } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });


describe("Login page tests", () => {
  let history = createMemoryHistory();
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = render(
      <Router location={history.location} navigator={history}>
        <LoginPage />
      </Router>
    );
  });
  it("snapshot login view", async () => {
    expect(wrapper).toMatchSnapshot();
  });
});