import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './AddUser.css';

const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      id
      firstName
      lastName
      email
      phoneNumber
      address
      city
      state
      zipCode
      role
    }
  }
`;

function AddUser() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    password: '',
    role: 'ROLE_CUSTOMER'
  });

  const [addUser] = useMutation(ADD_USER);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser({ variables: { input: formData } });
      alert('User added successfully');
      navigate('/admin/allUsers');
    } catch (error) {
      setError(error.message);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input-field" required />
        </div>
        <div className="form-group">
          <label className="label">Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input-field" required />
        </div>
        <div className="form-group">
          <label className="label">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" required />
        </div>
        <div className="form-group">
          <label className="label">Phone Number</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="input-field" required />
        </div>
        <div className="form-group">
          <label className="label">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="input-field" required />
        </div>
        <div className="form-group">
          <label className="label">City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-field" required />
        </div>
        <div className="form-group">
          <label className="label">State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} className="input-field" required />
        </div>
        <div className="form-group">
          <label className="label">Zip Code</label>
          <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="input-field" required />
        </div>
        <div className="form-group">
          <label className="label">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" required />
        </div>
        <div className="form-group">
          <label className="label">Role</label>
          <select name="role" value={formData.role} onChange={handleChange} className="select-field">
            <option value="ROLE_CUSTOMER">Customer</option>
            <option value="ROLE_SELLER">Seller</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit" className="button">Add User</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default AddUser;
