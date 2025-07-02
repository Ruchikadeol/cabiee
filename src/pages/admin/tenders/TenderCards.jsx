import React from "react";

const TenderCards = ({ tenders }) => {
  return (
    <div className="tender-cards-container">
      {tenders?.map((tender) => (
        <div className="tender-card" key={tender?.id}>
          <h4>{tender?.organisation}</h4>
          <div>
            <strong>Description:</strong> {tender?.description}
          </div>
          <div>
            <strong>Driver:</strong> {tender?.driver}
          </div>
          <div>
            <strong>Status:</strong> {tender?.is_active ? "Active" : "Inactive"}
          </div>
          <div>
            <strong>Pickup:</strong> {tender?.pickup_timing}
          </div>
          <div>
            <strong>Drop:</strong> {tender?.drop_timing}
          </div>
          <div>
            <strong>Price:</strong> ₹{tender?.price || "Not specified"}
          </div>
          <div>
            <strong>Company Share:</strong> {tender?.company_share}%
          </div>
          <div>
            <strong>Monthly Rental:</strong> ₹{tender?.monthly_rental}
          </div>
          <div>
            <strong>Pending Charges:</strong> ₹{tender?.pending_charges}
          </div>
          <div>
            <strong>Expires on:</strong>{" "}
            {new Date(tender?.expire)?.toLocaleDateString()}
          </div>
          <div>
            <strong>Offers:</strong> {tender?.offers}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TenderCards;
