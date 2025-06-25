import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Close";

const CommonSearchBar = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
  onClearSearch,
}) => {
  const handleClear = () => {
    if (onClearSearch) {
      onClearSearch();
    } else {
      onSearchChange({ target: { value: "" } });
    }
  };

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
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                size="small"
                disableRipple
                disableFocusRipple
                disableTouchRipple
                className="clear-icon-button"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default CommonSearchBar;
