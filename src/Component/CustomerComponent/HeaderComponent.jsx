import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const pages = ["Home", "Products", "Orders"];

export const CustomerHeader = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // const handleLoginLogout = () => {
  //   setIsLoggedIn((prevLoggedIn) => !prevLoggedIn);
  //   handleCloseDialog();
  // };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleCloseDialog();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const settings = isLoggedIn ? ["Account", "Dashboard", "Logout"] : ["Login"];

  return (
    <AppBar position="dynamic" sx={{ bgcolor: "gray" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Itwar Bazar
              </Typography>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                {pages.map((page) => (
                  <Button
                    key={page}
                    component={Link}
                    to={"/" + page.toLowerCase()}
                    sx={{ my: 2, mx: 2, color: "white" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
              }}
            >
              <IconButton onClick={handleClick}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleClose}>
                    {page}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {isLoggedIn ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenDialog} sx={{ p: 0 }}>
                    <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button color="inherit" component={Link} to="/signin">
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* User settings dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>User Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Settings options */}
            {settings.map((setting) => (
              <Button
                key={setting}
                onClick={
                  setting === "Logout" ? handleLogout : handleCloseDialog
                }
                fullWidth
              >
                {setting}
              </Button>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};
