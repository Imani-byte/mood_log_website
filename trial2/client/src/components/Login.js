// client/src/components/Login.js

// Import necessary dependencies
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Import CSS styling for the Login component
import '/home/naisiae/Development/code/Phase_4/trial2/client/src/styling/login.css';

// Login component definition
function Login() {
  // State variables to manage user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // History hook to manage navigation
  const history = useHistory();

  // Function to handle the login process
  const handleLogin = () => {
    // Send a POST request to the server with user login data
    axios.post('http://localhost:5000/login', {
      email: email,
      password: password
    }, { withCredentials: true }) // Include credentials (cookies) in the request
      .then(response => {
        console.log('Login successful');
        // Redirect to the Bipolar Quiz page on successful login
        history.push('/bipolar_quiz');
      })
      .catch(error => {
        console.error('Login error:', error.response);

        // Handle login error
        if (error.response && error.response.status === 401) {
          alert('Invalid email or password. Please try again.');
        } else {
          alert('An error occurred during login. Please try again later.');
        }
      });
  };

  // JSX structure for the Login component
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Please Login To Continue</h1>
        
        {/* Input fields for email and password */}
        <label>Email: </label>
        <br />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password: </label>
        <br />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        
        {/* Login button with onClick event handling */}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

// Export the Login component for use in other parts of the application
export default Login;


