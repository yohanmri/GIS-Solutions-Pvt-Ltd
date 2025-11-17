import React from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import ProductsCard from '../../components/clientComponents/ProductsCard';
import ProductCircle from '../../components/clientComponents/ProductCircle';
import Footer from '../../components/clientComponents/Footer';

import '@esri/calcite-components/dist/calcite/calcite.css';

export default function ProductsPage({ setPage }) {
  return (
    <div className="solutions-page">
      <Navbar setPage={setPage} activePage="products" />
      
      <ProductsCard />
      
      <ProductCircle />

      <Footer />
    </div>
  );
}