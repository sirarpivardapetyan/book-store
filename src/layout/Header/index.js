import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#d9cfb4", boxShadow: "none" }}
    >
      <Toolbar>
        <Typography
          onClick={() => navigate("/")}
          variant="h6"
          component="div"
          sx={{ flexGrow: 0, color: "black", cursor: "pointer" }}
        >
          BOOK STORE
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
