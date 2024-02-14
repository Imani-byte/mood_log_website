// client/src/components/Signup.js

// Import necessary dependencies
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Import CSS styling for the Signup component
import '/home/naisiae/Development/code/Phase_4/trial2/client/src/styling/signup.css';

// Signup component definition
function Signup() {
    // State variables to manage user input
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    // Function to handle the signup process
    const handleSignup = () => {
        // Send a POST request to the server with user signup data
        axios.post('http://localhost:5000/signup', {
            full_name: fullName,
            email,
            password
        }, { withCredentials: true }) // Include credentials (cookies) in the request
        .then(response => {
            console.log('Signup successful');
            history.push('/support');
            // You can redirect to another page or perform other actions on successful signup
        })
        .catch(error => {
            console.error('Signup error:', error);
        });
    };

    // JSX structure for the Signup component
    return (
        <div className="signup-page">
            <div className="signup-container">
                <h1>Please sign up to create an account</h1>
                
                {/* Input fields for full name, email, and password */}
                <label>Full Name: </label>
                <br />
                <input type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
                <br />
                <label>Email: </label>
                <br />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Password: </label>
                <br />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <br />
                
                {/* Signup button with onClick event handling */}
                <button onClick={handleSignup}>Signup</button>
            </div>
        </div>
    );
}

// Export the Signup component for use in other parts of the application
export default Signup;
