import React from "react";
import { render } from "@testing-library/react";
import Enzyme from "enzyme";
import LoginPage from "../components/login";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });


describe("<LoginPage/>", () => {
  it("renders with Props", async () => {

   const wrapper = render(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
  });
});