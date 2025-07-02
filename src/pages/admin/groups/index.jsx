import React, { useEffect, useState } from "react";
import {
  getAllGroupsApi,
  createGroupsApi,
  getSpecificGroupApi,
  createTenderApi,
} from "../../../api/apiFunction";
import GroupCards from "./GroupCards";
import ViewGroup from "./ViewGroup";
import CommonSearchBar from "../../../components/CommonSearchBar";
const Groups = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [groups, setGroups] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOption, setSortOption] = useState(""); // "status" or "size"

  const handleGetAllGroups = async () => {
    try {
      const response = await getAllGroupsApi();
      setGroups(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleCreateGroup = async () => {
    try {
      await createGroupsApi();
      handleGetAllGroups();
    } catch (error) {
      console.error("Error creating group:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTender = async (groupId) => {
    let payload = {
      group: groupId,
    };
    try {
      await createTenderApi(payload);
      handleGetAllGroups();
    } catch (error) {
      console.error("Error creating tender:", error);
    }
  };

  const handleViewGroup = async (groupId) => {
    try {
      const res = await getSpecificGroupApi(groupId);
      setSelectedGroup(res?.data?.data?.group || null);
      setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching group details:", error);
    }
  };

  useEffect(() => {
    handleGetAllGroups();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredGroups = groups
    .filter((group) => {
      const matchesSearch = group?.description
        ?.toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        group?.status?.toLowerCase().trim() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOption === "sizeAsc") {
        return (a?.group_size || 0) - (b?.group_size || 0);
      } else if (sortOption === "sizeDesc") {
        return (b?.group_size || 0) - (a?.group_size || 0);
      }
      return 0;
    });

  return (
    <div className="groups-wrapper">
      <div className="groups-header">
        <h3>Groups</h3>

        <CommonSearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onClearSearch={() => setSearchTerm("")}
          placeholder="Search by group description..."
        />

        <select
          className="sort-dropdown"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="expired">Expired</option>
        </select>

        <select
          className="sort-dropdown"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="sizeAsc">Group Size (Ascending)</option>
          <option value="sizeDesc">Group Size (Descending)</option>
        </select>

        <button onClick={handleCreateGroup}>Refresh Groups</button>
      </div>

      <GroupCards
        groups={filteredGroups}
        onSelectGroup={(group) =>
          setSelectedGroup((prev) => (prev?.id === group.id ? null : group))
        }
        onViewGroup={handleViewGroup}
        selectedGroupId={selectedGroup?.id}
      />

      <ViewGroup
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        group={selectedGroup}
      />

      <div className="groups-footer">
        <button
          className={`create-tender-button ${
            !selectedGroup ? "disabled-button" : ""
          }`}
          disabled={!selectedGroup}
          onClick={() => handleCreateTender(selectedGroup?.id)}
        >
          Create Tender
        </button>
      </div>
    </div>
  );
};

export default Groups;
