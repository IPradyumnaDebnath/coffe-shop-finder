import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "routes/Home";
import ShopDetailsPage from "routes/ShopDetails";

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/shop/:id" element={<ShopDetailsPage />} />
    </Routes>
  </Router>
);

export default App;
