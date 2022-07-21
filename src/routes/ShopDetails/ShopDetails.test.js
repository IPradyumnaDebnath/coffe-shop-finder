import renderer from "react-test-renderer";

import ShopDetailsPage from "./index";
import { mockApi } from "helpers/axios";
import { Places } from "../Home/Home.mock";

it("renders correctly", () => {
  mockApi.onGet("/places/search").reply(200, { ...Places.results[0] });
  const tree = renderer.create(<ShopDetailsPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
