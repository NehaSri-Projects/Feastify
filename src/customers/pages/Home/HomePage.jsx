import React, { useEffect } from "react";
import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import MultipleItemsCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import RestaurantCard from "../../components/RestarentCard/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../../State/Customers/Restaurant/restaurant.action";

const HomePage = () => {
  const { auth, restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      dispatch(getAllRestaurantsAction(localStorage.getItem("jwt")));
    }
  }, [auth.user]);

  return (
    <div className="">
      <section className="-z-50 banner ">
        <div className=" banner-content text-container w-[50vw]">
          <h2 className="text-2xl lg:text-7xl font-bold text-white py-5">
          Order your fav food here!
          </h2>
          <h5>
          Your Feast, Your Way.
          </h5>
        </div>

        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadout"></div>
      </section>

      <section className="p-10 lg:py-10 lg:px-20">
        <div className="heading">
          <p className="text-2xl font-semibold text-black py-3 pb-10">
          Explore our menu
          </p>
          <MultipleItemsCarousel />
        </div>
      </section>

      <section className="px-5 lg:px-20">
        <div className="reasturant-show">
          <h1 className="text-2xl font-semibold text-black py-3">
            Restaurant Available
          </h1>
          <div className="flex flex-wrap items-center justify-around">
            {restaurant.restaurants.map((item, i) => (
              <RestaurantCard data={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
