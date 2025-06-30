import React, { useEffect, useState } from "react";
import {
  createOrganizationApi,
  updateOrganisationApi,
} from "../../../api/apiFunction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Organisation = () => {
  const [formData, setFormData] = useState({
    organisation_name: "",
    address: "",
  });
  const [isExistingOrg, setIsExistingOrg] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const orgExists = localStorage.getItem("organisationExists") === "true";
    setIsExistingOrg(orgExists);

    // If already created, prefill values (optional - depends on data you have)
    if (orgExists) {
      // You can also use userData from context or localStorage if needed
      const orgName = localStorage.getItem("organisationName");
      const orgAddress = localStorage.getItem("organisationAddress");

      if (orgName && orgAddress) {
        setFormData({
          organisation_name: orgName,
          address: orgAddress,
        });
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (isExistingOrg) {
        response = await updateOrganisationApi(formData);
        toast.success("Organisation updated successfully!");
      } else {
        response = await createOrganizationApi(formData);
        if (response?.data?.success) {
          localStorage.setItem("organisationExists", "true");
          toast.success("Organisation created successfully!");
          setIsExistingOrg(true); // switch to update mode
        } else {
          toast.error("Failed to create organisation.");
        }
      }

      // Optionally store name/address in localStorage
      localStorage.setItem("organisationName", formData.organisation_name);
      localStorage.setItem("organisationAddress", formData.address);
    } catch (error) {
      console.error("Error:", error?.response || error?.message);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="organisation-page">
      <div className="organisation-card">
        <h2>{isExistingOrg ? "Update Organisation" : "Create Organisation"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Organisation Name: </label>
            <input
              type="text"
              name="organisation_name"
              value={formData.organisation_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Address: </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading
              ? isExistingOrg
                ? "Updating..."
                : "Creating..."
              : isExistingOrg
              ? "Update Organisation"
              : "Create Organisation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Organisation;
