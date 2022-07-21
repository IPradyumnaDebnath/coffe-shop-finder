import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import CoffeeShops from "./index";
import { Places } from "routes/Home/Home.mock";

describe("CoffeeShops test-cases", () => {
  test("should have loading ", () => {
    const { getByText } = render(
      <Router>
        <CoffeeShops loading />
      </Router>
    );
    expect(getByText("Loading...")).toBeInTheDocument();
  });
  test("should render properly ", () => {
    const { getByText } = render(
      <Router>
        <CoffeeShops shopList={Places.results} loading={false} />
      </Router>
    );
    expect(getByText(Places.results[0].name)).toBeInTheDocument();
  });
  test("should test list and Link click", () => {
    const { getAllByRole } = render(
      <Router>
        <CoffeeShops shopList={[...Places.results]} loading={false} />
      </Router>
    );
    const shopList = getAllByRole("link");
    fireEvent.click(shopList[0])
    expect(Places.results.length).toEqual(shopList.length);
  });
});
