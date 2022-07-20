import { fireEvent, render, screen } from "@testing-library/react-native";
import Deatails from "../src/Details";

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.setTimeout(15000);
test("test for display Details page", async () => {
  const tree = render(<Deatails />);
  expect(tree).toMatchSnapshot();

  await new Promise((r) => setTimeout(r, 10000));
  // const test1 =
  const test = screen.findByTestId("test-0");
  expect(test).toBeTruthy();
  const btn2 = await screen.getByTestId("capital");
  fireEvent.press(btn2);
  const btn3 = screen.getByTestId("back1");
  fireEvent.press(btn3);
  const btn1 = screen.getByTestId("back");
  fireEvent.press(btn1);
});
