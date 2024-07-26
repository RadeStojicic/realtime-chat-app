import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LogIn from "./pages/home/LogIn";
import SignUp from "./pages/home/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
