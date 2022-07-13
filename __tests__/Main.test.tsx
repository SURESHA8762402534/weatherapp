import { fireEvent, render, screen } from "@testing-library/react-native";
import Main from "../src/Main";

import React from "react";

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

test("test for home page", () => {
  const tree = render(<Main />);
  expect(tree).toMatchSnapshot();
  const input = screen.getByTestId("textbox");
  const btn = screen.getByTestId("btn");
  fireEvent.changeText(input, { target: { value: "test" } });
  fireEvent.press(btn);
});
