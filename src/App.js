import "./App.scss";
import Home from "./pages/Home";
import { Register } from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={(currentUser && <Home />) || (!currentUser && <Login />)}
            />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
