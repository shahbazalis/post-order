import React from 'react';
import {
    render,
  } from "@testing-library/react";
  import Enzyme from "enzyme";
  
  import Posts from "../components/posts";
  
  import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
  
  Enzyme.configure({ adapter: new Adapter() });
  
  describe("<Posts/>", () => {
    it("renders with Props", async () => {
      const wrapper = render(<Posts/>);
      expect(wrapper).toMatchSnapshot();
    });
  });
  