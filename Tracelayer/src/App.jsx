import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import Logs from './components/Logs';
// import Signin from './components/testcomponents/Signin';
// import SignupForm from './components/testcomponents/signup';
import Home from './components/Home';
import DocsPage from './components/test/DocsPage';
import DevRegistration from './components/test/DevRegistration';
import Dashboard from './components/test/dashboard';
import Login from './components/test/login';
import Test from './components/test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/docs" element={<DocsPage/>} />
        <Route path="/dev-register" element={<DevRegistration/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/test" element={<Test/>} />




        {/* <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test-endpoint/signup" element={<SignupForm />} />
        <Route path="/test-endpoint/signin" element={<Signin />} />
        <Route path="/logs" element={<Logs />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
