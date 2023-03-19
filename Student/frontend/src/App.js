import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Rules, Quiz, Summary, Register, Landing } from './pages/index.js';
import { Provider } from "react-redux";
import store from "./store.js";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken.js";
import { setCurrentUser, logoutUser } from "./actions/authActions.js";
import PrivateRoute from './components/private-route/PrivateRoute';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/rule'    element={<PrivateRoute path="/rule" component={Rules} />} /> 
        <Route path='/quiz'    element={<PrivateRoute path="/quiz" component={Quiz} />} />
        <Route path='/summary' element={<PrivateRoute path=".summary" component={Summary} />} />
      </Routes>
    </Provider>
  );
}

export default App;
