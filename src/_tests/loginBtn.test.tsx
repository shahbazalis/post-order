import React from "react";
import { render } from "@testing-library/react";
import LoginButton from "../components/loginBtn";

describe("Login Button Component", () => {
  it("rendered button", async () => {
    const { getByTestId } = render(<LoginButton />);
    const button = getByTestId("login-btn");
    expect(button).toBeTruthy();
  });
});
