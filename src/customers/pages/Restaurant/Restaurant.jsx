import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import MenuItemCard from "../../components/MenuItem/MenuItemCard";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantsCategory } from "../../../State/Customers/Restaurant/restaurant.action";
import { getMenuItemsByRestaurantId } from "../../../State/Customers/Menu/menu.action";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TodayIcon from '@mui/icons-material/Today';

const categories = [
  "Thali",
  "Starters",
  "Indian Main Course",
  "Rice and Biryani",
  "Breads",
  "Accompaniments",
  "Dessert",
];

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian Only", value: "vegetarian" },
  { label: "Non-Vegetarian Only", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

const Restaurant = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { restaurant, menu } = useSelector((store) => store);
  const navigate = useNavigate();

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const foodType = searchParams.get("food_type");
  const foodCategory = searchParams.get("food_category");
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(
      getRestaurantById({
        jwt: localStorage.getItem("jwt"),
        restaurantId: id,
      })
    );
    dispatch(
      getMenuItemsByRestaurantId({
        jwt: localStorage.getItem("jwt"),
        restaurantId: id,
        seasonal: foodType === "seasonal",
        vegetarian: foodType === "vegetarian",
        nonveg: foodType === "non_vegetarian",
        foodCategory: foodCategory || ""
      })
    );
    dispatch(getRestaurantsCategory({ restaurantId: id, jwt }));
  }, [id, foodType, foodCategory]);

  const handleFilter = (e, value) => {
    const searchParams = new URLSearchParams(location.search);

    if (value === "all") {
      searchParams.delete(e.target.name);
      searchParams.delete("food_category");
    }
    else searchParams.set(e.target.name, e.target.value);

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  return (
    <>
      <div className="px-5 lg:px-20 ">
        {/* <section>
          <div></div>
          <div className="pt-3 pb-5">
            <h1 className="text-4xl font-semibold">
              {restaurant.restaurant?.name}
            </h1>
            <h3 className="text-[#49557e] py-2 mt-1">
              Home/{restaurant.restaurant?.address.country}/
              {restaurant.restaurant?.name}/{restaurant.restaurant?.id}/Order Online
            </h3>
            <p className="text-[#49557e] mt-1">{restaurant.restaurant?.description}</p>
            <div className="space-y-3 mt-3">
              <p className="text-[#49557e] flex items-center gap-3">
                <LocationOnIcon /> <span>{restaurant.restaurant?.address.streetAddress}
                </span>
              </p>
              <p className="flex items-center gap-3 text-[#49557e]">
                <TodayIcon /> <span className=" text-red-600"> {restaurant.restaurant?.openingHours} (Today)</span>
              </p>
            </div>
          </div>
        </section>
        <Divider /> */}

        <section className="pt-[2rem] lg:flex relative ">
          <div className="space-y-8 lg:w-[18%] filter">
            <div className="box space-y-5 lg:sticky top-28">
              <div className="">
                <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                  Food Type
                </Typography>
                <FormControl className="py-10 space-y-5" component="fieldset">
                  <RadioGroup
                    name="food_type"
                    value={foodType || "all"}
                    onChange={handleFilter}
                  >
                    {foodTypes?.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                        sx={{ color: "gray" }}
                      />
                    ))}
                  </RadioGroup>
                  <Divider />
                  <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                    Food Category
                  </Typography>
                  <RadioGroup
                    name="food_category"
                    value={foodCategory || "all"}
                    onChange={handleFilter}
                  >
                    <FormControlLabel
                      value={"all"}
                      control={<Radio />}
                      label={"All"}
                      sx={{ color: "gray" }}
                    />
                    {restaurant?.categories.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        value={item.name}
                        control={<Radio />}
                        label={item.name}
                        sx={{ color: "gray" }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="lg:w-[80%] space-y-5 lg:pl-10">
            <Grid container spacing={4} className="menu-items-container">
              {menu?.menuItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3.8} key={item.id}>
                  <MenuItemCard item={item} />
                </Grid>
              ))}
            </Grid>
          </div>
        </section>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={menu.loading || restaurant.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Restaurant;
