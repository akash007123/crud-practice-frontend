import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  // useNavigate
} from "react-router-dom";
// import { Container, Navbar, Nav } from "react-bootstrap";
import Home from "./components/Home";
import Navbaar from "./components/Navbaar";
import { UserList } from "./components/UserList";
import UserForm from "./components/UserForm";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

const AppContent = () => {
  // const navigate = useNavigate();
  
  return (
    <>  
      <Navbaar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userlist" element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        } />
        <Route path="/users/new" element={
          <ProtectedRoute>
            <UserForm />
          </ProtectedRoute>
        } />
        <Route path="/users/edit/:id" element={
          <ProtectedRoute>
            <UserForm />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
