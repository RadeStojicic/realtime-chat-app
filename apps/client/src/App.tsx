import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LogIn from "./pages/home/LogIn";
import SignUp from "./pages/home/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
