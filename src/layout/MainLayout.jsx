import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
// import About from '../page/About';

const MainLayout = () => {
  return (
    <>
      <Header />
      
      <main className='pt-10'>
        <Outlet /> 
      </main>
      {/* <About /> */}
      < Footer/>
    </>
  );
};

export default MainLayout;