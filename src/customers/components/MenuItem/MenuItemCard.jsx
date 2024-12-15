import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import { categorizedIngredients } from "../../util/CategorizeIngredients";
import "./MenuItemCard.css";

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleCheckboxChange = (itemName) => {
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(
        selectedIngredients.filter((ingredient) => ingredient !== itemName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const data = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        menuItemId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(data));
  };

  return (
    <div className="menu-item-card">
      <div className="items-center justify-between">
        <div className="items-center">
          <img src={item.images[0]} alt={item.name} />

          <div className="menu-item-content">
            <p className="menu-item-title">{item.name}</p>
            <p className="menu-item-price">₹{item.price}</p>
            <p className="menu-item-description">{item.description}</p>
          </div>
        </div>
      </div>
      <div className="ingredient-list">
        <form onSubmit={handleAddItemToCart}>
          <div className="flex gap-5 flex-wrap">
            {Object.keys(categorizedIngredients(item?.ingredients))?.map((category) => (
              <div className="pr-5" key={category}>
                <Typography>{category}</Typography>
                <FormGroup>
                  {categorizedIngredients(item?.ingredients)[category].map((ingredient, index) => (
                    <FormControlLabel
                      key={ingredient.name}
                      control={
                        <Checkbox
                          checked={selectedIngredients.includes(ingredient.name)}
                          onChange={() => handleCheckboxChange(ingredient.name)}
                          disabled={!ingredient.inStoke}
                        />
                      }
                      label={ingredient.name}
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>
          <div className="menu-item-add-to-cart">
            <Button variant="contained" disabled={!item.available} type="submit">
              {item.available ? "Add To Cart" : "Out of stock"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemCard;