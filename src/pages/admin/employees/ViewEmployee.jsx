import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Stack,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommonMap from "../../../components/CommonMap";

const ViewEmployee = ({ open, onClose, employee }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!employee) return null;

  const latitude = parseFloat(employee?.address?.latitude || 30.7333);
  const longitude = parseFloat(employee?.address?.longitude || 76.7794);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <span className="view-title"><strong>{employee.name}</strong></span>
        <IconButton size="small"
                disableRipple
                disableFocusRipple
                disableTouchRipple
                className="clear-icon-button"
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack direction={isMobile ? "column" : "row"} spacing={3}>
          {/* Employee Info */}
          <Box flex={1}>
            <Stack spacing={2}>
              <Typography><strong>Name:</strong> {employee.name}</Typography>
              <Typography><strong>Phone:</strong> {employee.phone_number}</Typography>
                <Typography><strong>Email:</strong> {employee?.email}</Typography>
              <Typography><strong>Shift Timing:</strong> {employee.shift_timings || "N/A"}</Typography>
              <Typography><strong>Address:</strong> {employee.address?.address || "N/A"}</Typography>
            
            
            </Stack>
          </Box>

          {/* Map */}
          <Box flex={1}>
            <Typography gutterBottom><strong>Employee Location:</strong></Typography>
            <CommonMap
              latitude={latitude}
              longitude={longitude}
              readOnly={true}
              zoom={15}
            />
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ViewEmployee;
