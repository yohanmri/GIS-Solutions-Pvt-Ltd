import React from 'react';
import Navbar from '../../components/clientComponents/Navbar';

import Footer from '../../components/clientComponents/Footer';
import SolutionsComponent from '../../components/clientComponents/SolutionsComponent'


import '@esri/calcite-components/dist/calcite/calcite.css';

export default function SolutionsPage() {
  return (
    <div className="solutions-page">
      <Navbar activePage="solutions" />
      <SolutionsComponent />
      <Footer />
    </div>
  );
}