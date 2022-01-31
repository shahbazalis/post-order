import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import SearchNameInput from "../components/searchNameInput";

describe("Search Name Input Component", () => {
  it("rendered Input", async () => {
    const handleSearch = jest.fn();
    const { getByTestId } = render(
      <SearchNameInput handleNameSearch={handleSearch} searchInput=""/>
    );
    const input = getByTestId("search-name");
    expect(input).toBeTruthy();
  });

  it("change in input causes change", async () => {
    act(() => {
      const handleSearch = jest.fn();
      const { getByTestId } = render(
        <SearchNameInput handleNameSearch={handleSearch} searchInput=""/>
      );
      const input = getByTestId("search-name");
      const inputVal = "abc";
      fireEvent.change(input, { target: { value: inputVal } });;
      expect(handleSearch).toBeCalledTimes(1);
    });
  });
});
