import React, { useEffect, useState, useMemo } from "react";
import { getAllTendersApi } from "../../../api/apiFunction";
import CommonSearchBar from "../../../components/CommonSearchBar";
import TenderCards from "./TenderCards";

const Tenders = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTenders = async () => {
    try {
      const response = await getAllTendersApi();
      setTenders(response?.data?.data || []);
    } catch (err) {
      setError("Failed to fetch tenders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  const filteredTenders = useMemo(() => {
    return tenders?.filter((tender) =>
      tender?.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tenders, searchTerm]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="tenders-wrapper">
      <div className="tenders-header">
        <h3>Tenders</h3>
        <CommonSearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onClearSearch={() => setSearchTerm("")}
          placeholder="Search tenders by description..."
        />
      </div>

      <div className="tenders-body">
        {filteredTenders.length === 0 ? (
          <p>No tenders found.</p>
        ) : (
          <TenderCards tenders={filteredTenders} />
        )}
      </div>
    </div>
  );
};

export default Tenders;
