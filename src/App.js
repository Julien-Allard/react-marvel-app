import "./App.css";
import Characters from "./Pages/Characters";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faBackwardFast,
  faForwardFast,
} from "@fortawesome/free-solid-svg-icons";
import Comics from "./Pages/Comics";
library.add(faArrowLeftLong, faArrowRightLong, faBackwardFast, faForwardFast);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
      </Routes>
    </Router>
  );
}

export default App;
