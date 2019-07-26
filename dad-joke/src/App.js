import React from "react";
import "./App.css";
import PrivateRoute from "./components/withAuth/authRouter.js";
import Login from "./components/LoginComponent/Login";
import Register from "./components/LoginComponent/Register";
import Home from "./pages/home";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute path="/" component={Home} />
    </Router>
  );
}

export default App;
