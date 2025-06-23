import React, { useState } from 'react';
import { createOrganizationApi } from '../../../api/apiFunction'; 

const CreateOrganisation = ({ onOrganisationCreated }) => {
  const [formData, setFormData] = useState({
    organisation_name: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await createOrganizationApi(formData);
      if (response?.success) {
        setMessage('Organisation created successfully!');
        onOrganisationCreated(response.data); // pass data to parent
        setFormData({ organisation_name: '', address: '' }); // clear form
      } else {
        setMessage('Failed to create organisation.');
      }
    } catch (error) {
      setMessage('Error occurred while creating organisation.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-organisation-form">
      <h2>Create Organisation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Organisation Name:</label>
          <input
            type="text"
            name="organisation_name"
            value={formData.organisation_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Organisation'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateOrganisation;
