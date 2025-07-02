import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const GroupCards = ({
  groups,
  onSelectGroup,
  onViewGroup,
  selectedGroupId,
}) => {
  const [expandedGroupIds, setExpandedGroupIds] = useState([]);

  const toggleGroupExpand = (groupId) => {
    setExpandedGroupIds((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  if (!groups.length) return <p>No groups available.</p>;

  return (
    <div className="group-card-container">
      {groups.map((group) => (
        <div
          key={group?.id}
          className={`group-card ${
            selectedGroupId === group?.id ? "selected" : ""
          }`}
          // onClick={() => onViewGroup(group.id)}
          onClick={() => onSelectGroup(group)}
        >
          <div className="card-header">
            <span className="date">
              Created: {formatDate(group?.created_at)}
            </span>
            <span className="date">
              Updated: {formatDate(group?.updated_at)}
            </span>
          </div>

          <div className="card-body">
            <div className="top-row">
              <div className="size">
                👥 {group?.group_size} Members:{" "}
                <span
                  className="toggle-link"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from triggering selection
                    toggleGroupExpand(group?.id);
                  }}
                >
                  {expandedGroupIds.includes(group?.id)
                    ? "Hide less"
                    : "View More"}
                </span>
              </div>
            </div>

            {expandedGroupIds.includes(group?.id) && (
              <div className="description expanded">
                <strong>Members:</strong>
                <ul>
                  {group.description
                    ?.split(" ")
                    .filter(Boolean)
                    .map((name, idx) => (
                      <li key={idx}>👤 {name}</li>
                    ))}
                </ul>
              </div>
            )}

            <div className="bottom-row">
              <div className={`status ${group?.status?.toLowerCase()}`}>
                {group.status}
              </div>
              <div className="view-chat">
                <Tooltip title="View Details">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click from triggering again
                      onViewGroup(group.id);
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupCards;
