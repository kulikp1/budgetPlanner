import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import TrackerPage from "../../pages/TrackerPage/TrackerPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trackerPage" element={<TrackerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
