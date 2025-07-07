import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import TrackerPage from "../../pages/TrackerPage/TrackerPage"
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trackerPage" element={<TrackerPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
