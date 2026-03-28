import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


const MainLayout = ({ cartCount }) => {
  return (
    <>
      <Header  cartCount={cartCount}/>
      
      <main className='pt-10'>
        <Outlet /> 
      </main>
   
      < Footer/>
    </>
  );
};

export default MainLayout;