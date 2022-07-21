import { render } from "@testing-library/react";
import { Places } from "routes/Home/Home.mock";

import CoffeeShop from "./index";

describe("CoffeeShop unit test-cases", () => {
  test("should render shop correctly", () => {
    const { getByText } = render(<CoffeeShop shop={Places.results[0]} />);
    expect(getByText("Shoe’s Cup and Cork")).toBeInTheDocument();
  });
});
