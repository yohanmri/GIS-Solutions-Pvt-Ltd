import React from 'react';
import Navbar from '../components/Navbar';
import ProductsCard from '../components/ProductsCard';
import ProductCircle from '../components/ProductCircle';
import Footer from '../components/Footer';
import SolutionsDetails from '../components/SolutionsDetails';


import '@esri/calcite-components/dist/calcite/calcite.css';

export default function SolutionsPage({ setPage }) {
  return (
    <div className="solutions-page">
      <Navbar setPage={setPage} activePage="solutions" />
      <SolutionsDetails />
      <Footer/>
    </div>
  );
}