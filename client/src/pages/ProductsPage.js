import React from 'react';
import Navbar from '../components/Navbar';
import ProductsCard from '../components/ProductsCard';
import ProductCircle from '../components/ProductCircle';
import Footer from '../components/Footer';

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