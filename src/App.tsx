import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { User } from "./config";
import { getUserData } from "./utils";
import Home from "./components/home/Home";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Toaster } from "./components/ui/toaster";
import CreateForm from "./components/form/CreateForm";
import PreviewForm from "./components/form/PreviewForm";
import FormSubmissionWindow from "./components/form/FormSubmissionWindow";

const Layout = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const shouldShowNavbar = !location.pathname.startsWith("/forms/submission");

  useEffect(() => {
    setUser(getUserData());
  }, []);

  return (
    <div className="w-full min-h-screen">
      {shouldShowNavbar && <Navbar user={user} setUser={setUser} />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home user={user!} />} />
        <Route path="/forms/create/:id" element={<CreateForm />} />
        <Route path="/forms/preview/:id" element={<PreviewForm />} />
        <Route
          path="/forms/submission/:id"
          element={<FormSubmissionWindow />}
        />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
      <Toaster />
    </Router>
  );
};

export default App;
