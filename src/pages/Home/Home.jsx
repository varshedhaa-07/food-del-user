import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import About from '../../components/About/About';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';

const Home = () => {

  const[category,setCategory] = useState("All");

  return (
    <div>
      <Header />
      <About />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
