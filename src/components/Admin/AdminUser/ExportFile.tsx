import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ExportFile() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        className="!bg-blue-600"
      >
        EXPORT
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
       
      >
        <Typography sx={{ p: 2 }}>Export to Exel (all found)</Typography>
        <Typography sx={{ p: 2 }}>Export to Exel (selected)</Typography>
        <hr />
        <Typography sx={{ p: 2 }}>Export to CSV (all found)</Typography>
        <Typography sx={{ p: 2 }}>Export to CSV (selected)</Typography>
      </Popover>
    </div>
  );
}
