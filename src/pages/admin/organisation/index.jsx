import React, { useState } from 'react';
import CreateOrganisation from './CreateOrganisation';

const Organisation = () => {
  const [createdOrg, setCreatedOrg] = useState(null);

  const handleOrganisationCreated = (data) => {
    setCreatedOrg(data);
    // Optionally, show modal / toast / navigate to dashboard etc.
    console.log('Created Organisation:', data);
  };

  return (
    <div className="organisation-page">
      <h1>Organisation Management</h1>
      <CreateOrganisation onOrganisationCreated={handleOrganisationCreated} />
      {createdOrg && (
        <div className="org-summary">
          <h3>Created Organisation:</h3>
          <p><strong>Name:</strong> {createdOrg.organisation_name}</p>
          <p><strong>Address:</strong> {createdOrg.address}</p>
        </div>
      )}
    </div>
  );
};

export default Organisation;
