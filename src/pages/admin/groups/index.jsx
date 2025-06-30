import React, { useEffect, useState } from "react";
import {
  getAllGroupsApi,
  createGroupsApi,
  getSpecificGroupApi,
} from "../../../api/apiFunction";
import GroupCards from "./GroupCards";
import ViewGroup from "./ViewGroup";
import CommonSearchBar from "../../../components/CommonSearchBar";

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGetAllGroups = async () => {
    try {
      const response = await getAllGroupsApi();
      setGroups(response?.data?.data || []);
      console.log("all groups data", response?.data?.data);
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

  const filteredGroups = groups?.filter((group) =>
    group?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="groups-wrapper">
      <div className="groups-header">
        <h3>Groups</h3>

        <CommonSearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search By Employee name..."
        />

        <button onClick={handleCreateGroup}>Refresh Groups</button>
      </div>

      <GroupCards groups={filteredGroups} onViewGroup={handleViewGroup} />

      <ViewGroup
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        group={selectedGroup}
      />
    </div>
  );
};

export default Groups;
