import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/home/Home";

function App() {
  const { authUser } = useAuthContext();
  return (
    <Routes>
      <Route
        path="/"
        element={authUser ? <Home /> : <Navigate to={"/log-in"} />}
      />
      <Route
        path="/log-in"
        element={authUser ? <Navigate to="/" /> : <LogIn />}
      />
      <Route
        path="/sign-up"
        element={authUser ? <Navigate to="/" /> : <SignUp />}
      />
    </Routes>
  );
}

export default App;
