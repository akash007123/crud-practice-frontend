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
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const AppContent = () => {
  // const navigate = useNavigate();
  
  return (
    <>  
      <Navbaar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
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
