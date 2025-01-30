import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://food-del-backend-bgnr.onrender.com"
  const [token,setToken]=useState("");
  const [food_list,setFoodList]=useState([])

  // const addToCart = async (itemId) => {
  //   if (!cartItems[itemId]) {
  //     setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
  //   }
  //   else {
  //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
  //   }
  //   if(token){
  //     await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
  //   }
  // }

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
  
      if (token) {
        axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
          .catch(err => console.error("Error updating cart:", err));
      }
  
      return updatedCart;
    });
  };
  

  // const removeFromCart = async (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  //   if(token){
  //     await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
  //   }
  // }

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId] || prev[itemId] <= 0) return prev; // Prevent negative values
  
      const updatedCart = { ...prev };
      updatedCart[itemId]--;
      if (updatedCart[itemId] === 0) delete updatedCart[itemId]; // Remove if count is 0
  
      if (token) {
        axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
          .catch(err => console.error("Error updating cart:", err));
      }
  
      return updatedCart;
    });
  };

  
  const getTotalCartAmount = () => {
    let totalAmout = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item)
        totalAmout += itemInfo.price * cartItems[item];
      }
    }
    return totalAmout;
  }

  const fetchFoodList = async () =>{
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
  }

  const loadCartData = async(token) =>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData)
  }

  useEffect(()=>{
    async function loadData(){
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem())
      }
    }
    loadData();
  },[])

  const contextValue = {
    food_list, 
    cartItems,
     setCartItems, 
     addToCart, 
     removeFromCart,
     getTotalCartAmount,
     url,
     token,
     setToken
  }
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;