import React, { useEffect, useState } from "react";
import "./Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../../pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../State/Authentication/Action";
import { blueGrey, indigo, pink } from "@mui/material/colors";
import { images } from '../../../assets/images'; // Adjust path according to your directory structure



const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToProfile = (e) => {
    auth.user?.role === "ROLE_ADMIN" || auth.user?.role === "ROLE_RESTAURANT_OWNER"
      ? navigate("/admin/restaurant")
      : navigate("/my-profile");
  };

  const handleCloseAuthModel = () => {
    navigate("/");
  };
  const navigateToHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseMenu();
  };

  return (
    <div className="navbar-container px-5 py-[.8rem] bg-white flex justify-between items-center">
      <div className="flex items-center space-x-10">
        <div onClick={navigateToHome} className="logo-container cursor-pointer flex items-center space-x-10">
          <img src={images.logo} alt="Feastify Logo" className="logo" />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="search-icon">
          <IconButton onClick={() => navigate("/search")}>
            <SearchIcon className="icon-color" sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>
        <div className="avatar-icon flex items-center space-x-2">
          {auth.user?.fullName ? (
            <span
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={
                auth.user?.role === "ROLE_ADMIN"
                  ? handleOpenMenu
                  : navigateToProfile
              }
              className="font-semibold cursor-pointer"
            >
              <Avatar
                sx={{ bgcolor: "white", color: indigo["500"]}}
                className="bg-black icon-color"
              >
                {auth.user.fullName[0].toUpperCase()}
              </Avatar>
            </span>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <PersonIcon className="icon-color" sx={{ fontSize: "2rem" }} />
            </IconButton>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() =>
                auth.user?.role === "ROLE_ADMIN"
                  ? navigate("/admin")
                  : navigate("/super-admin")
              }
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
        <IconButton onClick={navigateToCart}>
          <Badge color="primary" badgeContent={cart.cartItems.length}>
            <ShoppingCartIcon className="text-4xl cart-icon icon-color" sx={{ fontSize: "1.6rem" }} />
          </Badge>
        </IconButton>
      </div>
      <Auth handleClose={handleCloseAuthModel} />
    </div>
  );
};

export default Navbar;