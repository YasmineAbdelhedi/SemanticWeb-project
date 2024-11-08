import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/fueskiapi';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', imageUrl: '' });
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Load users when the component mounts or after an action (create, update, delete)
  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    loadUsers();
  }, []); // This will run once when the component mounts

  // Handle creating a user
  const handleCreateUser = async () => {
    try {
      await createUser(newUser.name, newUser.email, newUser.imageUrl);
      setNewUser({ name: '', email: '', imageUrl: '' });
      // Reload users after creating a new one
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Handle updating a user
  const handleUpdateUser = async (userData) => {
    try {
      await updateUser(userData);
      console.log("User updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
      // Log error details to understand what went wrong
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };
  
  

  const handleDeleteUser = async (userId) => {
    try {
      const result = await deleteUser(userId);
      if (result.success) {
        // handle success case, for example, removing the user from UI
        alert('User deleted successfully');
      } else {
        // handle failure, maybe show an error message
        alert('Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Users</h2>

      {/* User Form */}
      <div className="card p-4 mb-4">
        <h4>{isUpdateMode ? 'Update User' : 'Create User'}</h4>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL</label>
          <input
            id="imageUrl"
            type="text"
            className="form-control"
            placeholder="Image URL"
            value={newUser.imageUrl}
            onChange={(e) => setNewUser({ ...newUser, imageUrl: e.target.value })}
          />
        </div>
        <button
          className={`btn ${isUpdateMode ? 'btn-primary' : 'btn-success'} w-100`}
          onClick={isUpdateMode ? handleUpdateUser : handleCreateUser}
        >
          {isUpdateMode ? 'Update User' : 'Create User'}
        </button>
      </div>

      {/* Users List */}
      <h1>Users List</h1>
      <div className="list-group">
        {users.map((user) => (
          <div key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {user.imageUrl && <img src={user.imageUrl} alt={user.name} width={50} height={50} className="rounded-circle me-3" />}
              <strong>{user.name}</strong> ({user.email})
            </div>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => {
                  setIsUpdateMode(true);
                  setSelectedUserId(user.id);
                  setNewUser({ name: user.name, email: user.email, imageUrl: user.imageUrl });
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
