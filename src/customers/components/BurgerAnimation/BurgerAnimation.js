import React, { useEffect } from "react";
import "./BurgerAnimation.css"; // Import the CSS for the animation
// import { useNavigate } from "react-router-dom";

const BurgerAnimation = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationEnd(); // Trigger the navigation or any other action after the animation ends
    }, 90000); // Duration of the animation
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);
  // const navigate=useNavigate();

  return (
    <div className="burger">
      <div className="burger__visual">
        <div className="burger__top"></div>
        <div className="burger__salad"></div>
        <div className="burger__cheese"></div>
        <div className="burger__cucumber"></div>
        <div className="burger__tomato"></div>
        <div className="burger__meat"></div>
        <div className="burger__bottom"></div>
        <div className="burger__shadow"></div>
      </div>
      {/* <button onClick={()=>{navigate("/")}}>Get Started</button> */}
    </div>
  );
};

export default BurgerAnimation;
