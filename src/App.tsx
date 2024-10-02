import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import { Toaster } from "./components/ui/toaster";
import CreateForm from "./components/form/CreateForm";
import { useEffect, useState } from "react";
import { User } from "./config";
import { getUserData } from "./utils";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUserData());
  }, []);

  return (
    <div className="w-full min-h-screen">
      <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home user={user!} />} />
          <Route path="/forms/create/:id" element={<CreateForm />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
};

export default App;
