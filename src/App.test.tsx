import { render, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Basic test-cases", () => {
  test("should have Home page", () => {
    const { getByPlaceholderText } = render(<App />);
    const searchInput = getByPlaceholderText(/Search a location/);
    fireEvent.change(searchInput, { target: { value: "coffee" } });
    expect(searchInput).toBeDefined();
  });
});
