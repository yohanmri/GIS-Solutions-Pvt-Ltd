import React from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import ProductsCard from '../../components/clientComponents/ProductsCard';
import ProductCircle from '../../components/clientComponents/ProductCircle';
import Footer from '../../components/clientComponents/Footer';
import SolutionsDetails from '../../components/clientComponents/SolutionsDetails';


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