import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProductPage from './ProductPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductPage isAuthenticated={false} onLoginRequired={() => alert('login needed')} />
  </React.StrictMode>
);
