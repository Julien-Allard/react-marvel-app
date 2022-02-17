import "./App.css";
import Characters from "./Pages/Characters";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faBackwardFast,
  faForwardFast,
  faHandBackFist,
} from "@fortawesome/free-solid-svg-icons";
import Comics from "./Pages/Comics";
import Details from "./Pages/Details";
library.add(
  faArrowLeftLong,
  faArrowRightLong,
  faBackwardFast,
  faForwardFast,
  faHandBackFist
);

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Characters search={search} setSearch={setSearch} />}
        />
        <Route
          path="/comics"
          element={<Comics search={search} setSearch={setSearch} />}
        />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
