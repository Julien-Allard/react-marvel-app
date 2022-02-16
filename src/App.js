import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Characters from "./Pages/Characters";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Characters />} />
      </Routes>
    </Router>
  );
}

export default App;
