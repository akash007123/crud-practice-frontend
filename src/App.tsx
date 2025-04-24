import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { UserList } from './components/UserList';
import UserForm from './components/UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">User Management</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Users</Nav.Link>
            <Nav.Link href="/users/new">Add User</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
      </Routes>
    </Router>
  );
};

export default App;