import React from 'react';
import Navbar from '../../components/clientComponents/Navbar';

import Footer from '../../components/clientComponents/Footer';
import Solutions from '../../components/clientComponents/Solutions';


import '@esri/calcite-components/dist/calcite/calcite.css';

export default function SolutionsPage() {
  return (
    <div className="solutions-page">
      <Navbar activePage="solutions" />
      <Solutions />
      <Footer />
    </div>
  );
}