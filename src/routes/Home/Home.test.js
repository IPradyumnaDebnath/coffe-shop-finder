import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { mockApi } from "helpers/axios";

import HomePage from "./index";
import { Places } from "./Home.mock";

describe("Home page test-cases", () => {
  mockApi.onGet("/places/search").reply(200, { Places });
  test("should have loading", () => {
    const { container, getByText } = render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(getByText("Loading...")).toBeInTheDocument();
  });
});
