import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Enzyme from "enzyme";

import Posts from "../views/posts/posts";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
const { createMemoryHistory } = require("history");
import { Router } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

describe("<Posts/>", () => {
  it("renders with Props", async () => {
    let history = createMemoryHistory();
    let wrapper: RenderResult;
    wrapper = render(
      <Router location={history.location} navigator={history}>
        <Posts />
      </Router>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
