// client/src/components/Logout.js
import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '/home/naisiae/Development/code/Phase_4/trial2/client/src/styling/logout.css'


function Logout() {
  // Access the history object for navigation
  const history = useHistory();

  // Handle logout functionality
  const handleLogout = () => {
    // Send a POST request to the server to logout
    axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
      .then(() => {
        // Alert user upon successful logout
        alert('Logout successful');

        // Redirect to the landing page after logout
        history.push('/landing');

        // Handle successful logout, e.g., redirect to login
      })
      .catch(error => {
        // Log any errors that occur during the logout process
        console.error('Logout error:', error);
      });
  };

  return (
    <div className='containerlogout'>
      <p>Remember, checking in with yourself is a powerful act of self-care.</p>
      <p>Keep coming back to mood-log to stay connected with your mental health.</p>
      <p>We're here to provide insights, resources, and a community that cares</p>
      <h1 className='h1logout'>Thank you for visiting</h1><br/>
      <button className='btnlogout' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
