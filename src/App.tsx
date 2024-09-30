import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <div className="w-full min-h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
};

export default App;
