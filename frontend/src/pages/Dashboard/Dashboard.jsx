import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendPortURL } from '../../config';

const Dashboard = () => {
  const [managements, setManagements] = useState([]);

  useEffect(() => {
    // Fetch all management members (Admin, Receptionist, Staff)
    axios.get(`${backendPortURL}/management/get-all-management`)
      .then((response) => {
        console.log(response.data);
        setManagements(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching management data!", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Handle deletion of management members
    axios.delete(`${backendPortURL}/management/delete-management/${id}`)
      .then(() => {
        setManagements(managements.filter(item => item._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the management member!", error);
      });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {managements.map((management) => (
            <tr key={management._id}>
              <td>{management.name}</td>
              <td>{management.email}</td>
              <td>{management.role}</td>
              <td>
                <button onClick={() => handleDelete(management._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
