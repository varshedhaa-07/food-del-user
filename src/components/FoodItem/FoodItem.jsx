import React, { useContext} from 'react';
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {

  
  const {cartItems={},addToCart,removeFromCart,url} = useContext(StoreContext);

  if (!id) {
    console.error("FoodItem received an undefined 'id'");
    return null; // Prevent rendering if id is missing
  }

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url+"/images/"+image} alt='' />
        {
          !cartItems[id]
          ?<IoIosAdd className='add' onClick={() =>addToCart(id)} />
          :<div className='food-item-counter'>
            <IoIosRemove className='cart-icons' onClick={()=> removeFromCart(id)}/>
            <p>{cartItems[String(id)]}</p>
            <IoIosAdd className='cart-icons' onClick={()=>addToCart(id)} />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name">
          <p>{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">{price}</p>
      </div>
    </div>
  )
}

export default FoodItem
