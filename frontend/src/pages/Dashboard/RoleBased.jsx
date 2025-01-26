import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import ReceptionistView from './ReceiptionistDashboard';
import axios from 'axios';

const App = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch user data to determine the role (e.g., from the logged-in session)
    axios.get('/api/current_user')
      .then((response) => {
        setUserRole(response.data.role);
      })
      .catch((error) => {
        console.error("There was an error fetching user role!", error);
      });
  }, []);

  return (
    <div>
      {userRole === 'Admin' ? (
        <Dashboard />
      ) : userRole === 'Receptionist' ? (
        <ReceptionistView />
      ) : (
        <div>Please log in</div>
      )}
    </div>
  );
};

export default App;
