import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; 

const CommonSearchBar = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="common-search-bar">
      <TextField
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder={placeholder}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="search-icon" />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default CommonSearchBar;
