import React, { useState,useContext, useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const PlaceOrder = () => {


  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value=event.target.value;
    setData(data =>({...data,[name]:value}))
  }

  const placeOrder = async(event) =>{
    event.preventDefault();

    if (getTotalCartAmount() === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderItems = Object.keys(cartItems)
      .filter((foodId) => cartItems[foodId] > 0)
      .map((foodId) => {
        const foodItem = food_list.find((item) => item._id === foodId);

        if (!foodItem) {
          console.error(`Food item with ID ${foodId} not found`);
          return null; // Or handle it gracefully
        }

        return {
          foodId: foodItem._id,
          name: foodItem.name,
          price: foodItem.price,
          quantity: cartItems[foodId],
          key: foodItem._id || index,
        };
      }).filter(item => item !== null);

  

      const orderData = {
        items: orderItems,
        amount: getTotalCartAmount() + 2,  // Adding delivery fee
        address: data
      };
      

      console.log("Placing order with:", orderData);


      try {
        const response = await axios.post(`${url}/api/order/place`,orderData, {
          headers: {
            'Authorization': `Bearer ${token}`, // Pass token here
          },
        });
  
        // const result = response.data;
        // console.log("API Response:", result);

  
        if (response.data.success) {
          console.log("Order success - showing toast");
          toast.success("Order placed successfully!");
        } else {
          toast.error("Failed to place order. Try again!");
        }
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("An error occurred. Please try again.");
      }
    };

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email"  placeholder='Email'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='pincode' onChange={onChangeHandler} value={data.pincode} type="text" placeholder='Pin code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit'>Place order</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
