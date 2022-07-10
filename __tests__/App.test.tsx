import { render } from "@testing-library/react-native";
import App from "../App";
import Main from "../src/Main";

describe("Home screen", () => {
  it("test", () => {
    const check = true;
    expect(check).toBe(true);
  });

  it("renders properly", () => {
    render(<App />);
  });
});
