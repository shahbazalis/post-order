import React from "react";
import { render } from "@testing-library/react";
import CheckPostsBtn from "../components/recentPostsBtn";
import { act } from "react-dom/test-utils";

describe("Check Recent Button Component", () => {
  it("rendered recent post button", async () => {
    const handlePosts = jest.fn();
    const { getByTestId } = render(
      <CheckPostsBtn handleRecentPosts={handlePosts} />
    );
    const button = getByTestId("sort-recent-msg");
    expect(button).toBeTruthy();
  });

  it("clicks recent posts button", async () => {
    act(() => {
      const handlePosts = jest.fn();
      const { getByTestId } = render(
        <CheckPostsBtn handleRecentPosts={handlePosts} />
      );
      const button = getByTestId("sort-recent-msg");
      button.click();
      expect(handlePosts).toBeCalledTimes(1);
    });
  });
});
