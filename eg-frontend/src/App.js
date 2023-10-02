import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Dashboard from "./components/Dashboard/Dashboard";
import AppNavbar from "./components/AppNavbar/AppNavbar";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <Router>
      <AppNavbar />
      <Container>
        <Routes>
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/signIn" element={<SignIn />} />
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route exact path="/dashboard" element={<ProtectedRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
