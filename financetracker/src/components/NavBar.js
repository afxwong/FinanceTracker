import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@mui/material";


function Navbar() {
  return (
    <AppBar position="static" style={{ background: '#272727'}}>
        <Toolbar>
            <Typography variant="h4" style={{ color: '#84C9FB'}}>
                Finance Tracker
            </Typography>
        </Toolbar>
    </AppBar>
  );
}
export default Navbar;
